## Reminder App
This is a reminder and note taking app.

### Dev Notes

---
#### Planned Features
---
##### MVP
- CRUD functionality for notes & reminders
- Run in background
- Reminders fire notifications that work on mobile, desktop, and the web (likely only Chrome because Firefox sucks with notifications)
- Authentication
- Works on Windows and Android
- Reminders can be snoozed, skipped, and can be recurring
- Database storage

##### Stretch Goals
- Search
- Filter options
- Sort options
- Archival option
- Offline sync (works while offline, but syncs once online)
- Back button should be able to go back on any modal or view with full history
- Turn this into a browser extension as an additional option for running this
- Additional themes, and maybe a customizable accent color?
- JSON import/export
- Customizable sound effect for reminders going off on desktop/web
- Keyboard shortcuts for desktop/web

---
#### How the App Will Work
---
##### Side Drawer
Will be a collapsible side drawer that starts collapsed, represented by a hamburger menu button.

##### Search Bar
Will be a search bar that searches through all notes and reminders (including archived & trashed?) for the search query text. Could maybe add options to further customize the search, such as only searching in reminders, or to include archived items, or even allow Regular Expressions in the query.

##### Main View
The content that gets rendered in this view will be determined by React Router, with the URL changing based on which `NavItem` is clicked in the `SideDrawer`.

##### Settings View
Will take up the whole screen as a separate page (a separate route from the `MainLayout`).

---
#### Component Tree
---
```
App
├── AuthView (route: /login)
|   └── Form (AuthForm, handles login and signup)
├── SettingsView (route: /settings)
├── ItemView (route: /items/:id)
|   ├── ItemDetails
|   └── Form (ItemForm, handles new and editing)
└── MainLayout (route: /*)
    ├── Header
    │   ├── SideDrawer
    │   │   ├── DrawerSection (Main)
    │   │   │   ├── NavItem (Reminders)
    │   │   │   └── NavItem (Notes)
    │   │   ├── DrawerSection (Labels)
    │   │   │   └── NavItem (one for each label, up to 5 or 10 so side drawer isn't scrollable)
    │   │   └── DrawerSection (Options)
    │   │       ├── NavItem (Archive)
    │   │       ├── NavItem (Trash)
    │   │       └── NavItem (Settings)
    │   ├── SearchBar
    │   ├── Dropdown (Filter)
    │   ├── Dropdown (Sort)
    │   └── Toggle (List/Grid)
    └── MainView
	   └── <active route renders one of:>
            ├── ListView (Reminders)
            │   └── ListItem (one for each reminder)
            ├── ListView (Notes)
            │   └── ListItem (one for each note)
            ├── ListView (Labels)
            │   └── ListItem (one for each label)
            ├── ListView (Archive)
            │   └── ListItem (one for each archived item)
            └── ListView (Trash)
                └── ListItem (one for each trashed item)
```

---
#### Code Outline

---
##### Interfaces
Item
<table>
	<thead>
		<tr>
			<th>Var</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>id</td>
			<td>string</td>
			<td>The unique ID for the item</td>
		</tr>
		<tr>
			<td>title</td>
			<td>string</td>
			<td>The title for the item</td>
		</tr>
		<tr>
			<td>body</td>
			<td>string</td>
			<td>The body text for the item</td>
		</tr>
		<tr>
			<td>labelIDs</td>
			<td>string[]</td>
			<td>An array of label IDs for the item</td>
		</tr>
		<tr>
			<td>createdAt</td>
			<td>Date</td>
			<td>The date of creation for the item</td>
		</tr>
		<tr>
			<td>modifiedAt</td>
			<td>Date</td>
			<td>The date of last modification for the item</td>
		</tr>
		<tr>
			<td>isPinned</td>
			<td>boolean</td>
			<td>Is the item pinned?</td>
		</tr>
		<tr>
			<td>isArchived</td>
			<td>boolean</td>
			<td>Is the item archived?</td>
		</tr>
		<tr>
			<td>isTrashed</td>
			<td>boolean</td>
			<td>Is the item trashed?</td>
		</tr>
		<tr>
			<td>remindAt (optional)</td>
			<td>Date</td>
			<td>The date the reminder should trigger at</td>
		</tr>
		<tr>
			<td>isRecurring (optional)</td>
			<td>boolean</td>
			<td>Is the reminder recurring?</td>
		</tr>
	</tbody>
