import { describe, it, expect } from 'vitest'
import type {
  ISecurityPattern,
  IRoughEdge,
  ICompany,
  ICode,
  ITaxNumber,
  IAgingEffectParams,
  IAgingEffect,
  IDrawStar,
  IStampType,
  IInnerCircle,
  IShowRuler,
  IDrawStampConfig
} from '../DrawStampUtils'

describe('Type Definitions', () => {
  describe('ISecurityPattern', () => {
    it('should have correct structure', () => {
      const securityPattern: ISecurityPattern = {
        openSecurityPattern: true,
        securityPatternWidth: 0.15,
        securityPatternLength: 3,
        securityPatternCount: 5,
        securityPatternAngleRange: 40,
        securityPatternParams: []
      }
      
      expect(securityPattern.openSecurityPattern).toBe(true)
      expect(securityPattern.securityPatternWidth).toBe(0.15)
      expect(Array.isArray(securityPattern.securityPatternParams)).toBe(true)
    })
  })

  describe('IRoughEdge', () => {
    it('should have correct structure', () => {
      const roughEdge: IRoughEdge = {
        drawRoughEdge: true,
        roughEdgeWidth: 2,
        roughEdgeHeight: 50,
        roughEdgeShift: 0,
        roughEdgeParams: [],
        roughEdgeProbability: 0.5,
        roughEdgePoints: 100
      }
      
      expect(roughEdge.drawRoughEdge).toBe(true)
      expect(roughEdge.roughEdgeWidth).toBe(2)
      expect(Array.isArray(roughEdge.roughEdgeParams)).toBe(true)
    })
  })

  describe('ICompany', () => {
    it('should have correct structure', () => {
      const company: ICompany = {
        companyName: 'Test Company',
        compression: 1,
        borderOffset: 5,
        textDistributionFactor: 1,
        fontFamily: 'Arial',
        fontHeight: 10,
        fontWeight: 'normal',
        shape: 'ellipse',
        adjustEllipseText: false,
        adjustEllipseTextFactor: 1
      }
      
      expect(company.companyName).toBe('Test Company')
      expect(company.shape).toBe('ellipse')
      expect(company.fontFamily).toBe('Arial')
    })

    it('should support rectangle shape', () => {
      const company: ICompany = {
        companyName: 'Test',
        compression: 1,
        borderOffset: 5,
        textDistributionFactor: 1,
        fontFamily: 'Arial',
        fontHeight: 10,
        fontWeight: 'bold',
        shape: 'rectangle',
        adjustEllipseText: false,
        adjustEllipseTextFactor: 1
      }
      
      expect(company.shape).toBe('rectangle')
    })
  })

  describe('ICode', () => {
    it('should have correct structure', () => {
      const code: ICode = {
        code: '123456',
        compression: 1,
        fontHeight: 8,
        fontFamily: 'Arial',
        borderOffset: 5,
        fontWidth: 1,
        textDistributionFactor: 1,
        fontWeight: 'normal'
      }
      
      expect(code.code).toBe('123456')
      expect(code.fontHeight).toBe(8)
    })
  })

  describe('ITaxNumber', () => {
    it('should have correct structure', () => {
      const taxNumber: ITaxNumber = {
        code: '987654321',
        compression: 1,
        fontHeight: 8,
        fontFamily: 'Arial',
        fontWidth: 1,
        letterSpacing: 0,
        positionY: 0,
        totalWidth: 100,
        fontWeight: 'normal'
      }
      
      expect(taxNumber.code).toBe('987654321')
      expect(taxNumber.letterSpacing).toBe(0)
    })
  })

  describe('IAgingEffectParams', () => {
    it('should have correct structure', () => {
      const params: IAgingEffectParams = {
        x: 100,
        y: 100,
        noiseSize: 3,
        noise: 50,
        strongNoiseSize: 5,
        strongNoise: 100,
        fade: 25,
        seed: 0.5
      }
      
      expect(params.x).toBe(100)
      expect(params.y).toBe(100)
      expect(params.seed).toBe(0.5)
    })
  })

  describe('IAgingEffect', () => {
    it('should have correct structure', () => {
      const agingEffect: IAgingEffect = {
        applyAging: true,
        agingIntensity: 50,
        agingEffectParams: []
      }
      
      expect(agingEffect.applyAging).toBe(true)
      expect(agingEffect.agingIntensity).toBe(50)
      expect(Array.isArray(agingEffect.agingEffectParams)).toBe(true)
    })
  })

  describe('IDrawStar', () => {
    it('should have correct structure', () => {
      const drawStar: IDrawStar = {
        svgPath: 'M 0 -1 L 0.588 0.809',
        drawStar: true,
        starDiameter: 14,
        starPositionY: 0,
        scaleToSmallStar: false,
        useImage: false,
        imageUrl: '',
        imageWidth: 10,
        imageHeight: 10,
        keepAspectRatio: true
      }
      
      expect(drawStar.drawStar).toBe(true)
      expect(drawStar.starDiameter).toBe(14)
      expect(drawStar.keepAspectRatio).toBe(true)
    })

    it('should support image mode', () => {
      const drawStar: IDrawStar = {
        svgPath: '',
        drawStar: true,
        starDiameter: 14,
        starPositionY: 0,
        scaleToSmallStar: false,
        useImage: true,
        imageUrl: 'test.png',
        imageWidth: 20,
        imageHeight: 20,
        keepAspectRatio: false
      }
      
      expect(drawStar.useImage).toBe(true)
      expect(drawStar.imageUrl).toBe('test.png')
      expect(drawStar.keepAspectRatio).toBe(false)
    })
  })

  describe('IStampType', () => {
    it('should have correct structure', () => {
      const stampType: IStampType = {
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
      
      expect(stampType.stampType).toBe('Official Seal')
      expect(stampType.fontHeight).toBe(8)
      expect(stampType.lineSpacing).toBe(0)
    })
  })

  describe('IInnerCircle', () => {
    it('should have correct structure', () => {
      const innerCircle: IInnerCircle = {
        drawInnerCircle: true,
        innerCircleLineWidth: 2,
        innerCircleLineRadiusX: 20,
        innerCircleLineRadiusY: 20
      }
      
      expect(innerCircle.drawInnerCircle).toBe(true)
      expect(innerCircle.innerCircleLineWidth).toBe(2)
    })
  })

  describe('IShowRuler', () => {
    it('should have correct structure', () => {
      const ruler: IShowRuler = {
        showRuler: true,
        showFullRuler: true
      }
      
      expect(ruler.showRuler).toBe(true)
      expect(ruler.showFullRuler).toBe(true)
    })
  })

  describe('IDrawStampConfig', () => {
    it('should have all required properties', () => {
      const config: Partial<IDrawStampConfig> = {
        width: 42,
        height: 42,
        borderWidth: 2,
        primaryColor: '#ff0000',
        refreshSecurityPattern: false,
        refreshOld: false,
        shouldDrawRuler: true,
        openManualAging: false
      }
      
      expect(config.width).toBe(42)
      expect(config.primaryColor).toBe('#ff0000')
      expect(config.shouldDrawRuler).toBe(true)
    })

    it('should support lists for multiple elements', () => {
      const config: Partial<IDrawStampConfig> = {
        companyList: [
          {
            companyName: 'Company 1',
            compression: 1,
            borderOffset: 5,
            textDistributionFactor: 1,
            fontFamily: 'Arial',
            fontHeight: 10,
            fontWeight: 'normal',
            shape: 'ellipse',
            adjustEllipseText: false,
            adjustEllipseTextFactor: 1
          }
        ],
        stampTypeList: [
          {
            stampType: 'Type 1',
            fontHeight: 8,
            fontFamily: 'Arial',
            compression: 1,
            letterSpacing: 0,
            positionY: 0,
            fontWidth: 1,
            fontWeight: 'normal',
            lineSpacing: 0
          }
        ],
        innerCircleList: [
          {
            drawInnerCircle: true,
            innerCircleLineWidth: 2,
            innerCircleLineRadiusX: 20,
            innerCircleLineRadiusY: 20
          }
        ]
      }
      
      expect(Array.isArray(config.companyList)).toBe(true)
      expect(Array.isArray(config.stampTypeList)).toBe(true)
      expect(Array.isArray(config.innerCircleList)).toBe(true)
      expect(config.companyList?.length).toBe(1)
      expect(config.stampTypeList?.length).toBe(1)
      expect(config.innerCircleList?.length).toBe(1)
    })
  })

  describe('Font Weight Types', () => {
    it('should support string font weights', () => {
      const company: ICompany = {
        companyName: 'Test',
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
      
      expect(company.fontWeight).toBe('bold')
    })

    it('should support numeric font weights', () => {
      const company: ICompany = {
        companyName: 'Test',
        compression: 1,
        borderOffset: 5,
        textDistributionFactor: 1,
        fontFamily: 'Arial',
        fontHeight: 10,
        fontWeight: 700,
        shape: 'ellipse',
        adjustEllipseText: false,
        adjustEllipseTextFactor: 1
      }
      
      expect(company.fontWeight).toBe(700)
    })
  })
})
