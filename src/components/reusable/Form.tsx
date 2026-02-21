import { Button } from "../ui/button";

interface FormProps {
  onSubmit: () => void;
  submitLabel: string;
  children: React.ReactNode;
}

export function Form({ onSubmit, submitLabel, children }: FormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
      <Button className="bg-blue-500 hover:bg-blue-600 mt-2 px-6" type="submit">
        {submitLabel}
      </Button>
    </form>
  );
}
