import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Controller,
	useForm,
	type DefaultValues,
	type FieldValues,
	type Path,
	type Resolver,
	type UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  submitLabel: string;
  submittingText: string;
  children: React.ReactNode;
  className?: string;
}

interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  hideLabel?: boolean;
  render: (field: any) => React.ReactNode;
  className?: string;
}

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  submitLabel,
  submittingText,
  children,
  className,
}: FormProps<T>) {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4", className)}
    >
      {children}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? submittingText : submitLabel}
      </Button>
    </form>
  );
}

export function FormField<T extends FieldValues>({
  form,
  name,
  label,
  hideLabel,
  render,
  className,
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={name} className={cn(hideLabel && "sr-only")}>
            {label}
          </FieldLabel>
          {render({
            ...field,
            id: name,
            "aria-invalid": fieldState.invalid,
          })}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function useAppForm<T extends z.ZodType<any, any>>(
  schema: T,
  defaultValues: DefaultValues<z.output<T>>,
) {
  return useForm<z.output<T>>({
    resolver: zodResolver(schema) as Resolver<z.output<T>>,
    defaultValues,
  });
}
