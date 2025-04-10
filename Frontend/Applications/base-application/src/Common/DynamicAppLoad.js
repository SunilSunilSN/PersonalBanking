/* eslint-disable no-undef */
/* global __webpack_init_sharing__, __webpack_share_scopes__ */
import React, { useEffect, useState } from "react";

const loadRemoteComponent = ({ url, scope, module }) => {
  return async () => {
    // Inject remoteEntry.js script if not already present
    await new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${url}"]`);

      if (existingScript) {
        const checkInit = () => {
          const container = window[scope];
          if (container?.init && container?.get) return resolve();
      
          // Try again in 100ms
          setTimeout(checkInit, 100);
        };
      
        checkInit();
        return;
      }

      const script = document.createElement("script");
      script.src = url;
      script.type = "text/javascript";
      script.async = true;

      script.onload = () => {
        if (!window[scope]) {
          return reject(new Error(`Remote container '${scope}' is not found on window.`));
        }
        resolve();
      };

      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));

      document.head.appendChild(script);
    });

    // Initialize module federation sharing
    await __webpack_init_sharing__("default");

    const container = window[scope];

    if (!container?.init || !container?.get) {
      throw new Error(`Container '${scope}' does not expose 'init' or 'get' methods.`);
    }

    await container.init(__webpack_share_scopes__.default);

    const factory = await container.get(module);
    const Module = factory();

    return Module;
  };
};

const useRemoteComponent = ({ url, scope, module }) => {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRemoteComponent({ url, scope, module })()
      .then((mod) => setComponent(() => mod.default || mod))
      .catch((err) => {
        console.error("Remote load failed:", err);
        setError(err);
      });
  }, [url, scope, module]);

  return { Component, error };
};

export const DynamicAppLoad = ({ config }) => {
  const { Component, error } = useRemoteComponent(config);

  if (error) return <div style={{ color: "red" }}>Failed to load: {error.message}</div>;
  if (!Component) return <div>Loading micro app...</div>;

  return <Component />;
};
