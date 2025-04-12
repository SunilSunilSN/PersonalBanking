import React, { useEffect, useState } from "react";
import { LoadRemoteModule } from "../Common/LoadRemoteModule";

const MicroFrontendWrapper = ({ remoteUrl, scope, module }) => {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    LoadRemoteModule({ remoteUrl, scope, module })
      .then((mod) => {
        setComponent(() => mod.default);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load microapp");
      });
  }, [remoteUrl, scope, module]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!Component) return <div>Loading micro frontend...</div>;

  return <Component />;
};

export default MicroFrontendWrapper;
