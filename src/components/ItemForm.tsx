import { Form } from "./reusable/Form";
import { useItems } from "../hooks/useItems";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Field, FieldLabel, FieldGroup, FieldSet } from "./ui/field";
import type { Item } from "../types/Item";
import DateTimePicker from "./reusable/DateTimePicker";
import { NavBar } from "./reusable/NavBar";
import { AlarmClockIcon, AlarmClockOffIcon } from "lucide-react";
import { Button } from "./ui/button";

interface ItemFormProps {
  item?: Item;
}

export function ItemForm({ item }: ItemFormProps) {
  const { createItem } = useItems();
  const bodyPlaceholders = [
    "Take out the trash",
    "Call mom and ask her for money",
    "Remind me to remind me to remind me to...",
    "Type anything... please, it's lonely in here.",
    "Write something profound here...",
    "Note to self: write better notes to self",
    "Your great idea goes here, or your shopping list, or that recipe you keep forgetting",
    "This is something for future me...",
    "Walk my pet capybara",
    "Write something here. Or don't. I'm just an app, I don't judge",
    "Get a watermelon for my pet capybara",
    "Water the plants",
    "Reminding you to write a reminder for that thing you might forget",
    "Stop snoozing reminders",
    "Hey you, you're finally awake.",
    "Oh hi. How are you holding up? Because I'm a potato.",
    "For those who come after...",
  ];

  const [title, setTitle] = useState(item?.title ?? "");
  const [body, setBody] = useState(item?.body ?? "");
  const [remindAt, setRemindAt] = useState(item?.remindAt ?? undefined);
  const [placeholder] = useState(
    () => bodyPlaceholders[Math.floor(Math.random() * bodyPlaceholders.length)],
  );

  const handleSubmit = async () => {
    await createItem({
      title,
      body,
      labelIDs: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
      isPinned: false,
      isArchived: false,
      isTrashed: false,
      remindAt: remindAt ?? undefined,
    });
  };

  const handleRemoveReminderClick = () => {
    setRemindAt(undefined);
  };

  const submitBtnText = (): string => {
    if (remindAt) {
      return "Remind me";
    }

    if (item) {
      return "Save note";
    }

    return "Create note";
  };

  const formTitle = (): string => {
    if (item) {
      return `Edit ${remindAt ? "Reminder" : "Note"}`;
    }

    return `Create ${remindAt ? "Reminder" : "Note"}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-1/2">
          <Form
            onSubmit={handleSubmit}
            submitLabel={submitBtnText()}
            formTitle={formTitle()}
          >
            <FieldGroup className="flex-col gap-1 items-center">
              <Field>
                <FieldLabel htmlFor="title" className="sr-only">
                  Note title
                </FieldLabel>
                <Input
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-2 border-secondary rounded-xl mt-2"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="note-body" className="sr-only">
                  Note Contents
                </FieldLabel>
                <Textarea
                  id="note-body"
                  placeholder={placeholder}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="border-2 border-secondary rounded-xl mt-2 h-48 placeholder:text-muted-foreground"
                />
              </Field>
              <FieldSet>
                <legend className="block w-full text-center">
                  <AlarmClockIcon
                    className="inline mr-1 mb-1 size-5"
                    aria-hidden="true"
                  />
                  Remind me
                </legend>
                <DateTimePicker
                  date={remindAt}
                  onChange={(date) => setRemindAt(date)}
                >
                  {remindAt && (
                    <Button
                      onClick={handleRemoveReminderClick}
                      className="px-3"
                      aria-label="Remove reminder"
                    >
                      <AlarmClockOffIcon />
                    </Button>
                  )}
                </DateTimePicker>
              </FieldSet>
            </FieldGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}
