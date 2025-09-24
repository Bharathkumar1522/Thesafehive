import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  showArrow?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  primary: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg',
  secondary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg',
  outline: 'bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-50',
  ghost: 'bg-transparent text-green-600 hover:bg-green-50',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
};

export const Button = ({
  to,
  children,
  variant = 'primary',
  className = '',
  fullWidth = false,
  size = 'md',
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 transform hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500/60';
  const widthStyle = fullWidth ? 'w-full' : 'w-auto';
  
  return (
    <Link
      to={to}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
    >
      <span className="flex items-center">
        {children}
      </span>
    </Link>
  );
};

export default Button;
