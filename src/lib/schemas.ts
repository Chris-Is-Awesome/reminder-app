import { z } from 'zod';

export const UserProfileSchema = z.object({
	uid: z.string(),
	email: z.string().email(),
	displayName: z.string().min(1).optional(),
	createdAt: z.date(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>