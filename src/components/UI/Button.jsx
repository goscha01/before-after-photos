import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-200',
    'touch-feedback',
    'focus-visible:outline',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-primary',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none'
  ];

  // Size variants
  const sizeClasses = {
    small: [
      'text-sm',
      'px-3',
      'py-2',
      'min-h-[32px]',
      'gap-1',
      'rounded-md'
    ],
    medium: [
      'text-base',
      'px-4',
      'py-3',
      'min-h-[44px]',
      'gap-2',
      'rounded-lg'
    ],
    large: [
      'text-lg',
      'px-6',
      'py-4',
      'min-h-[52px]',
      'gap-3',
      'rounded-xl'
    ]
  };

  // Variant styles
  const variantClasses = {
    primary: [
      'bg-primary',
      'text-white',
      'shadow-md',
      'hover:bg-primary-dark',
      'active:bg-primary-dark',
      'active:shadow-sm'
    ],
    secondary: [
      'bg-gray-100',
      'text-gray-800',
      'border',
      'border-gray-200',
      'hover:bg-gray-200',
      'active:bg-gray-300'
    ],
    outline: [
      'bg-transparent',
      'text-primary',
      'border-2',
      'border-primary',
      'hover:bg-primary',
      'hover:text-white',
      'active:bg-primary-dark'
    ],
    ghost: [
      'bg-transparent',
      'text-gray-700',
      'hover:bg-gray-100',
      'active:bg-gray-200'
    ],
    danger: [
      'bg-red-500',
      'text-white',
      'shadow-md',
      'hover:bg-red-600',
      'active:bg-red-700',
      'active:shadow-sm'
    ],
    success: [
      'bg-green-500',
      'text-white',
      'shadow-md',
      'hover:bg-green-600',
      'active:bg-green-700',
      'active:shadow-sm'
    ]
  };

  // Full width
  const widthClasses = fullWidth ? ['w-full'] : [];

  // Combine all classes
  const buttonClasses = [
    ...baseClasses,
    ...sizeClasses[size],
    ...variantClasses[variant],
    ...widthClasses,
    className
  ].join(' ');

  // Handle click events
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  // Render icon
  const renderIcon = () => {
    if (loading) {
      return <Loader2 className="animate-spin" size={size === 'small' ? 14 : size === 'large' ? 20 : 16} />;
    }

    if (Icon) {
      return <Icon size={size === 'small' ? 14 : size === 'large' ? 20 : 16} />;
    }

    return null;
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {/* Left icon */}
      {(Icon || loading) && iconPosition === 'left' && (
        <span className="flex-shrink-0">
          {renderIcon()}
        </span>
      )}

      {/* Button text */}
      {children && (
        <span className={loading ? 'opacity-70' : ''}>
          {children}
        </span>
      )}

      {/* Right icon */}
      {Icon && !loading && iconPosition === 'right' && (
        <span className="flex-shrink-0">
          {renderIcon()}
        </span>
      )}
    </button>
  );
};

