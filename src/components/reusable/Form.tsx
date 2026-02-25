import { Button } from "../ui/button";

interface FormProps {
  formTitle?: string;
  submitLabel: string;
  children: React.ReactNode;
  onSubmit: () => void;
}

export function Form({
  formTitle,
  submitLabel,
  children,
  onSubmit,
}: FormProps) {
  return (
    <div>
      {formTitle && (
        <h1 className="text-2xl font-bold text-center">{formTitle}</h1>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col items-center justify-center"
      >
        {children}
        <Button type="submit" className="mt-5">
          {submitLabel}
        </Button>
      </form>
    </div>
  );
}
