import { describe, it, expect, beforeEach } from 'vitest'
import { DrawStampUtils } from '../DrawStampUtils'

describe('DrawStampUtils Integration Tests', () => {
  let canvas: HTMLCanvasElement
  let drawStampUtils: DrawStampUtils
  const mmToPixel = 10

  beforeEach(() => {
    canvas = document.createElement('canvas')
    canvas.width = 800
    canvas.height = 600
    drawStampUtils = new DrawStampUtils(canvas, mmToPixel)
  })

  describe('Complete Stamp Configuration', () => {
    it('should create a complete stamp with all features enabled', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      // Configure all features
      configs.width = 42
      configs.height = 42
      configs.borderWidth = 2
      configs.primaryColor = '#ff0000'
      
      // Security pattern
      configs.securityPattern.openSecurityPattern = true
      configs.securityPattern.securityPatternCount = 10
      
      // Rough edge
      configs.roughEdge.drawRoughEdge = true
      configs.roughEdge.roughEdgeWidth = 2
      
      // Aging effect
      configs.agingEffect.applyAging = true
      configs.agingEffect.agingIntensity = 50
      
      // Star
      configs.drawStar.drawStar = true
      configs.drawStar.starDiameter = 14
      
      // Ruler
      configs.shouldDrawRuler = true
      
      // Company
      configs.companyList = [
        {
          companyName: 'Test Company Ltd.',
          compression: 1,
          borderOffset: 5,
          textDistributionFactor: 1,
          fontFamily: 'Arial',
          fontHeight: 10,
          fontWeight: 'bold',
          shape: 'ellipse',
          adjustEllipseText: false,
          adjustEllipseTextFactor: 1
        }
      ]
      
      // Stamp type
      configs.stampTypeList = [
        {
          stampType: 'Official Seal',
          fontHeight: 8,
          fontFamily: 'Arial',
          compression: 1,
          letterSpacing: 0,
          positionY: 0,
          fontWidth: 1,
          fontWeight: 'normal',
          lineSpacing: 2
        }
      ]
      
      // Inner circles
      configs.innerCircleList = [
        {
          drawInnerCircle: true,
          innerCircleLineWidth: 1,
          innerCircleLineRadiusX: 15,
          innerCircleLineRadiusY: 15
        }
      ]
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.width).toBe(42)
      expect(updatedConfigs.securityPattern.openSecurityPattern).toBe(true)
      expect(updatedConfigs.roughEdge.drawRoughEdge).toBe(true)
      expect(updatedConfigs.agingEffect.applyAging).toBe(true)
      expect(updatedConfigs.drawStar.drawStar).toBe(true)
      expect(updatedConfigs.companyList.length).toBe(1)
      expect(updatedConfigs.stampTypeList.length).toBe(1)
      expect(updatedConfigs.innerCircleList.length).toBe(1)
    })
  })

  describe('Multiple Companies and Types', () => {
    it('should handle multiple company names', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.companyList = [
        {
          companyName: 'First Line Company',
          compression: 1,
          borderOffset: 5,
          textDistributionFactor: 1,
          fontFamily: 'Arial',
          fontHeight: 10,
          fontWeight: 'bold',
          shape: 'ellipse',
          adjustEllipseText: false,
          adjustEllipseTextFactor: 1
        },
        {
          companyName: 'Second Line',
          compression: 0.9,
          borderOffset: 3,
          textDistributionFactor: 1.1,
          fontFamily: 'Arial',
          fontHeight: 8,
          fontWeight: 'normal',
          shape: 'ellipse',
          adjustEllipseText: true,
          adjustEllipseTextFactor: 1.2
        }
      ]
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.companyList.length).toBe(2)
      expect(updatedConfigs.companyList[0].companyName).toBe('First Line Company')
      expect(updatedConfigs.companyList[1].companyName).toBe('Second Line')
    })

    it('should handle multiple stamp types', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.stampTypeList = [
        {
          stampType: 'Official',
          fontHeight: 8,
          fontFamily: 'Arial',
          compression: 1,
          letterSpacing: 0,
          positionY: -10,
          fontWidth: 1,
          fontWeight: 'bold',
          lineSpacing: 2
        },
        {
          stampType: 'Seal',
          fontHeight: 7,
          fontFamily: 'Arial',
          compression: 0.9,
          letterSpacing: 1,
          positionY: 0,
          fontWidth: 0.9,
          fontWeight: 'normal',
          lineSpacing: 1
        }
      ]
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.stampTypeList.length).toBe(2)
      expect(updatedConfigs.stampTypeList[0].stampType).toBe('Official')
      expect(updatedConfigs.stampTypeList[1].stampType).toBe('Seal')
    })

    it('should handle multiple inner circles', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.innerCircleList = [
        {
          drawInnerCircle: true,
          innerCircleLineWidth: 1,
          innerCircleLineRadiusX: 20,
          innerCircleLineRadiusY: 20
        },
        {
          drawInnerCircle: true,
          innerCircleLineWidth: 0.5,
          innerCircleLineRadiusX: 15,
          innerCircleLineRadiusY: 15
        },
        {
          drawInnerCircle: false,
          innerCircleLineWidth: 1,
          innerCircleLineRadiusX: 10,
          innerCircleLineRadiusY: 10
        }
      ]
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.innerCircleList.length).toBe(3)
      expect(updatedConfigs.innerCircleList[0].drawInnerCircle).toBe(true)
      expect(updatedConfigs.innerCircleList[2].drawInnerCircle).toBe(false)
    })
  })

  describe('Shape Variations', () => {
    it('should support ellipse shape', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.width = 50
      configs.height = 35
      configs.company.shape = 'ellipse'
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.width).toBe(50)
      expect(updatedConfigs.height).toBe(35)
      expect(updatedConfigs.company.shape).toBe('ellipse')
    })

    it('should support rectangle shape', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.width = 60
      configs.height = 40
      configs.company.shape = 'rectangle'
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.width).toBe(60)
      expect(updatedConfigs.height).toBe(40)
      expect(updatedConfigs.company.shape).toBe('rectangle')
    })

    it('should support circular stamp (equal width and height)', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.width = 42
      configs.height = 42
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.width).toBe(updatedConfigs.height)
    })
  })

  describe('Ellipse Text Adjustment', () => {
    it('should enable ellipse text adjustment', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.company.adjustEllipseText = true
      configs.company.adjustEllipseTextFactor = 1.5
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.company.adjustEllipseText).toBe(true)
      expect(updatedConfigs.company.adjustEllipseTextFactor).toBe(1.5)
    })

    it('should apply different factors to company list items', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.companyList = [
        {
          companyName: 'Test',
          compression: 1,
          borderOffset: 5,
          textDistributionFactor: 1,
          fontFamily: 'Arial',
          fontHeight: 10,
          fontWeight: 'normal',
          shape: 'ellipse',
          adjustEllipseText: true,
          adjustEllipseTextFactor: 1.2
        },
        {
          companyName: 'Test2',
          compression: 1,
          borderOffset: 5,
          textDistributionFactor: 1,
          fontFamily: 'Arial',
          fontHeight: 10,
          fontWeight: 'normal',
          shape: 'ellipse',
          adjustEllipseText: true,
          adjustEllipseTextFactor: 1.5
        }
      ]
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.companyList[0].adjustEllipseTextFactor).toBe(1.2)
      expect(updatedConfigs.companyList[1].adjustEllipseTextFactor).toBe(1.5)
    })
  })

  describe('Aging Effect Accumulation', () => {
    it('should accumulate multiple aging effects', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.openManualAging = true
      drawStampUtils.setDrawConfigs(configs)
      
      const initialCount = configs.agingEffect.agingEffectParams.length
      
      // Add multiple aging effects
      drawStampUtils.addManualAgingEffect(100, 100, 0.5)
      drawStampUtils.addManualAgingEffect(150, 150, 0.7)
      drawStampUtils.addManualAgingEffect(200, 200, 0.3)
      
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.agingEffect.agingEffectParams.length).toBeGreaterThan(initialCount)
    })

    it('should vary aging intensity', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.openManualAging = true
      drawStampUtils.setDrawConfigs(configs)
      
      drawStampUtils.addManualAgingEffect(100, 100, 0.1)
      const lowIntensity = drawStampUtils.getDrawConfigs().agingEffect.agingEffectParams.length
      
      drawStampUtils.addManualAgingEffect(100, 100, 1.0)
      const highIntensity = drawStampUtils.getDrawConfigs().agingEffect.agingEffectParams.length
      
      expect(highIntensity).toBeGreaterThan(lowIntensity)
    })
  })

  describe('Image vs Star Configuration', () => {
    it('should switch from star to image', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.drawStar.drawStar = true
      configs.drawStar.useImage = false
      
      drawStampUtils.setDrawConfigs(configs)
      let updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.drawStar.useImage).toBe(false)
      
      // Switch to image
      configs.drawStar.useImage = true
      configs.drawStar.imageUrl = 'test.png'
      configs.drawStar.imageWidth = 15
      configs.drawStar.imageHeight = 15
      
      drawStampUtils.setDrawConfigs(configs)
      updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.drawStar.useImage).toBe(true)
      expect(updatedConfigs.drawStar.imageUrl).toBe('test.png')
    })

    it('should respect keep aspect ratio setting', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.drawStar.useImage = true
      configs.drawStar.imageWidth = 20
      configs.drawStar.imageHeight = 10
      configs.drawStar.keepAspectRatio = true
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.drawStar.keepAspectRatio).toBe(true)
    })
  })

  describe('Code and Tax Number', () => {
    it('should configure stamp code independently', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.stampCode.code = 'CODE-12345'
      configs.stampCode.fontHeight = 6
      configs.stampCode.compression = 0.8
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.stampCode.code).toBe('CODE-12345')
      expect(updatedConfigs.stampCode.fontHeight).toBe(6)
    })

    it('should configure tax number independently', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.taxNumber.code = 'TAX-987654321'
      configs.taxNumber.fontHeight = 5
      configs.taxNumber.letterSpacing = 2
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      
      expect(updatedConfigs.taxNumber.code).toBe('TAX-987654321')
      expect(updatedConfigs.taxNumber.letterSpacing).toBe(2)
    })
  })

  describe('Color Variations', () => {
    it('should support different color formats', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff']
      
      colors.forEach(color => {
        configs.primaryColor = color
        drawStampUtils.setDrawConfigs(configs)
        const updatedConfigs = drawStampUtils.getDrawConfigs()
        expect(updatedConfigs.primaryColor).toBe(color)
      })
    })
  })

  describe('Reset and Clear Operations', () => {
    it('should reset zoom to default', () => {
      expect(() => drawStampUtils.resetZoom()).not.toThrow()
    })

    it('should clear image cache without errors', async () => {
      await expect(drawStampUtils.clearImageCache()).resolves.not.toThrow()
    })
  })

  describe('Configuration Persistence', () => {
    it('should maintain configuration across multiple get/set cycles', () => {
      const configs = drawStampUtils.getDrawConfigs()
      
      configs.width = 50
      configs.primaryColor = '#123456'
      configs.companyList[0] = {
        companyName: 'Persistent Company',
        compression: 1,
        borderOffset: 5,
        textDistributionFactor: 1,
        fontFamily: 'Arial',
        fontHeight: 10,
        fontWeight: 'bold',
        shape: 'ellipse',
        adjustEllipseText: false,
        adjustEllipseTextFactor: 1
      }
      
      drawStampUtils.setDrawConfigs(configs)
      
      // Get config multiple times
      for (let i = 0; i < 5; i++) {
        const retrievedConfigs = drawStampUtils.getDrawConfigs()
        expect(retrievedConfigs.width).toBe(50)
        expect(retrievedConfigs.primaryColor).toBe('#123456')
        expect(retrievedConfigs.companyList[0].companyName).toBe('Persistent Company')
      }
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty company list', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.companyList = []
      
      expect(() => drawStampUtils.setDrawConfigs(configs)).not.toThrow()
    })

    it('should handle empty stamp type list', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.stampTypeList = []
      
      expect(() => drawStampUtils.setDrawConfigs(configs)).not.toThrow()
    })

    it('should handle zero border width', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.borderWidth = 0
      
      drawStampUtils.setDrawConfigs(configs)
      const updatedConfigs = drawStampUtils.getDrawConfigs()
      expect(updatedConfigs.borderWidth).toBe(0)
    })

    it('should handle very large dimensions', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.width = 200
      configs.height = 200
      
      expect(() => drawStampUtils.setDrawConfigs(configs)).not.toThrow()
    })

    it('should handle very small dimensions', () => {
      const configs = drawStampUtils.getDrawConfigs()
      configs.width = 10
      configs.height = 10
      
      expect(() => drawStampUtils.setDrawConfigs(configs)).not.toThrow()
    })
  })
})
