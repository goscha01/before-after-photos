import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight, Smartphone, Camera, Cloud } from 'lucide-react';
import { toast } from 'react-toastify';
import Container, { ScreenContainer } from '@components/Layout/Container';
import Button from '@components/UI/Button';
import StatusMessage from '@components/UI/StatusMessage';
import useAppStore from '@store/useAppStore';
import { APP_CONFIG, VALIDATION_RULES } from '@utils/constants';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [cleanerName, setCleanerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Zustand store
  const { isAuthenticated, setCleaner } = useAppStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/properties', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Validate cleaner name
  const validateName = (name) => {
    const { MIN_LENGTH, MAX_LENGTH, PATTERN } = VALIDATION_RULES.CLEANER_NAME;

    if (!name.trim()) {
      return 'Please enter your name';
    }

    if (name.length < MIN_LENGTH) {
      return `Name must be at least ${MIN_LENGTH} characters long`;
    }

    if (name.length > MAX_LENGTH) {
      return `Name must be no more than ${MAX_LENGTH} characters long`;
    }

    if (!PATTERN.test(name)) {
      return 'Name can only contain letters and spaces';
    }

    return '';
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    const error = validateName(cleanerName);
    if (error) {
      setValidationError(error);
      return;
    }

    setIsLoading(true);
    setValidationError('');

    try {
      // Create cleaner object
      const cleaner = {
        name: cleanerName.trim(),
        loginTime: new Date().toISOString(),
        id: `cleaner_${Date.now()}`
      };

      // Store in Zustand
      setCleaner(cleaner);

      // Show success message
      toast.success('Welcome! Let\'s start documenting your cleaning work.');

      // Navigate to properties screen
      navigate('/properties', { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
      setValidationError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle name input change
  const handleNameChange = (e) => {
    const value = e.target.value;
    setCleanerName(value);

    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError('');
    }
  };

  return (
    <ScreenContainer className="flex flex-col">
      <Container maxWidth="mobile" center className="flex-1 flex flex-col justify-center">
        {/* App branding */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Camera size={32} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {APP_CONFIG.NAME}
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Document your cleaning work with before & after photos
          </p>

          <div className="text-sm text-gray-500">
            Version {APP_CONFIG.VERSION}
          </div>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Name input */}
          <div>
            <label
              htmlFor="cleanerName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your name
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={20} className="text-gray-400" />
              </div>

              <input
                id="cleanerName"
                name="cleanerName"
                type="text"
                value={cleanerName}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className={`
                  block w-full pl-10 pr-3 py-3 border rounded-lg
                  focus:ring-2 focus:ring-primary focus:border-transparent
                  ${validationError
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300'
                  }
                `}
                disabled={isLoading}
                autoComplete="name"
                autoFocus
              />
            </div>

            {validationError && (
              <p className="mt-2 text-sm text-red-600">
                {validationError}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
            disabled={!cleanerName.trim() || isLoading}
          >
            Get Started
          </Button>
        </form>

        {/* Features showcase */}
        <div className="mt-12 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 text-center">
            What you can do:
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <FeatureCard
              icon={Smartphone}
              title="Mobile-Optimized"
              description="Designed for your phone with touch-friendly controls"
            />

            <FeatureCard
              icon={Camera}
              title="Before & After Photos"
              description="Capture and organize photos by room with reference overlays"
            />

            <FeatureCard
              icon={Cloud}
              title="Cloud Upload"
              description="Automatically upload to Google Drive with organized folders"
            />
          </div>
        </div>

        {/* Privacy notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Your data is stored locally on your device and uploaded to your Google Drive.
            We don't store your personal information on our servers.
          </p>
        </div>
      </Container>
    </ScreenContainer>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex-shrink-0 w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
        <Icon size={20} className="text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

// CSS-in-JS styles for React Native compatibility
const styles = `
  /* Layout */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-1 { flex: 1; }
  .items-center { align-items: center; }
  .items-start { align-items: flex-start; }
  .justify-center { justify-content: center; }
  .flex-shrink-0 { flex-shrink: 0; }
  .min-w-0 { min-width: 0; }

  /* Grid */
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .gap-3 { gap: var(--spacing-3); }
  .gap-4 { gap: var(--spacing-4); }

  /* Spacing */
  .space-y-6 > * + * { margin-top: var(--spacing-6); }
  .p-4 { padding: var(--spacing-4); }
  .pl-3 { padding-left: var(--spacing-3); }
  .pl-10 { padding-left: 2.5rem; }
  .pr-3 { padding-right: var(--spacing-3); }
  .py-3 { padding-top: var(--spacing-3); padding-bottom: var(--spacing-3); }
  .mb-2 { margin-bottom: var(--spacing-2); }
  .mb-4 { margin-bottom: var(--spacing-4); }
  .mb-6 { margin-bottom: var(--spacing-6); }
  .mb-1 { margin-bottom: var(--spacing-1); }
  .mb-8 { margin-bottom: var(--spacing-8); }
  .mt-2 { margin-top: var(--spacing-2); }
  .mt-8 { margin-top: var(--spacing-8); }
  .mt-12 { margin-top: var(--spacing-12); }
  .mx-auto { margin-left: auto; margin-right: auto; }

  /* Positioning */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-y-0 { top: 0; bottom: 0; }
  .left-0 { left: 0; }

  /* Sizing */
  .w-20 { width: 5rem; }
  .h-20 { height: 5rem; }
  .w-10 { width: 2.5rem; }
  .h-10 { height: 2.5rem; }
  .w-full { width: 100%; }
  .block { display: block; }

  /* Background colors */
  .bg-primary { background-color: var(--color-primary); }
  .bg-white { background-color: var(--color-white); }

  /* Background opacity */
  .bg-opacity-10 { background-color: rgba(var(--color-primary-rgb), 0.1); }

  /* Text colors */
  .text-white { color: var(--color-white); }
  .text-gray-900 { color: var(--color-gray-900); }
  .text-gray-700 { color: var(--color-gray-700); }
  .text-gray-600 { color: var(--color-gray-600); }
  .text-gray-500 { color: var(--color-gray-500); }
  .text-gray-400 { color: var(--color-gray-400); }
  .text-primary { color: var(--color-primary); }
  .text-red-600 { color: #dc2626; }

  /* Typography */
  .text-3xl { font-size: var(--font-size-3xl); }
  .text-lg { font-size: var(--font-size-lg); }
  .text-sm { font-size: var(--font-size-sm); }
  .text-xs { font-size: var(--font-size-xs); }
  .font-bold { font-weight: var(--font-weight-bold); }
  .font-semibold { font-weight: var(--font-weight-semibold); }
  .font-medium { font-weight: var(--font-weight-medium); }
  .text-center { text-align: center; }

  /* Border radius */
  .rounded-2xl { border-radius: var(--border-radius-2xl); }
  .rounded-lg { border-radius: var(--border-radius-lg); }

  /* Borders */
  .border { border-width: var(--border-width-1); }
  .border-gray-300 { border-color: var(--color-gray-300); }
  .border-gray-200 { border-color: var(--color-gray-200); }
  .border-red-300 { border-color: #fca5a5; }

  /* Pointer events */
  .pointer-events-none { pointer-events: none; }

  /* Focus styles */
  .focus\\:ring-2:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  .focus\\:ring-primary:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
  .focus\\:ring-red-500:focus {
    box-shadow: 0 0 0 2px #ef4444;
  }
  .focus\\:border-transparent:focus {
    border-color: transparent;
  }

  /* Form inputs */
  input[type="text"] {
    font-size: var(--font-size-base);
    line-height: var(--line-height-normal);
  }

  input:disabled {
    background-color: var(--color-gray-100);
    cursor: not-allowed;
  }

  /* Labels */
  label {
    cursor: pointer;
  }

  /* Responsive adjustments */
  @media (min-width: 640px) {
    .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  /* Prevent zoom on input focus (mobile) */
  @media (max-width: 768px) {
    input[type="text"] {
      font-size: 16px;
    }
  }
`;

// Inject styles (for React Native compatibility)
if (typeof document !== 'undefined' && !document.getElementById('login-screen-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'login-screen-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default LoginScreen;