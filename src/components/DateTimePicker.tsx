import { addHours, addYears, format, isToday } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import TimePicker from "./TimePicker";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Field, FieldGroup } from "./ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
  const [defaultTime, setDefaultTime] = useState<string>("00:00");

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

  const handleTimeChange = (time: string) => {
    setDefaultTime(time);

    if (date) {
      onChange?.(combineDateTime(date, time));
    }
  };

  return (
    <FieldGroup className="flex md:flex-row mt-2 items-center justify-center">
      <Field>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className="data-[empty=true]:text-muted-foreground bg-background justify-between text-left font-normal border-secondary rounded-full md:rounded-lg border-2 p-0"
            >
              <div className="flex gap-3 items-center p-4 md:p-3">
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
      {/* {date && (
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
      )} */}
      {date && (
        <TimePicker defaultValue={defaultTime} onChange={handleTimeChange} />
      )}
      {/* <Field>
        <TimePicker
          onChange={setTime}
          value={time}
          disableClock
          clearIcon={null}
          format="hh:mm a"
          className="border-2 [&_input]:bg-transparent"
        />
      </Field> */}
      {children}
    </FieldGroup>
  );
}

export default DateTimePicker;
