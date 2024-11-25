import React, { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import { Switch } from "@headlessui/react";
import { FaCog } from "react-icons/fa";

const Settings = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-6">
          <FaCog className="text-lg" />
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Dark Mode
          </span>
          <div className="flex items-center space-x-4">
            <img
              src={lightIcon}
              alt="Light Mode Icon"
              className="h-6 w-6 hidden dark:block"
            />
            <img
              src={darkIcon}
              alt="Dark Mode Icon"
              className="h-6 w-6 block dark:hidden"
            />
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200`}
            >
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
