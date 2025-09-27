# React Components Assignment

A modern React component library featuring InputField and DataTable components built with TypeScript, TailwindCSS, and Storybook.

## 🚀 Features

### InputField Component
- ✅ Flexible input with label, placeholder, helper text, error message
- ✅ States: disabled, invalid, loading
- ✅ Variants: filled, outlined, ghost
- ✅ Sizes: small, medium, large
- ✅ Optional clear button and password toggle
- ✅ Light & dark theme support
- ✅ Full TypeScript support
- ✅ Accessibility compliant

### DataTable Component
- ✅ Display tabular data with proper typing
- ✅ Column sorting functionality
- ✅ Row selection (single/multiple)
- ✅ Loading and empty states
- ✅ Responsive design
- ✅ Accessibility features

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **TailwindCSS** - Utility-first styling
- **Storybook** - Component documentation
- **Vite** - Fast build tool
- **Vitest** - Testing framework

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/1234-ad/react-components-assignment.git
cd react-components-assignment

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

## 🎯 Usage

### InputField Component

```tsx
import { InputField } from './components/InputField';

function App() {
  const [value, setValue] = useState('');

  return (
    <InputField
      label="Email"
      placeholder="Enter your email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="outlined"
      size="md"
    />
  );
}
```

### DataTable Component

```tsx
import { DataTable } from './components/DataTable';

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' },
];

function App() {
  return (
    <DataTable
      data={data}
      columns={columns}
      selectable
      onRowSelect={(rows) => console.log('Selected:', rows)}
    />
  );
}
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui
```

## 📚 Storybook

View component documentation and interactive examples:

```bash
npm run storybook
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.stories.tsx
│   │   └── InputField.test.tsx
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   ├── DataTable.stories.tsx
│   │   └── DataTable.test.tsx
│   └── index.ts
├── hooks/
├── utils/
├── types/
└── styles/
```

## 🎨 Design Approach

### Component Architecture
- **Composition over inheritance** - Components are built to be composable
- **Props-driven design** - All variations controlled through props
- **TypeScript-first** - Full type safety with proper interfaces
- **Accessibility-focused** - ARIA labels and keyboard navigation

### Styling Strategy
- **TailwindCSS** for utility-first styling
- **CSS variables** for theme support
- **Responsive design** with mobile-first approach
- **Dark mode** support built-in

### State Management
- **Local state** for component-specific logic
- **Controlled/uncontrolled** patterns supported
- **Event-driven** updates with proper TypeScript typing

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📋 Requirements Checklist

- ✅ TypeScript with proper typing
- ✅ Responsive design
- ✅ Basic accessibility (ARIA labels)
- ✅ Clean, modern styling
- ✅ Basic tests included
- ✅ Storybook documentation
- ✅ Clear folder structure
- ✅ Setup instructions

## 🚀 Deployment

The Storybook is deployed and accessible at: [Storybook Preview Link]

## 📄 License

MIT License - feel free to use this code for your projects!