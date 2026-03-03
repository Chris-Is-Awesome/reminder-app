import { AlarmClockIcon, AlarmClockOffIcon } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { useItems } from "../hooks/useItems";
import type { Item } from "../types/Item";
import DateTimePicker from "./reusable/DateTimePicker";
import { Form, FormField, useAppForm } from "./reusable/Form";
import { Button } from "./ui/button";
import { FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ItemFormProps {
  item?: Item;
}

const schema = z.object({
  title: z.string().optional().default(""),
  body: z.string().min(1, "Content is required"),
});
const bodyPlaceholders = [
  "Note",
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

type ItemFormValues = z.infer<typeof schema>;

export function ItemForm({ item }: ItemFormProps) {
  const { createItem } = useItems();
  const [remindAt, setRemindAt] = useState(item?.remindAt);
  const [bodyPlaceholder] = useState(
    () => bodyPlaceholders[Math.floor(Math.random() * bodyPlaceholders.length)],
  );
  const form = useAppForm(schema, { title: "", body: "" });
  const submitLabel = item
    ? `Save ${remindAt ? "reminder" : "note"}`
    : `Create ${remindAt ? "reminder" : "note"}`;
  const submittingText = item ? "Saving..." : "Creating...";

  const onSubmit = async (data: ItemFormValues) => {
    console.log("Created item:", data);

    await createItem({
      title: data.title,
      body: data.body,
      labelIDs: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
      isPinned: false,
      isArchived: false,
      isTrashed: false,
      remindAt: remindAt,
    });
  };

  const handleRemoveReminderClick = () => {
    setRemindAt(undefined);
  };

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      submittingText={submittingText}
      className="items-center justify-center min-h-screen"
    >
      <FormField
        form={form}
        name="title"
        label="Title"
        hideLabel
        render={(field) => (
          <Input
            {...field}
            placeholder="Title"
            className="rounded-lg border-secondary h-14 text-2xl md:h-10 md:text-lg"
          />
        )}
        className="w-5/6"
      />
      <FormField
        form={form}
        name="body"
        label="Body"
        hideLabel
        render={(field) => (
          <Textarea
            {...field}
            rows={4}
            placeholder={bodyPlaceholder}
            className="rounded-lg border-secondary"
          />
        )}
        className="w-5/6"
      />
      <FieldSet>
        <legend className="block w-full text-center">
          <AlarmClockIcon
            className="inline mr-1 mb-1 size-5"
            aria-hidden="true"
          />
          Remind me
        </legend>
        <DateTimePicker date={remindAt} onChange={(date) => setRemindAt(date)}>
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
    </Form>
  );
}
