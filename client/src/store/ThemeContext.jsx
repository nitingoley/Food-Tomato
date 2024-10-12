import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "", themeControler: () => {} });

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = (props) => {
  // Correcting the spelling mistake
  const localThemeMode =
    localStorage.getItem("theme") === "dark"
      ? true
      : localStorage.getItem("theme") === "light"
      ? false
      : true; // Defaults to dark mode if not set

  const [isDarkMode, setIsDarkMode] = useState(localThemeMode);

  const themeControler = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? "dark" : "light";

  // Apply the selected theme to the document and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeControler }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
