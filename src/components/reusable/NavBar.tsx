import { MenuIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group";

export function NavBar() {
  const handleClickHamburger = () => {
    console.log("Clicked hamburger!", "TODO: Toggle side panel");
  };

  const handleClickBack = () => {
    console.log("Clicked back!", "TODO: Route back to prior page in history");
  };

  return (
    <ButtonGroup className="p-4">
      <ButtonGroup>
        <Button
          onClick={handleClickHamburger}
          className="px-3"
          aria-label="Toggle menu"
          variant="outline"
        >
          <MenuIcon className="size-9" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button
          onClick={handleClickBack}
          className="px-3"
          aria-label="Go back"
          variant="outline"
        >
          <ArrowLeftIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
