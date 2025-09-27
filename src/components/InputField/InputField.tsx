import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  onClear?: () => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  clearable = false,
  type = 'text',
  onClear,
  className,
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isPassword = type === 'password';
  const hasError = invalid || !!errorMessage;
  const hasValue = value && value.length > 0;
  
  const inputType = isPassword && showPassword ? 'text' : type;

  // Size classes
  const sizeClasses = {
    sm: {
      input: 'px-3 py-2 text-sm',
      label: 'text-sm',
      icon: 'w-4 h-4',
    },
    md: {
      input: 'px-4 py-3 text-base',
      label: 'text-sm',
      icon: 'w-5 h-5',
    },
    lg: {
      input: 'px-4 py-4 text-lg',
      label: 'text-base',
      icon: 'w-6 h-6',
    },
  };

  // Variant classes
  const variantClasses = {
    filled: {
      container: 'bg-gray-100 dark:bg-gray-800 border-2 border-transparent',
      containerFocused: 'bg-gray-50 dark:bg-gray-700 border-primary-500',
      containerError: 'bg-red-50 dark:bg-red-900/20 border-red-500',
      input: 'bg-transparent',
    },
    outlined: {
      container: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
      containerFocused: 'border-primary-500',
      containerError: 'border-red-500',
      input: 'bg-transparent',
    },
    ghost: {
      container: 'bg-transparent border-2 border-transparent',
      containerFocused: 'border-primary-500',
      containerError: 'border-red-500',
      input: 'bg-transparent',
    },
  };

  const containerClasses = clsx(
    'relative rounded-lg transition-all duration-200 ease-in-out',
    variantClasses[variant].container,
    {
      [variantClasses[variant].containerFocused]: isFocused && !hasError,
      [variantClasses[variant].containerError]: hasError,
      'opacity-50 cursor-not-allowed': disabled,
    }
  );

  const inputClasses = clsx(
    'w-full border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400',
    sizeClasses[size].input,
    variantClasses[variant].input,
    {
      'pr-10': clearable && hasValue && !loading,
      'pr-10': isPassword,
      'pr-16': isPassword && clearable && hasValue,
      'pr-10': loading,
    },
    className
  );

  const labelClasses = clsx(
    'block font-medium mb-2 text-gray-700 dark:text-gray-300',
    sizeClasses[size].label,
    {
      'text-red-600 dark:text-red-400': hasError,
    }
  );

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className={containerClasses}>
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        
        {/* Icons container */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {loading && (
            <Loader2 className={clsx(sizeClasses[size].icon, 'animate-spin text-gray-400')} />
          )}
          
          {clearable && hasValue && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear input"
            >
              <X className={sizeClasses[size].icon} />
            </button>
          )}
          
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className={sizeClasses[size].icon} />
              ) : (
                <Eye className={sizeClasses[size].icon} />
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <div className="mt-2">
          {errorMessage ? (
            <p
              id={`${inputId}-error`}
              className="text-sm text-red-600 dark:text-red-400"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : helperText ? (
            <p
              id={`${inputId}-helper`}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;