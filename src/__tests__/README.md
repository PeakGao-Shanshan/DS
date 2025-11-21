# DrawStampUtils Tests

This directory contains comprehensive unit and integration tests for the DrawStampUtils library.

## Test Structure

### 1. DrawStampUtils.test.ts
Main test suite for the DrawStampUtils class covering:
- **Constructor**: Initialization and canvas setup
- **Configuration Management**: Getting and setting draw configurations
- **Security Pattern**: Anti-counterfeiting pattern features
- **Rough Edge Effect**: Border roughness effects
- **Aging Effect**: Manual and automatic aging effects
- **Star Configuration**: Five-pointed star and image drawing
- **Company Configuration**: Company name handling (single and multiple)
- **Stamp Type Configuration**: Stamp type text handling
- **Inner Circle Configuration**: Inner circle management
- **Ruler Configuration**: Ruler display settings
- **Stamp Code and Tax Number**: Code and tax number configuration
- **Primary Color**: Color management
- **Image Cache Management**: Image loading and caching
- **Zoom Operations**: Canvas zoom functionality
- **Dimension Configuration**: Width, height, and border settings

### 2. types.test.ts
Type definition tests covering all exported types:
- `ISecurityPattern`: Security pattern configuration
- `IRoughEdge`: Rough edge effect parameters
- `ICompany`: Company name configuration
- `ICode`: Stamp code configuration
- `ITaxNumber`: Tax number configuration
- `IAgingEffectParams`: Aging effect parameters
- `IAgingEffect`: Aging effect configuration
- `IDrawStar`: Star/image drawing configuration
- `IStampType`: Stamp type text configuration
- `IInnerCircle`: Inner circle configuration
- `IShowRuler`: Ruler display configuration
- `IDrawStampConfig`: Complete stamp configuration

### 3. integration.test.ts
Integration tests covering real-world usage scenarios:
- **Complete Stamp Configuration**: Testing all features together
- **Multiple Companies and Types**: Handling multiple text elements
- **Shape Variations**: Ellipse, rectangle, and circular stamps
- **Ellipse Text Adjustment**: Text spacing adjustments
- **Aging Effect Accumulation**: Multiple aging effects
- **Image vs Star Configuration**: Switching between modes
- **Code and Tax Number**: Independent configuration
- **Color Variations**: Different color formats
- **Configuration Persistence**: State management
- **Edge Cases**: Empty lists, zero values, extreme dimensions

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run specific test file
```bash
npm test DrawStampUtils.test.ts
```

## Test Environment

- **Framework**: Vitest
- **Environment**: jsdom (browser-like environment)
- **Canvas Mocking**: Custom canvas context mock in `setup.ts`

## Coverage

The test suite provides comprehensive coverage of:
- All public APIs
- Configuration management
- Type safety
- Edge cases and error handling
- Integration scenarios

## Notes

- Canvas operations are mocked using a custom `MockCanvasRenderingContext2D` class
- Image loading is mocked to work in the test environment
- Tests run in a jsdom environment to simulate browser APIs
