import { render, screen } from '@testing-library/react';
import { PrimaryButton, SecondaryButton } from '../common';

describe('AppButton Components', () => {
  it('renders PrimaryButton correctly', () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders SecondaryButton correctly', () => {
    render(<SecondaryButton>Cancel</SecondaryButton>);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('PrimaryButton has correct variant', () => {
    render(<PrimaryButton>Test</PrimaryButton>);
    const button = screen.getByText('Test');
    expect(button).toHaveClass('MuiButton-contained');
  });

  it('SecondaryButton has correct variant', () => {
    render(<SecondaryButton>Test</SecondaryButton>);
    const button = screen.getByText('Test');
    expect(button).toHaveClass('MuiButton-outlined');
  });
});
