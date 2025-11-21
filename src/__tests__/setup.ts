import { beforeAll, vi } from 'vitest'

// Mock Canvas 2D Context
class MockCanvasRenderingContext2D {
  canvas: HTMLCanvasElement
  fillStyle: string | CanvasGradient | CanvasPattern = '#000000'
  strokeStyle: string | CanvasGradient | CanvasPattern = '#000000'
  lineWidth: number = 1
  font: string = '10px sans-serif'
  textAlign: CanvasTextAlign = 'start'
  textBaseline: CanvasTextBaseline = 'alphabetic'
  globalCompositeOperation: GlobalCompositeOperation = 'source-over'
  globalAlpha: number = 1
  lineCap: CanvasLineCap = 'butt'
  lineJoin: CanvasLineJoin = 'miter'
  miterLimit: number = 10

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  clearRect = vi.fn()
  fillRect = vi.fn()
  strokeRect = vi.fn()
  beginPath = vi.fn()
  closePath = vi.fn()
  moveTo = vi.fn()
  lineTo = vi.fn()
  arc = vi.fn()
  arcTo = vi.fn()
  ellipse = vi.fn()
  rect = vi.fn()
  fill = vi.fn()
  stroke = vi.fn()
  clip = vi.fn()
  save = vi.fn()
  restore = vi.fn()
  scale = vi.fn()
  rotate = vi.fn()
  translate = vi.fn()
  transform = vi.fn()
  setTransform = vi.fn()
  resetTransform = vi.fn()
  fillText = vi.fn()
  strokeText = vi.fn()
  measureText = vi.fn(() => ({ width: 10 } as TextMetrics))
  drawImage = vi.fn()
  createLinearGradient = vi.fn()
  createRadialGradient = vi.fn()
  createPattern = vi.fn()
  getImageData = vi.fn()
  putImageData = vi.fn()
  createImageData = vi.fn()
  setLineDash = vi.fn()
  getLineDash = vi.fn(() => [])
  bezierCurveTo = vi.fn()
  quadraticCurveTo = vi.fn()
  isPointInPath = vi.fn(() => false)
  isPointInStroke = vi.fn(() => false)
}

beforeAll(() => {
  // Mock HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.getContext = vi.fn((contextType: string) => {
    if (contextType === '2d') {
      return new MockCanvasRenderingContext2D(
        {} as HTMLCanvasElement
      ) as unknown as CanvasRenderingContext2D
    }
    return null
  }) as any

  // Mock document.createElement for canvas
  const originalCreateElement = document.createElement.bind(document)
  document.createElement = vi.fn((tagName: string) => {
    if (tagName === 'canvas') {
      const canvas = originalCreateElement('canvas') as HTMLCanvasElement
      canvas.width = 800
      canvas.height = 600
      return canvas
    }
    return originalCreateElement(tagName)
  }) as any

  // Mock Image
  global.Image = class MockImage {
    src = ''
    width = 0
    height = 0
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    
    constructor() {
      setTimeout(() => {
        this.width = 100
        this.height = 100
        if (this.onload) {
          this.onload()
        }
      }, 0)
    }
  } as any

  // Mock createImageBitmap
  global.createImageBitmap = vi.fn(async () => {
    return {
      width: 100,
      height: 100,
      close: vi.fn()
    } as unknown as ImageBitmap
  })
})
