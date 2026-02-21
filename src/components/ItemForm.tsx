import { Form } from "./reusable/Form";
import { useItems } from "../hooks/useItems";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import type { Item } from "../types/Item";

interface ItemFormProps {
  item?: Item;
}

export function ItemForm({ item }: ItemFormProps) {
  const { createItem } = useItems();
  const [title, setTitle] = useState(item?.title ?? "");
  const [body, setBody] = useState(item?.body ?? "");

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
    });
  };

  return (
    <Form onSubmit={handleSubmit} submitLabel={item ? "Save" : "Create"}>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-2 border-blue-500 rounded-md mt-2"
      />
      <Textarea
        placeholder="Write some text here!"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border-2 border-blue-500 rounded-md mt-2"
      />
    </Form>
  );
}
