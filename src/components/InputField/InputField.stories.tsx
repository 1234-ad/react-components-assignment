import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states, variants, and optional features like clear button and password toggle.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    onChange: { action: 'changed' },
    onClear: { action: 'cleared' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled component wrapper for stories
const ControlledInputField = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  
  return (
    <div className="w-80">
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    </div>
  );
};

export const Default: Story = {
  render: ControlledInputField,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <ControlledInputField
        variant="outlined"
        label="Outlined (Default)"
        placeholder="Outlined input"
      />
      <ControlledInputField
        variant="filled"
        label="Filled"
        placeholder="Filled input"
      />
      <ControlledInputField
        variant="ghost"
        label="Ghost"
        placeholder="Ghost input"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <ControlledInputField
        size="sm"
        label="Small"
        placeholder="Small input"
      />
      <ControlledInputField
        size="md"
        label="Medium (Default)"
        placeholder="Medium input"
      />
      <ControlledInputField
        size="lg"
        label="Large"
        placeholder="Large input"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <ControlledInputField
        label="Normal"
        placeholder="Normal state"
        value="Some text"
      />
      <InputField
        label="Disabled"
        placeholder="Disabled state"
        value="Disabled text"
        disabled
      />
      <ControlledInputField
        label="Invalid"
        placeholder="Invalid state"
        value="invalid@email"
        invalid
        errorMessage="Please enter a valid email address"
      />
      <InputField
        label="Loading"
        placeholder="Loading state"
        value="Loading..."
        loading
      />
    </div>
  ),
};

export const WithClearButton: Story = {
  render: ControlledInputField,
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    value: 'Clear me!',
    clearable: true,
    helperText: 'Click the X to clear',
  },
};

export const PasswordField: Story = {
  render: ControlledInputField,
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    value: 'secretpassword',
    helperText: 'Click the eye icon to toggle visibility',
  },
};

export const PasswordWithClear: Story = {
  render: ControlledInputField,
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    value: 'secretpassword',
    clearable: true,
    helperText: 'Password field with clear button',
  },
};

export const ErrorStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <ControlledInputField
        label="Email"
        placeholder="Enter your email"
        value="invalid-email"
        errorMessage="Please enter a valid email address"
      />
      <ControlledInputField
        label="Required Field"
        placeholder="This field is required"
        invalid
        errorMessage="This field cannot be empty"
      />
    </div>
  ),
};

export const DifferentTypes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <ControlledInputField
        type="email"
        label="Email"
        placeholder="user@example.com"
      />
      <ControlledInputField
        type="tel"
        label="Phone"
        placeholder="+1 (555) 123-4567"
      />
      <ControlledInputField
        type="url"
        label="Website"
        placeholder="https://example.com"
      />
      <ControlledInputField
        type="number"
        label="Age"
        placeholder="25"
      />
    </div>
  ),
};

export const AllFeatures: Story = {
  render: ControlledInputField,
  args: {
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'user@example.com',
    clearable: true,
    helperText: 'We use this to send you important updates',
    size: 'lg',
    variant: 'outlined',
  },
};