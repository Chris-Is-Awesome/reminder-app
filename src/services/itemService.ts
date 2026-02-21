import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase.ts";
import type { Item } from "../types/Item.ts";

export const itemService = {
	create: async (item: Omit<Item, 'id'>): Promise<Item> => {
		const docRef = await addDoc(collection(db, 'items'), {
			...item,
			createdAt: Timestamp.fromDate(item.createdAt),
			modifiedAt: Timestamp.fromDate(item.modifiedAt),
			remindAt: item.remindAt ? Timestamp.fromDate(item.remindAt) : null,
		});
		
		return { ...item, id: docRef.id };
	}
}