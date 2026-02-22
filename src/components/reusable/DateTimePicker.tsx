import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Field, FieldLabel, FieldGroup } from "../ui/field";
import { format, addYears, addHours, isToday } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Input } from "../ui/input";

interface DateTimePickerProps {
  onChange?: (date: Date) => void;
}

export function DateTimePicker({ onChange }: DateTimePickerProps) {
  const now = new Date();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
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
        ? format(addHours(new Date(), 1), "HH:mm")
        : "00:00";
      setDate(selectedDate);
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
    <>
      <FieldGroup className="flex-row w-xs mt-2 items-center justify-center">
        <Field className="flex flex-col gap-1 w-[250px]">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="data-[empty=true]:text-muted-foreground bg-background w-[212px] justify-between text-left font-normal border-secondary"
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <ChevronDownIcon />
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
                className="bg-background rounded-md border border-secondary relative overflow-hidden h-[330px]"
              />
            </PopoverContent>
          </Popover>
        </Field>
        {date && (
          <Field className="flex flex-col gap-1 w-[150px]">
            <Input
              type="time"
              step="60"
              value={defaultTime}
              onChange={handleTimeChange}
            />
          </Field>
        )}
      </FieldGroup>
    </>
  );
}

export default DateTimePicker;
