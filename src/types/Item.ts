export interface Item {
	id: string
	title: string
	body: string
	labelIDs: string[]
	createdAt: Date
	modifiedAt: Date
	isPinned: boolean
	isArchived: boolean
	isTrashed: boolean
	remindAt?: Date
	isRecurring?: boolean
}