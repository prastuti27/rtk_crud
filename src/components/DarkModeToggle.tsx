import React, { useEffect, useState } from "react";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 dark:bg-gray-800 rounded text-black dark:text-white"
    >
      {isDarkMode ? (
        <LiaToggleOnSolid size={24} />
      ) : (
        <LiaToggleOffSolid size={24} />
      )}
    </button>
  );
};

export default DarkModeToggle;
