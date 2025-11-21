import { describe, it, expect, beforeEach, vi } from 'vitest'
import { DrawStampUtils, IDrawStampConfig } from '../DrawStampUtils'

describe('DrawStampUtils', () => {
  let canvas: HTMLCanvasElement
  let drawStampUtils: DrawStampUtils
  const mmToPixel = 10

  beforeEach(() => {
    // Create a mock canvas element
    canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 600
    
    // Mock canvas context
    const ctx = canvas.getContext('2d')
    if (ctx) {
      vi.spyOn(ctx, 'clearRect')
      vi.spyOn(ctx, 'save')
      vi.spyOn(ctx, 'restore')
      vi.spyOn(ctx, 'beginPath')
      vi.spyOn(ctx, 'stroke')
    }
    
    drawStampUtils = new DrawStampUtils(canvas, mmToPixel)
  })

  describe('Constructor', () => {
    it('should create an instance of DrawStampUtils', () => {
      expect(drawStampUtils).toBeInstanceOf(DrawStampUtils)
    })

    it('should initialize with a canvas', () => {
      expect(canvas).toBeDefined()
      expect(canvas.width).toBe(800)
      expect(canvas.height).toBe(600)
    })
  })

  describe('Configuration Management', () => {
    it('should get default draw configs', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs).toBeDefined()
      expect(configs).toHaveProperty('width')
      expect(configs).toHaveProperty('height')
      expect(configs).toHaveProperty('borderWidth')
      expect(configs).toHaveProperty('primaryColor')
    })

    it('should set draw configs', () => {
      const configs = drawStampUtils.getDrawConfigs()
      const newConfigs: IDrawStampConfig = {
        ...configs,
        width: 50,
        height: 50,
        primaryColor: '#00ff00'
      }
      
      drawStampUtils.setDrawConfigs(newConfigs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.width).toBe(50)
      expect(updatedConfigs.height).toBe(50)
      expect(updatedConfigs.primaryColor).toBe('#00ff00')
    })

    it('should handle company list configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.companyList).toBeDefined()
      expect(Array.isArray(configs.companyList)).toBe(true)
    })

    it('should handle stamp type list configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.stampTypeList).toBeDefined()
      expect(Array.isArray(configs.stampTypeList)).toBe(true)
    })

    it('should handle inner circle list configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.innerCircleList).toBeDefined()
      expect(Array.isArray(configs.innerCircleList)).toBe(true)
    })
  })

  describe('Security Pattern', () => {
    it('should have security pattern configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.securityPattern).toBeDefined()
      expect(configs.securityPattern).toHaveProperty('openSecurityPattern')
      expect(configs.securityPattern).toHaveProperty('securityPatternWidth')
      expect(configs.securityPattern).toHaveProperty('securityPatternLength')
      expect(configs.securityPattern).toHaveProperty('securityPatternCount')
    })

    it('should toggle security pattern', () => {
      const configs = drawStampUtils.getDrawConfigs()
      const initialValue = configs.securityPattern.openSecurityPattern
      
      configs.securityPattern.openSecurityPattern = !initialValue
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.securityPattern.openSecurityPattern).toBe(!initialValue)
    })
  })

  describe('Rough Edge Effect', () => {
    it('should have rough edge configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.roughEdge).toBeDefined()
      expect(configs.roughEdge).toHaveProperty('drawRoughEdge')
      expect(configs.roughEdge).toHaveProperty('roughEdgeWidth')
      expect(configs.roughEdge).toHaveProperty('roughEdgeHeight')
      expect(configs.roughEdge).toHaveProperty('roughEdgeProbability')
    })

    it('should toggle rough edge effect', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.roughEdge.drawRoughEdge = true
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.roughEdge.drawRoughEdge).toBe(true)
    })
  })

  describe('Aging Effect', () => {
    it('should have aging effect configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.agingEffect).toBeDefined()
      expect(configs.agingEffect).toHaveProperty('applyAging')
      expect(configs.agingEffect).toHaveProperty('agingIntensity')
      expect(configs.agingEffect).toHaveProperty('agingEffectParams')
    })

    it('should add manual aging effect', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.openManualAging = true
      drawStampUtils.setDrawConfigs(configs)
      
      const initialParamsLength = configs.agingEffect.agingEffectParams.length
      drawStampUtils.addManualAgingEffect(100, 100, 0.5)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.agingEffect.agingEffectParams.length).toBeGreaterThan(initialParamsLength)
    })
  })

  describe('Star Configuration', () => {
    it('should have star drawing configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.drawStar).toBeDefined()
      expect(configs.drawStar).toHaveProperty('drawStar')
      expect(configs.drawStar).toHaveProperty('starDiameter')
      expect(configs.drawStar).toHaveProperty('useImage')
    })

    it('should toggle star drawing', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.drawStar.drawStar = true
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.drawStar.drawStar).toBe(true)
    })

    it('should handle image configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.drawStar).toHaveProperty('imageUrl')
      expect(configs.drawStar).toHaveProperty('imageWidth')
      expect(configs.drawStar).toHaveProperty('imageHeight')
      expect(configs.drawStar).toHaveProperty('keepAspectRatio')
    })
  })

  describe('Company Configuration', () => {
    it('should have company configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.company).toBeDefined()
      expect(configs.company).toHaveProperty('companyName')
      expect(configs.company).toHaveProperty('compression')
      expect(configs.company).toHaveProperty('fontFamily')
      expect(configs.company).toHaveProperty('fontHeight')
    })

    it('should handle company list', () => {
      const configs = drawStampUtils.getDrawConfigs()
      const newCompany = {
        companyName: 'Test Company',
        compression: 1,
        borderOffset: 5,
        textDistributionFactor: 1,
        fontFamily: 'Arial',
        fontHeight: 10,
        fontWeight: 'normal',
        shape: 'ellipse' as const,
        adjustEllipseText: false,
        adjustEllipseTextFactor: 1
      }
      
      configs.companyList.push(newCompany)
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.companyList).toContainEqual(newCompany)
    })
  })

  describe('Stamp Type Configuration', () => {
    it('should have stamp type configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.stampType).toBeDefined()
      expect(configs.stampType).toHaveProperty('stampType')
      expect(configs.stampType).toHaveProperty('fontHeight')
      expect(configs.stampType).toHaveProperty('compression')
    })

    it('should handle stamp type list', () => {
      const configs = drawStampUtils.getDrawConfigs()
      const newStampType = {
        stampType: 'Official Seal',
        fontHeight: 8,
        fontFamily: 'Arial',
        compression: 1,
        letterSpacing: 0,
        positionY: 0,
        fontWidth: 1,
        fontWeight: 'normal',
        lineSpacing: 0
      }
      
      configs.stampTypeList.push(newStampType)
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.stampTypeList).toContainEqual(newStampType)
    })
  })

  describe('Inner Circle Configuration', () => {
    it('should have inner circle configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.innerCircle).toBeDefined()
      expect(configs.innerCircle).toHaveProperty('drawInnerCircle')
      expect(configs.innerCircle).toHaveProperty('innerCircleLineWidth')
    })

    it('should handle inner circle list', () => {
      const configs = drawStampUtils.getDrawConfigs()
      const newInnerCircle = {
        drawInnerCircle: true,
        innerCircleLineWidth: 2,
        innerCircleLineRadiusX: 20,
        innerCircleLineRadiusY: 20
      }
      
      configs.innerCircleList.push(newInnerCircle)
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.innerCircleList).toContainEqual(newInnerCircle)
    })
  })

  describe('Ruler Configuration', () => {
    it('should have ruler configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.ruler).toBeDefined()
      expect(configs.ruler).toHaveProperty('showRuler')
      expect(configs.ruler).toHaveProperty('showFullRuler')
    })

    it('should toggle ruler display', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.shouldDrawRuler = true
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.shouldDrawRuler).toBe(true)
    })
  })

  describe('Stamp Code and Tax Number', () => {
    it('should have stamp code configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.stampCode).toBeDefined()
      expect(configs.stampCode).toHaveProperty('code')
      expect(configs.stampCode).toHaveProperty('compression')
      expect(configs.stampCode).toHaveProperty('fontHeight')
    })

    it('should have tax number configuration', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.taxNumber).toBeDefined()
      expect(configs.taxNumber).toHaveProperty('code')
      expect(configs.taxNumber).toHaveProperty('fontHeight')
      expect(configs.taxNumber).toHaveProperty('letterSpacing')
    })

    it('should update stamp code', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.stampCode.code = '123456789'
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.stampCode.code).toBe('123456789')
    })

    it('should update tax number', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.taxNumber.code = '987654321'
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.taxNumber.code).toBe('987654321')
    })
  })

  describe('Primary Color', () => {
    it('should have default primary color', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.primaryColor).toBeDefined()
      expect(typeof configs.primaryColor).toBe('string')
    })

    it('should update primary color', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.primaryColor = '#0000ff'
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.primaryColor).toBe('#0000ff')
    })
  })

  describe('Refresh Operations', () => {
    it('should support refresh security pattern flag', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs).toHaveProperty('refreshSecurityPattern')
      expect(typeof configs.refreshSecurityPattern).toBe('boolean')
    })

    it('should support refresh old flag', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs).toHaveProperty('refreshOld')
      expect(typeof configs.refreshOld).toBe('boolean')
    })
  })

  describe('Image Cache Management', () => {
    it('should clear image cache', async () => {
      await expect(drawStampUtils.clearImageCache()).resolves.not.toThrow()
    })

    it('should update star image', async () => {
      const imageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      await expect(drawStampUtils.updateStarImage(imageUrl)).resolves.not.toThrow()
      
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.drawStar.imageUrl).toBe(imageUrl)
      expect(configs.drawStar.useImage).toBe(true)
      expect(configs.drawStar.drawStar).toBe(true)
    })
  })

  describe('Zoom Operations', () => {
    it('should reset zoom', () => {
      expect(() => drawStampUtils.resetZoom()).not.toThrow()
    })
  })

  describe('Manual Aging', () => {
    it('should support manual aging mode', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs).toHaveProperty('openManualAging')
      expect(typeof configs.openManualAging).toBe('boolean')
    })

    it('should add aging effects when manual aging is enabled', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.openManualAging = true
      drawStampUtils.setDrawConfigs(configs)
      
      const beforeLength = configs.agingEffect.agingEffectParams.length
      drawStampUtils.addManualAgingEffect(50, 50, 1)
      
      const afterConfigs = drawStampUtils.getDrawConfigs()
      expect(afterConfigs.agingEffect.agingEffectParams.length).toBeGreaterThan(beforeLength)
    })
  })

  describe('Dimension Configuration', () => {
    it('should handle width and height', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.width).toBeDefined()
      expect(configs.height).toBeDefined()
      expect(typeof configs.width).toBe('number')
      expect(typeof configs.height).toBe('number')
    })

    it('should handle border width', () => {
      const configs = drawStampUtils.getDrawConfigs()
      expect(configs.borderWidth).toBeDefined()
      expect(typeof configs.borderWidth).toBe('number')
    })

    it('should update dimensions', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.width = 60
      configs.height = 40
      configs.borderWidth = 3
      drawStampUtils.setDrawConfigs(configs)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.width).toBe(60)
      expect(updatedConfigs.height).toBe(40)
      expect(updatedConfigs.borderWidth).toBe(3)
    })
  })
})
