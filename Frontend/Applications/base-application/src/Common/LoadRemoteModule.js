/* global __webpack_init_sharing__, __webpack_share_scopes__ */
export const LoadRemoteModule = async ({ remoteUrl, scope, module }) => {
    await __webpack_init_sharing__('default');
  
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = remoteUrl;
      script.type = 'text/javascript';
      script.async = true;
  
      script.onload = () => {
        const container = window[scope];
  
        if (!container) {
          reject(new Error(`Cannot find container ${scope}`));
          return;
        }
  
        // Avoid 'then is not a function' error
        try {
          container.init(__webpack_share_scopes__.default);
        } catch (e) {
          console.warn(`Module ${scope} already initialized or failed to initialize:`, e);
        }
  
        container.get(module).then((factory) => {
          const Module = factory();
          resolve(Module);
        });
      };
  
      script.onerror = () => {
        reject(new Error(`Failed to load remote script: ${remoteUrl}`));
      };
  
      document.head.appendChild(script);
    });
  };
  