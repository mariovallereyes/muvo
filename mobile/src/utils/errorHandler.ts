/**
 * Global error handler to ensure all errors are proper Error objects
 * This helps prevent the "non-std C++ exception" error on iOS
 */

export const setupGlobalErrorHandlers = () => {
  // Override Promise.reject to ensure all rejections use Error objects
  const originalReject = Promise.reject;
  Promise.reject = (reason) => {
    if (reason instanceof Error) {
      return originalReject(reason);
    }
    return originalReject(new Error(String(reason)));
  };

  // Set up global error handler
  if (global.ErrorUtils) {
    const originalGlobalHandler = global.ErrorUtils.getGlobalHandler();
    global.ErrorUtils.setGlobalHandler((error, isFatal) => {
      console.log('[Global Error Handler]', error, isFatal);
      // Make sure we're always passing an Error object
      if (!(error instanceof Error)) {
        error = new Error(String(error));
      }
      originalGlobalHandler(error, isFatal);
    });
  }

  // Override console.error to log more details
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('Unhandled promise rejection')) {
      console.log('[Error Handler] Detected unhandled promise rejection');
    }
    originalConsoleError(...args);
  };
};
