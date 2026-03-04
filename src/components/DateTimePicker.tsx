import { usePlatform } from "@/hooks/usePlatform";
import { addHours, addYears, format, isToday, parse } from "date-fns";
import { CalendarIcon, ChevronDownIcon, ClockIcon } from "lucide-react";
import { useRef, useState } from "react";
import TimePicker from "react-time-picker";
import type { Value } from "react-time-picker/dist/shared/types.js";
import "react-time-picker/dist/TimePicker.css";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DateTimePickerProps {
  date: Date | undefined;
  children?: React.ReactNode;
  onChange?: (date: Date) => void;
}

export function DateTimePicker({ date, children, onChange }: DateTimePickerProps) {
  const now = new Date();
	const { isMobile } = usePlatform();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<string>("00:00");
	const dateInputRef = useRef<HTMLInputElement>(null);
	const timeInputRef = useRef<HTMLInputElement>(null);
	const clockIcon = <ClockIcon aria-hidden="true" className="size-4 inline-block md:-mt-0.5 md:mr-2" />;

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
      setTime(time);
      setOpen(false);
      onChange?.(combineDateTime(selectedDate, time));
    }
  };

  const handleTimeChange = (value: Value | string) => {
		const newTime = value ?? "00:00";
    setTime(newTime);

    if (date) {
      onChange?.(combineDateTime(date, newTime));
    }
  };

	const convertToLocaleTime = (time: string) => {
		const parsed = parse(time, "HH:mm", new Date());
		return parsed.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
	}

  return (
    <FieldGroup className="flex md:flex-row mt-2 items-center justify-center">
      {/* Date picker */}
      <Field>
        {isMobile ? (
          <div className="relative">
            <Button
              type="button"
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
            <input
              ref={dateInputRef}
              type="date"
              min={format(now, "yyyy-MM-dd")}
              defaultValue={format(now, "yyyy-MM-dd")}
              onChange={(e) => {
                if (e.target.value) {
                  const [year, month, day] = e.target.value
                    .split("-")
                    .map(Number);
                  handleDateSelect(new Date(year, month - 1, day));
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        ) : (
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
        )}
      </Field>

      {/* Time picker */}
      {date && (
        <Field
          orientation="horizontal"
          className="flex flex-row justify-center border-2 border-secondary rounded-full md:rounded-lg w-4/5 p-3 h-12"
        >
          <FieldLabel htmlFor="time-selection" className="sr-only">
            Pick a time
          </FieldLabel>
          {isMobile ? (
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => timeInputRef.current?.showPicker()}
                className="border-none hover:bg-transparent hover:text-foreground active:bg-transparent"
              >
                {clockIcon}
                <p>{convertToLocaleTime(time)}</p>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-4 md:hidden"
                />
              </Button>
              <Input
                ref={timeInputRef}
                id="time-selection"
                type="time"
                onChange={(e) => handleTimeChange(e.target.value)}
                className="absolute inset-0 opacity-0"
              />
            </div>
          ) : (
            <div>
              {clockIcon}
              <Input
                ref={timeInputRef}
                id="time-selection"
                type="time"
                className="absolute inset-0 opacity-0"
              />
              <TimePicker
                onChange={handleTimeChange}
                value={time}
                disableClock
                clearIcon={null}
                format="h:mm a"
                className="border-none [&_input]:bg-transparent [&_input]:focus-within:outline-none text-sm"
              />
            </div>
          )}
        </Field>
      )}
      {children}
    </FieldGroup>
  );
}

export default DateTimePicker;
