import useSettingsStore from "../store/useSettingsStore";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const theme = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);

  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  return (
    <Button onClick={cycleTheme}>
      {theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "💻"}
    </Button>
  );
}
