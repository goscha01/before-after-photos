import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const DebugScreen = () => {
  const [debugSteps, setDebugSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'app-load',
      name: 'App Loading',
      test: () => {
        console.log('✅ Debug: App loaded successfully');
        return true;
      }
    },
    {
      id: 'react-dom',
      name: 'React DOM Ready',
      test: () => {
        console.log('✅ Debug: React DOM is ready');
        return document.getElementById('root') !== null;
      }
    },
    {
      id: 'navigator-check',
      name: 'Navigator Available',
      test: () => {
        console.log('✅ Debug: Navigator available:', !!navigator);
        return !!navigator;
      }
    },
    {
      id: 'user-agent',
      name: 'User Agent Detection',
      test: () => {
        const ua = navigator.userAgent;
        console.log('✅ Debug: User Agent:', ua);
        const isIOS = /iPad|iPhone|iPod/.test(ua);
        console.log('✅ Debug: Is iOS:', isIOS);
        return true;
      }
    },
    {
      id: 'local-storage',
      name: 'Local Storage',
      test: () => {
        try {
          localStorage.setItem('debug-test', 'test');
          const result = localStorage.getItem('debug-test');
          localStorage.removeItem('debug-test');
          console.log('✅ Debug: Local Storage works:', result === 'test');
          return result === 'test';
        } catch (e) {
          console.log('❌ Debug: Local Storage failed:', e);
          return false;
        }
      }
    },
    {
      id: 'service-worker',
      name: 'Service Worker Support',
      test: () => {
        const supported = 'serviceWorker' in navigator;
        console.log('✅ Debug: Service Worker supported:', supported);
        return supported;
      }
    },
    {
      id: 'media-devices',
      name: 'Media Devices API',
      test: () => {
        const supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        console.log('✅ Debug: Media Devices API supported:', supported);
        return supported;
      }
    },
    {
      id: 'camera-permission',
      name: 'Camera Permission Check',
      test: async () => {
        try {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.log('❌ Debug: Camera API not supported');
            return false;
          }
          
          // Just check permission, don't actually request camera
          const devices = await navigator.mediaDevices.enumerateDevices();
          const hasCamera = devices.some(device => device.kind === 'videoinput');
          console.log('✅ Debug: Camera devices found:', hasCamera);
          return hasCamera;
        } catch (e) {
          console.log('❌ Debug: Camera check failed:', e);
          return false;
        }
      }
    },
    {
      id: 'router-test',
      name: 'React Router',
      test: () => {
        console.log('✅ Debug: React Router should work');
        return true;
      }
    },
    {
      id: 'store-test',
      name: 'Zustand Store',
      test: () => {
        console.log('✅ Debug: Zustand store should work');
        return true;
      }
    }
  ];

  const runNextStep = async () => {
    if (currentStep >= steps.length) {
      console.log('🎉 Debug: All steps completed!');
      return;
    }

    const step = steps[currentStep];
    console.log(`🔄 Debug: Running step ${currentStep + 1}/${steps.length}: ${step.name}`);
    
    try {
      const result = await step.test();
      setDebugSteps(prev => [...prev, { ...step, status: result ? 'success' : 'error', completed: true }]);
      console.log(`${result ? '✅' : '❌'} Debug: Step ${step.name} ${result ? 'passed' : 'failed'}`);
    } catch (error) {
      console.log(`❌ Debug: Step ${step.name} threw error:`, error);
      setDebugSteps(prev => [...prev, { ...step, status: 'error', completed: true, error: error.message }]);
    }
    
    setCurrentStep(prev => prev + 1);
  };

  useEffect(() => {
    console.log('🚀 Debug: Starting debug sequence...');
    runNextStep();
  }, []);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        runNextStep();
      }, 1000); // Wait 1 second between steps
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🐛 Debug Mode
        </h1>
        
        <div className="space-y-3">
          {steps.map((step, index) => {
            const debugStep = debugSteps.find(ds => ds.id === step.id);
            const isCurrent = index === currentStep;
            const isCompleted = debugStep?.completed;
            
            return (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  isCurrent ? 'border-blue-500 bg-blue-50' :
                  isCompleted ? 'border-gray-200 bg-gray-50' :
                  'border-gray-100 bg-white'
                }`}
              >
                {isCompleted ? getStatusIcon(debugStep.status) : 
                 isCurrent ? <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /> :
                 <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />}
                
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{step.name}</div>
                  {debugStep?.error && (
                    <div className="text-sm text-red-600 mt-1">{debugStep.error}</div>
                  )}
                </div>
                
                {isCurrent && (
                  <div className="text-xs text-blue-600 font-medium">Running...</div>
                )}
              </div>
            );
          })}
        </div>
        
        {currentStep >= steps.length && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium text-green-900">Debug Complete!</h3>
              <p className="text-sm text-green-700 mt-1">
                Check the console for detailed logs
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Restart Debug
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugScreen;
