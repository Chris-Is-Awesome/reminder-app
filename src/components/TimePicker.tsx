import { usePlatform } from "@/hooks/usePlatform";
import { parse } from "date-fns";
import { ChevronDownIcon, ClockIcon } from "lucide-react";
import { useRef, useState } from "react";
import ReactTimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import type { Value } from "react-time-picker/dist/shared/types.js";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

interface TimePickerProps {
  defaultValue?: string;
  onChange?: (time: string) => void;
}

export function TimePicker({ defaultValue, onChange }: TimePickerProps) {
	const [time, setTime] = useState<string>(defaultValue ?? "00:00");
	const inputRef = useRef<HTMLInputElement>(null);
	const { isMobile } = usePlatform();

	const handleTimeChange = (value: Value) => {
		const time = value ?? "00:00";
		setTime(time);
		onChange?.(time ?? "00:00");
	}

	const handleChevronClick = () => {
		inputRef.current?.showPicker();
	}

	const convertToLocaleTime = (time: string) => {
		const date = parse(time, "HH:mm", new Date());
		return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit"});
	}

	return (
		<Field orientation="horizontal" className="flex flex-row gap-3 items-center justify-center border-2 border-secondary rounded-full md:rounded-lg w-3/4 p-4 md:p-3 h-12">
      <FieldLabel htmlFor="time-selection" className="sr-only">
        Pick a time
      </FieldLabel>
      <ClockIcon aria-hidden="true" className="size-4" />
      {isMobile ? (
        <div>
          <Button type="button" variant="outline" className="border-none">
            <p>{convertToLocaleTime(time)}</p>
            <ChevronDownIcon
              onClick={handleChevronClick}
              aria-hidden="true"
              className="cursor-pointer size-4 md:hidden"
            />
          </Button>
          <Input
            ref={inputRef}
            id="time-selection"
            type="time"
            onChange={(e) => handleTimeChange(e.target.value)}
            className="absolute inset-0 opacity-0"
          />
        </div>
      ) : (
        <div>
          <Input
            ref={inputRef}
            id="time-selection"
            type="time"
            className="absolute inset-0 opacity-0"
          />
          <ReactTimePicker
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
  );
}

export default TimePicker;
