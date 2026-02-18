import { create } from 'zustand';
import type { User } from 'firebase/auth';

interface AppState {
	user: User | null,
	isAuthLoading: boolean,
	setUser: (user: User | null) => void,
	setAuthLoading: (loading: boolean) => void,
}

export const useAppStore = create<AppState>((set) => ({
	user: null,
	isAuthLoading: true,
	setUser: (user) => set({ user }),
	setAuthLoading: (isAuthLoading) => set ({ isAuthLoading }),
}));