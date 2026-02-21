import { create } from 'zustand';
import type { Item } from '../types/Item';

interface ItemStore {
	items: Item[];
	addItem: (item: Item) => void;
	deleteItem: (id: string) => void;
	updateItem: (id: string, updates: Partial<Item>) => void;
}

const useItemStore = create<ItemStore>((set) => ({
	items: [],
	addItem: (item) => set((state) => ({ items: [...state.items, item] })),
	deleteItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
	updateItem: (id, updates) => set((state) => ({
		items: state.items.map((i) => i.id === id ? { ...i, ...updates } : i)
	})),
}))

export default useItemStore;