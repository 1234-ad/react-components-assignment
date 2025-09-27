// Common types used across components

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SelectableItem {
  id: string | number;
  [key: string]: any;
}

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'filled' | 'outlined' | 'ghost';
export type Status = 'active' | 'inactive' | 'pending';

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

// Form types
export interface FormFieldProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
}