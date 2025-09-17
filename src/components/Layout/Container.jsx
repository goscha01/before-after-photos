import React from 'react';

const Container = ({
  children,
  className = '',
  maxWidth = 'mobile',
  padding = 'default',
  safeArea = false,
  center = false,
  ...props
}) => {
  // Max width variants
  const maxWidthClasses = {
    mobile: 'max-w-sm', // 480px
    tablet: 'max-w-md', // 768px
    desktop: 'max-w-4xl', // 896px
    full: 'max-w-none'
  };

  // Padding variants
  const paddingClasses = {
    none: '',
    small: 'px-2 py-2',
    default: 'px-4 py-4',
    large: 'px-6 py-6'
  };

  // Safe area classes
  const safeAreaClasses = safeArea ? [
    'safe-area-top',
    'safe-area-bottom',
    'safe-area-left',
    'safe-area-right'
  ] : [];

  // Center alignment
  const centerClasses = center ? ['mx-auto'] : [];

  // Combine classes
  const containerClasses = [
    'w-full',
    maxWidthClasses[maxWidth] || maxWidthClasses.mobile,
    paddingClasses[padding] || paddingClasses.default,
    ...safeAreaClasses,
    ...centerClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

// Specialized container variants
export const ScreenContainer = ({ children, className = '', ...props }) => (
  <Container
    className={`min-h-screen bg-gray-50 ${className}`}
    safeArea
    {...props}
  >
    {children}
  </Container>
);

export const CardContainer = ({ children, className = '', ...props }) => (
  <Container
    className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
    padding="large"
    {...props}
  >
    {children}
  </Container>
);

export const FormContainer = ({ children, className = '', ...props }) => (
  <Container
    className={`space-y-4 ${className}`}
    padding="default"
    {...props}
  >
    {children}
  </Container>
);

export const CenterContainer = ({ children, className = '', ...props }) => (
  <Container
    className={`flex flex-col items-center justify-center ${className}`}
    center
    {...props}
  >
    {children}
  </Container>
);

// CSS-in-JS styles for React Native compatibility
const styles = `
  /* Width utilities */
  .w-full { width: 100%; }

  /* Max width variants */
  .max-w-sm { max-width: 480px; }
  .max-w-md { max-width: 768px; }
  .max-w-4xl { max-width: 896px; }
  .max-w-none { max-width: none; }

  /* Padding variants */
  .px-2 { padding-left: var(--spacing-2); padding-right: var(--spacing-2); }
  .px-4 { padding-left: var(--spacing-4); padding-right: var(--spacing-4); }
  .px-6 { padding-left: var(--spacing-6); padding-right: var(--spacing-6); }
  .py-2 { padding-top: var(--spacing-2); padding-bottom: var(--spacing-2); }
  .py-4 { padding-top: var(--spacing-4); padding-bottom: var(--spacing-4); }
  .py-6 { padding-top: var(--spacing-6); padding-bottom: var(--spacing-6); }

  /* Margin utilities */
  .mx-auto { margin-left: auto; margin-right: auto; }

  /* Background colors */
  .bg-white { background-color: var(--color-white); }
  .bg-gray-50 { background-color: var(--color-gray-50); }

  /* Border and shadows */
  .border { border-width: var(--border-width-1); }
  .border-gray-200 { border-color: var(--color-gray-200); }
  .rounded-lg { border-radius: var(--border-radius-lg); }
  .shadow-md { box-shadow: var(--shadow-md); }

  /* Height utilities */
  .min-h-screen { min-height: 100vh; }

  /* Flexbox utilities */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }

  /* Spacing utilities */
  .space-y-4 > * + * {
    margin-top: var(--spacing-4);
  }

  /* Safe area utilities (implemented in global.css) */
  .safe-area-top { padding-top: env(safe-area-inset-top); }
  .safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }
  .safe-area-left { padding-left: env(safe-area-inset-left); }
  .safe-area-right { padding-right: env(safe-area-inset-right); }

  /* Responsive design */
  @media (min-width: 768px) {
    .md\\:px-6 { padding-left: var(--spacing-6); padding-right: var(--spacing-6); }
    .md\\:py-8 { padding-top: var(--spacing-8); padding-bottom: var(--spacing-8); }
  }

  @media (min-width: 1024px) {
    .lg\\:px-8 { padding-left: var(--spacing-8); padding-right: var(--spacing-8); }
    .lg\\:py-12 { padding-top: var(--spacing-12); padding-bottom: var(--spacing-12); }
  }
`;

// Inject styles (for React Native compatibility)
if (typeof document !== 'undefined' && !document.getElementById('container-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'container-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Container;