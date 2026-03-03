import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

interface NavBarProps {
  navOption: "menu" | "back";
}

export function NavButton({ navOption }: NavBarProps) {
  const showMenuBtn = navOption === "menu";

  const handleClickHamburger = () => {
    console.log("Clicked hamburger!", "TODO: Toggle side panel");
  };

  const handleClickBack = () => {
    console.log("Clicked back!", "TODO: Route back to prior page in history");
  };

  return (
    <div className="md:p-4 pl-4 pt-[env(safe-area-inset-top)]">
      <Button
        onClick={showMenuBtn ? handleClickHamburger : handleClickBack}
        className="md:size-10 md:p-3 size-14 rounded-full [&_svg]:size-5"
        aria-label={showMenuBtn ? "Toggle menu" : "Go back"}
        variant="ghost"
      >
        {showMenuBtn ? <MenuIcon /> : <ArrowLeftIcon />}
      </Button>
    </div>
  );
}
