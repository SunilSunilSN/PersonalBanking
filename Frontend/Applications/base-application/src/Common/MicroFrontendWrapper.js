/* global __webpack_init_sharing__, __webpack_share_scopes__ */
import React, { useEffect, useState } from "react";

const MicroFrontendWrapper = ({ remoteUrl, scope, module, screen, extraParams = {} }) => {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      await __webpack_init_sharing__("default");
      let container = window[scope];

      if (!container) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = remoteUrl;
          script.type = "text/javascript";
          script.async = true;
          script.onload = () => {
            container = window[scope];
            resolve();
          };
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      await container.init(__webpack_share_scopes__.default);
      const factory = await container.get(module);
      const Module = factory().default;
      setComponent(() => Module);
    };

    loadComponent();
  }, [remoteUrl, scope, module]);

  if (!Component) return <div>Loading MicroApp...</div>;

  const searchParams = new URLSearchParams({ screen, ...extraParams });
  const LocationWithParams = () => <Component location={{ search: `?${searchParams}` }} />;

  return <LocationWithParams />;
};

export default MicroFrontendWrapper;