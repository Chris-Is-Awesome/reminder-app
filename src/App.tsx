import { useEffect } from "react";
import { ItemForm } from "./components/ItemForm";
import { NavButton } from "./components/NavButton";
import useSettingsStore, { applyTheme } from "./store/useSettingsStore";

function App() {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    applyTheme(theme);
  }, []);

  return (
    <div className="relative">
      <div className="absolute">
        <NavButton navOption="back" />
      </div>
      <ItemForm />
    </div>
  );
}

export default App;
