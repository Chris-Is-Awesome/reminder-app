import { useEffect } from "react";
import useSettingsStore from "./store/useSettingsStore";
import { applyTheme } from "./store/useSettingsStore";
import { ItemForm } from "./components/ItemForm";
import { ThemeToggle } from "./components/themeToggle";

function App() {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    applyTheme(theme);
  }, []);

  // useEffect(() => {
  //   const root = document.documentElement;

  //   if (theme === "dark") {
  //     root.classList.add("dark");
  //   } else if (theme == "light") {
  //     root.classList.remove("dark");
  //   } else {
  //     const isDark = window.matchMedia("(prefers-color-scheme: dark").matches;
  //     isDark ? root.classList.add("dark") : root.classList.remove("dark");
  //   }
  // }, [theme]);

  return (
    <>
      <div className="min-h-screen">
        <ItemForm />
      </div>
    </>
  );
}

export default App;
