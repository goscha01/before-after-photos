import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

const StatusMessage = ({
  type = 'info',
  title,
  message,
  onDismiss,
  dismissible = false,
  icon: CustomIcon,
  className = '',
  children
}) => {
  // Type configurations
  const typeConfig = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-500',
      textColor: 'text-green-800',
      titleColor: 'text-green-900'
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-500',
      textColor: 'text-red-800',
      titleColor: 'text-red-900'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      iconColor: 'text-yellow-500',
      textColor: 'text-yellow-800',
      titleColor: 'text-yellow-900'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-500',
      textColor: 'text-blue-800',
      titleColor: 'text-blue-900'
    }
  };

  const config = typeConfig[type] || typeConfig.info;
  const IconComponent = CustomIcon || config.icon;

  const baseClasses = [
    'flex',
    'items-start',
    'gap-3',
    'p-4',
    'rounded-lg',
    'border',
    config.bgColor,
    config.borderColor,
    className
  ].join(' ');

  return (
    <div className={baseClasses} role="alert">
      {/* Icon */}
      <div className="flex-shrink-0">
        <IconComponent
          size={20}
          className={config.iconColor}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className={`text-sm font-medium ${config.titleColor} mb-1`}>
            {title}
          </h3>
        )}

        {message && (
          <p className={`text-sm ${config.textColor}`}>
            {message}
          </p>
        )}

        {children && (
          <div className={`text-sm ${config.textColor} mt-1`}>
            {children}
          </div>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && onDismiss && (
        <button
          type="button"
          className={`
            flex-shrink-0
            rounded-md
            p-1
            ${config.iconColor}
            hover:bg-white
            hover:bg-opacity-75
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-offset-transparent
            focus:ring-blue-500
            transition-colors
            duration-200
          `}
          onClick={onDismiss}
          aria-label="Dismiss message"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

// Predefined status message variants for common use cases
export const SuccessMessage = (props) => (
  <StatusMessage type="success" {...props} />
);

export const ErrorMessage = (props) => (
  <StatusMessage type="error" {...props} />
);

export const WarningMessage = (props) => (
  <StatusMessage type="warning" {...props} />
);

export const InfoMessage = (props) => (
  <StatusMessage type="info" {...props} />
);

// CSS-in-JS styles for React Native compatibility
const styles = `
  /* Background colors */
  .bg-green-50 { background-color: #f0fdf4; }
  .bg-red-50 { background-color: #fef2f2; }
  .bg-yellow-50 { background-color: #fefce8; }
  .bg-blue-50 { background-color: #eff6ff; }

  /* Border colors */
  .border-green-200 { border-color: #bbf7d0; }
  .border-red-200 { border-color: #fecaca; }
  .border-yellow-200 { border-color: #fde68a; }
  .border-blue-200 { border-color: #bfdbfe; }

  /* Text colors */
  .text-green-500 { color: var(--color-success); }
  .text-green-800 { color: #166534; }
  .text-green-900 { color: #14532d; }

  .text-red-500 { color: var(--color-error); }
  .text-red-800 { color: #991b1b; }
  .text-red-900 { color: #7f1d1d; }

  .text-yellow-500 { color: var(--color-warning); }
  .text-yellow-800 { color: #92400e; }
  .text-yellow-900 { color: #78350f; }

  .text-blue-500 { color: var(--color-info); }
  .text-blue-800 { color: #1e40af; }
  .text-blue-900 { color: #1e3a8a; }

  /* Layout */
  .flex { display: flex; }
  .items-start { align-items: flex-start; }
  .flex-shrink-0 { flex-shrink: 0; }
  .flex-1 { flex: 1; }
  .min-w-0 { min-width: 0; }

  /* Spacing */
  .gap-3 { gap: var(--spacing-3); }
  .p-4 { padding: var(--spacing-4); }
  .p-1 { padding: var(--spacing-1); }
  .mb-1 { margin-bottom: var(--spacing-1); }
  .mt-1 { margin-top: var(--spacing-1); }

  /* Border and radius */
  .border { border-width: var(--border-width-1); }
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .rounded-md { border-radius: var(--border-radius-md); }

  /* Typography */
  .text-sm { font-size: var(--font-size-sm); }
  .font-medium { font-weight: var(--font-weight-medium); }

  /* Background utilities */
  .bg-white { background-color: var(--color-white); }
  .bg-opacity-75 { background-color: rgba(255, 255, 255, 0.75); }

  /* Focus and interaction */
  .focus\\:outline-none:focus { outline: none; }
  .focus\\:ring-2:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  .focus\\:ring-offset-2:focus {
    box-shadow: 0 0 0 2px transparent, 0 0 0 4px var(--color-primary);
  }
  .focus\\:ring-blue-500:focus {
    box-shadow: 0 0 0 2px transparent, 0 0 0 4px #3b82f6;
  }

  /* Hover states */
  .hover\\:bg-white:hover { background-color: var(--color-white); }
  .hover\\:bg-opacity-75:hover { background-color: rgba(255, 255, 255, 0.75); }

  /* Transitions */
  .transition-colors { transition-property: color, background-color, border-color; }
  .duration-200 { transition-duration: 200ms; }
`;

// Inject styles (for React Native compatibility)
if (typeof document !== 'undefined' && !document.getElementById('status-message-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'status-message-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default StatusMessage;