import { addHours, addYears, format, isToday } from "date-fns";
import { CalendarIcon, ChevronDownIcon, ClockIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface DateTimePickerProps {
  date: Date | undefined;
  children?: React.ReactNode;
  onChange?: (date: Date) => void;
}

export function DateTimePicker({
  date,
  children,
  onChange,
}: DateTimePickerProps) {
  const now = new Date();
  const [open, setOpen] = useState(false);
  const [defaultTime, setDefaultTime] = useState<string>("");

  const combineDateTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(":").map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined;
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const time = isToday(selectedDate)
        ? format(addHours(now, 1), "HH:mm")
        : "00:00";
      setDefaultTime(time);
      setOpen(false);
      onChange?.(combineDateTime(selectedDate, time));
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultTime(e.target.value);

    if (date) {
      onChange?.(combineDateTime(date, e.target.value));
    }
  };

  return (
    <FieldGroup className="flex flex-col md:flex-row mt-2 items-center justify-center w-full">
      <Field className="flex flex-col">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className="data-[empty=true]:text-muted-foreground bg-background w-[212px] md:w-full justify-between text-left font-normal border-secondary rounded-full md:rounded-lg"
            >
              <div className="relative flex items-center justify-between w-full gap-3">
                <CalendarIcon aria-hidden="true" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <ChevronDownIcon aria-hidden="true" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              startMonth={now}
              endMonth={addYears(now, 10)}
              onSelect={handleDateSelect}
              defaultMonth={date}
              disabled={{ before: now }}
              className="bg-background rounded-sm border border-secondary relative overflow-hidden text-foreground"
            />
          </PopoverContent>
        </Popover>
      </Field>
      {date && (
        <Field className="flex flex-col gap-1 w-[150px] md:w-full">
          <FieldLabel htmlFor="time-selection" className="sr-only">
            Pick a time
          </FieldLabel>
          <div className="relative">
            <ClockIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4"
              aria-hidden="true"
            />
            <Input
              id="time-selection"
              type="time"
              step="60"
              value={defaultTime}
              onChange={handleTimeChange}
              className="pl-9 rounded-full md:rounded-lg border-secondary [&::-webkit-calendar-picker-indicator]:hidden"
            />
          </div>
        </Field>
      )}
      {children}
    </FieldGroup>
  );
}

export default DateTimePicker;
