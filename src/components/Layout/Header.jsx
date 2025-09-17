import React from 'react';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import Button from '@components/UI/Button';

const Header = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightAction,
  rightActionIcon: RightActionIcon,
  onRightActionPress,
  rightActionLabel,
  className = '',
  variant = 'default',
  ...props
}) => {
  // Variant styles
  const variantClasses = {
    default: 'bg-white border-b border-gray-200',
    transparent: 'bg-transparent',
    primary: 'bg-primary text-white',
    dark: 'bg-gray-900 text-white'
  };

  const textColorClasses = {
    default: 'text-gray-900',
    transparent: 'text-gray-900',
    primary: 'text-white',
    dark: 'text-white'
  };

  const subtitleColorClasses = {
    default: 'text-gray-600',
    transparent: 'text-gray-600',
    primary: 'text-white text-opacity-80',
    dark: 'text-gray-300'
  };

  const baseClasses = [
    'flex',
    'items-center',
    'justify-between',
    'px-4',
    'py-3',
    'min-h-[56px]',
    'safe-area-top',
    variantClasses[variant] || variantClasses.default,
    className
  ].join(' ');

  const titleClasses = [
    'font-semibold',
    'text-lg',
    'leading-tight',
    textColorClasses[variant] || textColorClasses.default
  ].join(' ');

  const subtitleClasses = [
    'text-sm',
    'leading-tight',
    'mt-0.5',
    subtitleColorClasses[variant] || subtitleColorClasses.default
  ].join(' ');

  return (
    <header className={baseClasses} {...props}>
      {/* Left section - Back button */}
      <div className="flex items-center min-w-0 flex-1">
        {showBackButton && (
          <Button
            variant="ghost"
            size="small"
            icon={ArrowLeft}
            onClick={onBackPress}
            className="mr-2 -ml-2"
            aria-label="Go back"
          />
        )}

        {/* Title and subtitle */}
        <div className="min-w-0 flex-1">
          {title && (
            <h1 className={titleClasses}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className={subtitleClasses}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right section - Action button */}
      {(rightAction || RightActionIcon || onRightActionPress) && (
        <div className="flex items-center ml-2">
          {rightAction ? (
            rightAction
          ) : (
            <Button
              variant={variant === 'primary' || variant === 'dark' ? 'ghost' : 'ghost'}
              size="small"
              icon={RightActionIcon || MoreHorizontal}
              onClick={onRightActionPress}
              aria-label={rightActionLabel || 'More options'}
              className={variant === 'primary' || variant === 'dark' ? 'text-white hover:bg-white hover:bg-opacity-20' : ''}
            />
          )}
        </div>
      )}
    </header>
  );
};

// Specialized header variants
export const NavigationHeader = ({ title, onBackPress, ...props }) => (
  <Header
    title={title}
    showBackButton
    onBackPress={onBackPress}
    {...props}
  />
);

export const SimpleHeader = ({ title, ...props }) => (
  <Header
    title={title}
    {...props}
  />
);

export const ActionHeader = ({ title, actionIcon, onActionPress, actionLabel, ...props }) => (
  <Header
    title={title}
    rightActionIcon={actionIcon}
    onRightActionPress={onActionPress}
    rightActionLabel={actionLabel}
    {...props}
  />
);

// CSS-in-JS styles for React Native compatibility
const styles = `
  /* Layout */
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .min-w-0 { min-width: 0; }
  .flex-1 { flex: 1; }

  /* Spacing */
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .py-3 { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }
  .mr-2 { margin-right: var(--spacing-2); }
  .ml-2 { margin-left: var(--spacing-2); }
  .-ml-2 { margin-left: calc(-1 * var(--spacing-2)); }
  .mt-0\\.5 { margin-top: 2px; }

  /* Height */
  .min-h-\\[56px\\] { min-height: 56px; }

  /* Typography */
  .font-semibold { font-weight: var(--font-weight-semibold); }
  .text-lg { font-size: var(--font-size-lg); }
  .text-sm { font-size: var(--font-size-sm); }
  .leading-tight { line-height: var(--line-height-tight); }

  /* Background colors */
  .bg-white { background-color: var(--color-white); }
  .bg-transparent { background-color: transparent; }
  .bg-primary { background-color: var(--color-primary); }
  .bg-gray-900 { background-color: var(--color-gray-900); }

  /* Text colors */
  .text-white { color: var(--color-white); }
  .text-gray-900 { color: var(--color-gray-900); }
  .text-gray-600 { color: var(--color-gray-600); }
  .text-gray-300 { color: var(--color-gray-300); }

  /* Text opacity */
  .text-opacity-80 { color: rgba(255, 255, 255, 0.8); }

  /* Borders */
  .border-b { border-bottom-width: var(--border-width-1); }
  .border-gray-200 { border-color: var(--color-gray-200); }

  /* Header specific styles */
  header {
    position: relative;
    z-index: 10;
  }

  /* Mobile-specific adjustments */
  @media (max-width: 768px) {
    .min-h-\\[56px\\] {
      min-height: var(--touch-target-size);
    }
  }

  /* Safe area handling */
  .safe-area-top {
    padding-top: env(safe-area-inset-top);
  }

  /* Hover states for action buttons */
  .hover\\:bg-white:hover { background-color: var(--color-white); }
  .hover\\:bg-opacity-20:hover { background-color: rgba(255, 255, 255, 0.2); }
`;

// Inject styles (for React Native compatibility)
if (typeof document !== 'undefined' && !document.getElementById('header-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'header-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Header;