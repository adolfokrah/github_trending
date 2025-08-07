import { useEffect } from 'react';

/**
 * Hook to catch and handle errors in functional components
 * Use this in combination with the main ErrorBoundary for comprehensive error handling
 */
export const useErrorHandler = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      // You can extend this to report to an error service
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      // You can extend this to report to an error service
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
};

/**
 * Error handler function that can be used to wrap async operations
 */
export const handleAsyncError = (error: unknown, context?: string) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  const fullContext = context ? `${context}: ${errorMessage}` : errorMessage;
  
  console.error('Async error:', fullContext, error);
  
  // You can extend this to:
  // - Report to error tracking service
  // - Show user-friendly toast notifications
  // - Log additional context
  
  return fullContext;
};