// CSS-in-JS styles for React Native compatibility
const styles = `
  .touch-feedback {
    --touch-scale: 0.98;
    --touch-opacity: 0.8;
  }

  .touch-feedback:active {
    transform: scale(var(--touch-scale));
    opacity: var(--touch-opacity);
  }

  /* Primary variant styles */
  .bg-primary {
    background-color: var(--color-primary);
  }

  .bg-primary-dark {
    background-color: var(--color-primary-dark);
  }

  .text-white {
    color: var(--color-white);
  }

  /* Size variants */
  .min-h-\\[32px\\] {
    min-height: var(--touch-target-size-small);
  }

  .min-h-\\[44px\\] {
    min-height: var(--touch-target-size);
  }

  .min-h-\\[52px\\] {
    min-height: 52px;
  }

  /* Spacing */
  .px-3 { padding-left: var(--spacing-3); padding-right: var(--spacing-3); }
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .px-6 { padding-left: var(--spacing-6); padding-right: var(--spacing-6); }
  .py-2 { padding-top: var(--spacing-2); padding-bottom: var(--spacing-2); }
  .py-3 { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }
  .py-4 { padding-top: var(--spacing-4); padding-bottom: var(--spacing-4); }

  .gap-1 { gap: var(--spacing-1); }
  .gap-2 { gap: var(--spacing-2); }
  .gap-3 { gap: var(--spacing-3); }

  /* Border radius */
  .rounded-md { border-radius: var(--border-radius-md); }
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded-xl { border-radius: var(--border-radius-xl); }

  /* Shadows */
  .shadow-md { box-shadow: var(--shadow-md); }
  .shadow-sm { box-shadow: var(--shadow-sm); }

  /* Gray variants */
  .bg-gray-100 { background-color: var(--color-gray-100); }
  .bg-gray-200 { background-color: var(--color-gray-200); }
  .bg-gray-300 { background-color: var(--color-gray-300); }
  .text-gray-700 { color: var(--color-gray-700); }
  .text-gray-800 { color: var(--color-gray-800); }
  .border-gray-200 { border-color: var(--color-gray-200); }

  /* Status colors */
  .bg-red-500 { background-color: var(--color-error); }
  .bg-red-600 { background-color: #dc2626; }
  .bg-red-700 { background-color: #b91c1c; }
  .bg-green-500 { background-color: var(--color-success); }
  .bg-green-600 { background-color: #16a34a; }
  .bg-green-700 { background-color: #15803d; }

  /* Text colors */
  .text-primary { color: var(--color-primary); }

  /* Transitions */
  .transition-all { transition-property: all; }
  .duration-200 { transition-duration: 200ms; }

  /* Flexbox */
  .inline-flex { display: inline-flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .flex-shrink-0 { flex-shrink: 0; }

  /* Width */
  .w-full { width: 100%; }

  /* Font */
  .font-medium { font-weight: var(--font-weight-medium); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-base { font-size: var(--font-size-base); }
  .text-lg { font-size: var(--font-size-lg); }

  /* Border */
  .border { border-width: var(--border-width-1); }
  .border-2 { border-width: var(--border-width-2); }

  /* Cursor and interaction */
  .cursor-not-allowed { cursor: not-allowed; }
  .pointer-events-none { pointer-events: none; }

  /* Opacity */
  .opacity-50 { opacity: 0.5; }
  .opacity-70 { opacity: 0.7; }

  /* Background transparency */
  .bg-transparent { background-color: transparent; }

  /* Hover states */
  .hover\\:bg-primary-dark:hover { background-color: var(--color-primary-dark); }
  .hover\\:bg-gray-200:hover { background-color: var(--color-gray-200); }
  .hover\\:bg-gray-100:hover { background-color: var(--color-gray-100); }
  .hover\\:bg-primary:hover { background-color: var(--color-primary); }
  .hover\\:text-white:hover { color: var(--color-white); }
  .hover\\:bg-red-600:hover { background-color: #dc2626; }
  .hover\\:bg-green-600:hover { background-color: #16a34a; }

  /* Active states */
  .active\\:bg-primary-dark:active { background-color: var(--color-primary-dark); }
  .active\\:bg-gray-300:active { background-color: var(--color-gray-300); }
  .active\\:bg-gray-200:active { background-color: var(--color-gray-200); }
  .active\\:shadow-sm:active { box-shadow: var(--shadow-sm); }
  .active\\:bg-red-700:active { background-color: #b91c1c; }
  .active\\:bg-green-700:active { background-color: #15803d; }

  /* Focus visible styles */
  .focus-visible\\:outline:focus-visible { outline-style: solid; }
  .focus-visible\\:outline-2:focus-visible { outline-width: 2px; }
  .focus-visible\\:outline-offset-2:focus-visible { outline-offset: 2px; }
  .focus-visible\\:outline-primary:focus-visible { outline-color: var(--color-primary); }

  /* Disabled states */
  .disabled\\:opacity-50:disabled { opacity: 0.5; }
  .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
  .disabled\\:pointer-events-none:disabled { pointer-events: none; }
`;

// Inject styles (for React Native compatibility)
if (typeof document !== 'undefined' && !document.getElementById('button-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'button-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Button;