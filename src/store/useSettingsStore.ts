import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'blue';
type DefaultView = 'notes' | 'reminders';
type ListViewMode = 'list' | 'grid';
type SortBy = 'created' | 'alpha' | 'soonest';
type SortOrder = 'asc' | 'desc';

interface SettingsStore {
	theme: Theme;
	defaultView: DefaultView;
	listViewMode: ListViewMode;
	sortBy: SortBy;
	sortOrder: SortOrder;
	setTheme: (theme: Theme) => void;
	setDefaultView: (view: DefaultView) => void;
	setListViewMode: (mode: ListViewMode) => void;
	setSortBy: (sortBy: SortBy) => void;
	setSortOrder: (sortOrder: SortOrder) => void;
}

export const applyTheme = (theme: Theme) => {
	const root = document.documentElement;

	// Remove existing theme classes
	const existingThemes = Array.from(root.classList).filter((t) => t.startsWith('theme-'));
	existingThemes.forEach((t) => root.classList.remove(t));

	// Add new theme class
	if (theme !== 'light') {
		root.classList.add(`theme-${theme}`);
	}

	// if (theme === 'dark') {
	// 	root.classList.add('dark');
	// } else if (theme == 'light') {
	// 	root.classList.remove('dark');
	// } else {
	// 	const isDark = window.matchMedia('(prefers-color-scheme: dark').matches;
	// 	isDark ? root.classList.add('dark') : root.classList.remove('dark');
	// }
}

const useSettingsStore = create<SettingsStore>()(
	persist(
		(set) => ({
			theme: 'blue',
			defaultView: 'notes',
			listViewMode: 'grid',
			sortBy: 'created',
			sortOrder: 'desc',
			setTheme: (theme) => {
				applyTheme(theme);
				set({ theme });
			},
			setDefaultView: (defaultView) => set({ defaultView }),
			setListViewMode: (listViewMode) => set({ listViewMode }),
			setSortBy: (sortBy) => set({ sortBy }),
			setSortOrder: (sortOrder) => set({ sortOrder }),
		}),
		{ 
			name: 'settings',
			storage: createJSONStorage(() => localStorage)
		}
	)
)

export default useSettingsStore;