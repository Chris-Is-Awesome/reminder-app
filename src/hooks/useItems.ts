import { itemService } from "../services/itemService"
import useItemStore from "../store/useItemStore";
import type { Item } from "../types/Item";

export function useItems() {
	const addItem = useItemStore((state) => state.addItem);

	const createItem = async (item: Omit<Item, 'id'>) => {
		try {
			const newItem = await itemService.create(item);
			addItem(newItem);
		} catch (error) {
			console.error('Failed to create item:', error);
		}
	}

	return { createItem }
}