import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputField from './InputField';

describe('InputField', () => {
  it('renders with label and placeholder', () => {
    render(
      <InputField
        label="Email"
        placeholder="Enter your email"
      />
    );
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(
      <InputField
        value=""
        onChange={handleChange}
        placeholder="Type here"
      />
    );
    
    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'test' })
      })
    );
  });

  it('shows error message when invalid', () => {
    render(
      <InputField
        label="Email"
        errorMessage="Invalid email"
        invalid
      />
    );
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows helper text when provided', () => {
    render(
      <InputField
        label="Password"
        helperText="Must be at least 8 characters"
      />
    );
    
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    render(
      <InputField
        label="Disabled"
        disabled
      />
    );
    
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });

  it('shows loading spinner when loading', () => {
    render(
      <InputField
        label="Loading"
        loading
      />
    );
    
    // Check for loading spinner (Loader2 icon)
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows clear button when clearable and has value', () => {
    render(
      <InputField
        value="test"
        clearable
        onChange={() => {}}
      />
    );
    
    expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    const handleClear = vi.fn();
    render(
      <InputField
        value="test"
        clearable
        onClear={handleClear}
        onChange={() => {}}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Clear input'));
    expect(handleClear).toHaveBeenCalled();
  });

  it('toggles password visibility', () => {
    render(
      <InputField
        type="password"
        value="secret"
        onChange={() => {}}
      />
    );
    
    const input = screen.getByDisplayValue('secret');
    const toggleButton = screen.getByLabelText('Show password');
    
    expect(input).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <InputField size="sm" data-testid="input" />
    );
    
    let input = screen.getByTestId('input');
    expect(input).toHaveClass('text-sm');
    
    rerender(<InputField size="lg" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toHaveClass('text-lg');
  });

  it('applies correct variant classes', () => {
    render(
      <InputField
        variant="filled"
        data-testid="input"
      />
    );
    
    const container = screen.getByTestId('input').parentElement;
    expect(container).toHaveClass('bg-gray-100');
  });

  it('handles focus and blur events', async () => {
    render(
      <InputField
        label="Focus test"
        variant="outlined"
      />
    );
    
    const input = screen.getByLabelText('Focus test');
    const container = input.parentElement;
    
    fireEvent.focus(input);
    await waitFor(() => {
      expect(container).toHaveClass('border-primary-500');
    });
    
    fireEvent.blur(input);
    await waitFor(() => {
      expect(container).not.toHaveClass('border-primary-500');
    });
  });

  it('sets proper accessibility attributes', () => {
    render(
      <InputField
        label="Accessible input"
        helperText="Helper text"
        errorMessage="Error message"
        invalid
      />
    );
    
    const input = screen.getByLabelText('Accessible input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });
});