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
    <div className="flex flex-col items-center justify-center min-h-screen">
      {formTitle && <h1 className="text-2xl font-bold">{formTitle}</h1>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col items-center justify-center w-1/2"
      >
        {children}
        <Button type="submit">{submitLabel}</Button>
      </form>
    </div>
  );
}
