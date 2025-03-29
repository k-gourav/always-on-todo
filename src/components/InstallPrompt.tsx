
import React from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

const InstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, promptToInstall } = useInstallPrompt();

  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-8 bg-white p-3 rounded-lg shadow-lg text-sm max-w-xs">
      <p className="mb-2">Install this app on your device for quick access.</p>
      <button
        onClick={promptToInstall}
        className="bg-gray-800 text-white px-3 py-1 rounded-md text-xs"
      >
        Install
      </button>
    </div>
  );
};

export default InstallPrompt;
