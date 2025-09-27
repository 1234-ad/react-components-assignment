# Contributing to React Components Assignment

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/1234-ad/react-components-assignment.git
   cd react-components-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Start Storybook**
   ```bash
   npm run storybook
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── InputField/     # InputField component
│   ├── DataTable/      # DataTable component
│   └── index.ts        # Component exports
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── test/               # Test configuration
└── styles/             # Global styles
```

## Component Development Guidelines

### 1. Component Structure
Each component should follow this structure:
```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx    # Unit tests
└── index.ts               # Component export
```

### 2. TypeScript
- Use proper TypeScript typing for all props and functions
- Export interfaces for component props
- Use generics where appropriate (especially for DataTable)

### 3. Styling
- Use TailwindCSS utility classes
- Support dark mode with `dark:` variants
- Ensure responsive design with mobile-first approach
- Use consistent spacing and sizing scales

### 4. Accessibility
- Include proper ARIA labels and roles
- Ensure keyboard navigation works
- Use semantic HTML elements
- Test with screen readers when possible

### 5. Testing
- Write unit tests for all components
- Test user interactions (clicks, form inputs, etc.)
- Test different prop combinations
- Test accessibility features

## Code Style

### TypeScript/React
- Use functional components with hooks
- Use `forwardRef` for components that need ref forwarding
- Prefer named exports over default exports for utilities
- Use proper JSDoc comments for complex functions

### CSS/Styling
- Use TailwindCSS utility classes
- Group related classes together
- Use conditional classes with `clsx` utility
- Follow mobile-first responsive design

## Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm run test -- --watch
```

### Writing Tests
- Use React Testing Library for component tests
- Test user behavior, not implementation details
- Use descriptive test names
- Group related tests with `describe` blocks

## Storybook

### Writing Stories
- Create comprehensive stories showing all component states
- Use controls for interactive props
- Include documentation in story descriptions
- Show real-world usage examples

### Story Categories
- **Default**: Basic component usage
- **Variants**: Different visual variants
- **States**: Different component states
- **Interactive**: Stories with user interaction
- **Examples**: Real-world usage examples

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding guidelines above
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

4. **Create a pull request**
   - Use a descriptive title
   - Include a detailed description of changes
   - Reference any related issues
   - Include screenshots for UI changes

## Component Requirements Checklist

When creating or updating components, ensure:

- [ ] TypeScript interfaces are properly defined
- [ ] Component supports all required props
- [ ] Responsive design works on all screen sizes
- [ ] Dark mode is properly supported
- [ ] Accessibility features are implemented
- [ ] Unit tests cover main functionality
- [ ] Storybook stories demonstrate all features
- [ ] Documentation is updated

## Getting Help

If you need help or have questions:

1. Check existing issues and discussions
2. Create a new issue with detailed information
3. Join our community discussions

## Code of Conduct

Please be respectful and constructive in all interactions. We're all here to learn and build great components together!

Thank you for contributing! 🚀