</table>

Label
<table>
	<thead>
		<tr>
			<th>Var</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>id</td>
			<td>string</td>
			<td>The unique ID for the label</td>
		</tr>
		<tr>
			<td>name</td>
			<td>string</td>
			<td>The display name for the label</td>
		</tr>
	</tbody>
</table>

---
#### State
---
##### Auth Store
<table>
	<thead>
		<tr>
			<th>Var</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>currentUser</td>
			<td>User | null</td>
			<td>The currently authenticated user, or null if unathenticated</td>
		</tr>
		<tr>
			<td>isAuthenticated</td>
			<td>boolean</td>
			<td>Is the user authenticated?</td>
		</tr>
		<tr>
			<td>login</td>
			<td>function(user: User)</td>
			<td>The login function</td>
		</tr>
		<tr>
			<td>logout</td>
			<td>function()</td>
			<td>The logout function</td>
		</tr>
	</tbody>
</table>

##### Settings Store
<table>
	<thead>
		<tr>
			<th>Var</th>
			<th>Type</th>
			<th>Default Value</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>theme</td>
			<td>'light' | 'dark' | 'system'</td>
			<td>'system'</td>
			<td>The theme for the app</td>
		</tr>
		<tr>
			<td>defaultView</td>
			<td>'reminders' | 'notes'</td>
			<td>'notes'</td>
			<td>The default view to show when launching the app</td>
		</tr>
		<tr>
			<td>listViewMode</td>
			<td>'list' | 'grid'</td>
			<td>'grid'</td>
			<td>Toggles between grid and list view mode for MainView</td>
		</tr>
		<tr>
			<td>sortBy</td>
			<td>'created' | 'alpha' | 'soonest'</td>
			<td>'created'</td>
			<td>Stores the sort by preference</td>
		</tr>
		<tr>
			<td>sortOrder</td>
			<td>'asc' | 'desc'</td>
			<td>'desc'</td>
			<td>Stores the sort order preference</td>
		</tr>
	</tbody>
</table>

##### UI Store
<table>
	<thead>
		<tr>
			<th>Var</th>
			<th>Type</th>
			<th>Default Value</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>isModalOpen</td>
			<td>boolean</td>
			<td>false</td>
			<td>True whenever a modal is open and it disables inputs for the `MainView`, which would still be visible in the background</td>
		</tr>
		<tr>
			<td>filterBy</td>
			<td>'all' | 'label' | 'today' | 'tomorrow' | 'this week'</td>
			<td>'all'</td>
			<td>Stores the filter by preference</td>
		</tr>
		<tr>
			<td>searchQuery</td>
			<td>string</td>
			<td>''</td>
			<td>The inputted search query</td>
		</tr>
		<tr>
			<td>selectedItem</td>
			<td>Item | null</td>
			<td>null</td>
			<td>The selected item</td>
		</tr>
	</tbody>
</table>

##### Item Store
<table>
	<thead>
		<tr>
			<th>Var</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
	<tr>
			<td>items</td>
			<td>Item[]</td>
			<td>An array of created Items</td>
		</tr>
		<tr>
			<td>addItem</td>
			<td>function(item: Item)</td>
			<td>Adds a new item</td>
		</tr>
		<tr>
			<td>deleteItem</td>
			<td>function(id: string)</td>
			<td>Deletes the item matching the ID</td>
		</tr>
		<tr>
			<td>updateItem</td>
			<td>function(id: string, updates: Partial of type Item)</td>
			<td>Updates the item matching the ID</td>
		</tr>
	</tbody>
</table>

##### Label Store
<table>
	<thead>
		<tr>
			<th>Var</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>labels</td>
			<td>Label[]</td>
			<td>An array of created labels</td>
		</tr>
		<tr>
			<td>addLabel</td>
			<td>function(label: Label)</td>
			<td>Adds a new label</td>
		</tr>
		<tr>
			<td>deleteLabel</td>
			<td>function(id: string)</td>
			<td>Deletes the label with the given ID</td>
		</tr>
		<tr>
			<td>renameLabel</td>
			<td>function(id: string, name: string)</td>
			<td>Renames the label with the given ID</td>
		</tr>
	</tbody>
</table>