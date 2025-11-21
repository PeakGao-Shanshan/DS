# Testing Documentation

## Overview

This project now includes a comprehensive test suite using Vitest, covering the DrawStampUtils library with 81 tests across 3 test files.

## Test Coverage

### Test Files

1. **DrawStampUtils.test.ts** (40 tests)
   - Core functionality tests for the DrawStampUtils class
   - Configuration management
   - All feature flags and settings
   - Public API methods

2. **types.test.ts** (17 tests)
   - Type definition validation
   - TypeScript interface structure tests
   - Type safety verification

3. **integration.test.ts** (24 tests)
   - Real-world usage scenarios
   - Multiple feature interactions
   - Edge cases
   - Configuration persistence

## Test Statistics

- **Total Tests**: 81
- **Pass Rate**: 100%
- **Test Files**: 3
- **Coverage Areas**: 
  - Configuration management
  - Security patterns
  - Aging effects
  - Rough edges
  - Star/image drawing
  - Company names
  - Stamp types
  - Inner circles
  - Tax numbers and codes
  - Type safety

## Running Tests

### Basic Commands

```bash
# Run all tests once
npm test -- --run

# Run tests in watch mode (for development)
npm test

# Run with UI interface
npm run test:ui

# Run with coverage report
npm run test:coverage
```

### Advanced Usage

```bash
# Run specific test file
npm test -- DrawStampUtils.test.ts

# Run with verbose output
npm test -- --run --reporter=verbose

# Run tests matching a pattern
npm test -- --run -t "Configuration"
```

## Test Environment

- **Framework**: Vitest v4.x
- **Test Environment**: jsdom (browser simulation)
- **Canvas Mocking**: Custom MockCanvasRenderingContext2D
- **Vue Testing**: @testing-library/vue

## Test Setup

The test environment includes:

1. **Canvas Mocking** (`setup.ts`)
   - Mock 2D rendering context
   - Mock Image class
   - Mock createImageBitmap API

2. **jsdom Environment**
   - Browser APIs simulation
   - DOM manipulation support
   - Event handling

## Test Categories

### Unit Tests
- Individual method testing
- Configuration getter/setter
- Type validation
- Error handling

### Integration Tests
- Multi-feature interactions
- State management
- Configuration persistence
- Real-world scenarios

### Type Tests
- Interface structure validation
- Type safety verification
- Union type support
- Optional property handling

## Coverage Areas

### Core Features ✓
- [x] Canvas initialization
- [x] Configuration management
- [x] Security pattern
- [x] Rough edge effects
- [x] Aging effects (manual & automatic)
- [x] Star drawing
- [x] Image drawing
- [x] Company name rendering
- [x] Stamp type rendering
- [x] Inner circles
- [x] Tax numbers
- [x] Stamp codes
- [x] Ruler display
- [x] Zoom functionality
- [x] Image caching

### Configuration Options ✓
- [x] Width/Height/Border
- [x] Primary color
- [x] Font settings
- [x] Shape variations (ellipse/rectangle)
- [x] Multiple text lines
- [x] Multiple inner circles
- [x] Aspect ratio handling

### Edge Cases ✓
- [x] Empty lists
- [x] Zero values
- [x] Extreme dimensions
- [x] Multiple aging effects
- [x] Color format variations
- [x] Configuration persistence

## Future Enhancements

Potential areas for additional testing:
- Visual regression testing
- Performance benchmarks
- Cross-browser compatibility
- Canvas output validation
- SVG path parsing edge cases

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure all existing tests pass
3. Add integration tests for complex features
4. Update this documentation

## Troubleshooting

### Common Issues

**Tests fail with "Failed to get canvas context"**
- Ensure jsdom is installed: `npm install -D jsdom`
- Check that `setup.ts` is being loaded in vitest.config.ts

**Image loading errors**
- Mock Image class handles async loading
- Use data URLs for test images
- Check createImageBitmap mock

**Type errors in tests**
- Ensure TypeScript is configured correctly
- Check that all types are exported from DrawStampUtils.ts
- Verify vitest/config includes TypeScript support

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [jsdom Documentation](https://github.com/jsdom/jsdom)

## Maintenance

Tests should be run:
- Before every commit
- Before merging to main
- After dependency updates
- When adding new features

Keep tests fast, focused, and maintainable!
