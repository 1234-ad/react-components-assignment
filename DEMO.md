# Component Demo & Screenshots

This document showcases the React components with detailed examples and visual demonstrations.

## 🎯 Live Demo

- **Development Server**: Run `npm run dev` to see the interactive demo
- **Storybook**: Run `npm run storybook` for component documentation
- **Tests**: Run `npm run test` to execute the test suite

## 📸 Component Screenshots

### InputField Component

#### Variants
The InputField component supports three visual variants:

**Outlined (Default)**
- Clean border design
- Focus states with primary color
- Perfect for forms and data entry

**Filled**
- Background-filled design
- Subtle and modern appearance
- Great for dense interfaces

**Ghost**
- Minimal borderless design
- Clean and lightweight
- Ideal for search bars

#### Sizes
Three size options available:
- **Small (sm)**: Compact for dense layouts
- **Medium (md)**: Default balanced size
- **Large (lg)**: Prominent for important inputs

#### States & Features
- ✅ **Normal State**: Clean, ready for input
- ✅ **Focused State**: Primary color highlight
- ✅ **Disabled State**: Grayed out, non-interactive
- ✅ **Error State**: Red styling with error message
- ✅ **Loading State**: Spinner animation
- ✅ **Clear Button**: X icon to clear input
- ✅ **Password Toggle**: Eye icon for password visibility

#### Dark Mode Support
All variants and states work seamlessly in dark mode with proper contrast ratios.

### DataTable Component

#### Core Features
**Data Display**
- Clean, organized tabular data presentation
- Responsive design that works on all screen sizes
- Professional styling with proper spacing

**Column Sorting**
- Click column headers to sort data
- Visual indicators (up/down arrows) for sort direction
- Supports ascending, descending, and no-sort states
- Works with strings, numbers, and dates

**Row Selection**
- Individual row checkboxes
- "Select All" functionality in header
- Selection summary showing count
- Callback function provides selected data

**Interactive States**
- Hover effects on rows
- Click handlers for row interactions
- Loading state with spinner
- Empty state with helpful message

#### Advanced Features
**Custom Rendering**
- Custom cell content with render functions
- Status badges, buttons, links, etc.
- Flexible column configuration

**Responsive Design**
- Horizontal scroll on small screens
- Maintains functionality across devices
- Mobile-friendly touch interactions

**Accessibility**
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## 🎨 Visual Examples

### InputField Showcase

```tsx
// Basic usage
<InputField
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// With all features
<InputField
  type="password"
  label="Password"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  variant="outlined"
  size="lg"
  clearable
  helperText="Must be at least 8 characters"
/>
```

### DataTable Showcase

```tsx
// Basic table
<DataTable
  data={users}
  columns={columns}
/>

// Full-featured table
<DataTable
  data={users}
  columns={columns}
  selectable
  striped
  hoverable
  onRowSelect={(selected) => console.log(selected)}
  onRowClick={(user) => navigate(`/user/${user.id}`)}
/>
```

## 🔧 Interactive Demo Features

### Form Demo Section
- Multiple InputField examples
- Real-time value updates
- Different variants and sizes
- State demonstrations (error, loading, disabled)

### Table Demo Section
- Sample user data
- All sorting functionality
- Row selection with summary
- Click interactions with alerts

### Theme Toggle
- Light/dark mode switcher
- Instant theme transitions
- All components adapt automatically

## 📱 Responsive Behavior

### Mobile (< 768px)
- InputFields stack vertically
- DataTable scrolls horizontally
- Touch-friendly interactions
- Optimized spacing

### Tablet (768px - 1024px)
- Two-column InputField layout
- Full DataTable visibility
- Balanced spacing

### Desktop (> 1024px)
- Multi-column layouts
- Full feature visibility
- Optimal spacing and sizing

## 🎯 Key Highlights

### InputField
1. **Flexibility**: 3 variants × 3 sizes × multiple states = 27+ combinations
2. **Functionality**: Clear button, password toggle, validation states
3. **Accessibility**: Full ARIA support, keyboard navigation
4. **TypeScript**: Complete type safety with proper interfaces

### DataTable
1. **Performance**: Efficient sorting and rendering
2. **Customization**: Custom cell rendering, flexible columns
3. **Interaction**: Selection, sorting, clicking, hovering
4. **Responsive**: Works perfectly on all screen sizes

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/1234-ad/react-components-assignment.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the demo**
   ```bash
   npm run dev
   ```

4. **View Storybook**
   ```bash
   npm run storybook
   ```

## 📋 Component Checklist

### ✅ Requirements Met

**InputField Component**
- ✅ Text input with label, placeholder, helper text, error message
- ✅ States: disabled, invalid, loading
- ✅ Variants: filled, outlined, ghost
- ✅ Sizes: small, medium, large
- ✅ Optional: clear button, password toggle
- ✅ Optional: Support for light & dark theme
- ✅ TypeScript with proper typing
- ✅ Responsive design
- ✅ Basic accessibility (ARIA labels)
- ✅ Clean, modern styling
- ✅ Basic tests included

**DataTable Component**
- ✅ Display tabular data
- ✅ Column sorting
- ✅ Row selection (single/multiple)
- ✅ Loading state
- ✅ Empty state
- ✅ TypeScript with proper typing
- ✅ Responsive design
- ✅ Basic accessibility (ARIA labels)
- ✅ Clean, modern styling
- ✅ Basic tests included

**Project Structure**
- ✅ Clear folder structure
- ✅ README with setup instructions
- ✅ Storybook documentation
- ✅ Component tests
- ✅ TypeScript configuration
- ✅ Modern build setup (Vite)

This project demonstrates modern React development practices with a focus on usability, accessibility, and maintainability. Both components are production-ready and can be easily integrated into larger applications.