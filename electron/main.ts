import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isDev = process.env.NODE_ENV === 'development';

function createWindows() {
	const mainWin = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
		},
	})
	// const notifWin = new BrowserWindow({
	// 	width: 1200,
	// 	height: 800,
	// 	alwaysOnTop: true,
	// 	frame: false,
	// 	skipTaskbar: true,
	// 	webPreferences: {
	// 		preload: path.join(__dirname, 'preload.js'),
	// 		contextIsolation: true,
	// 		nodeIntegration: false,
	// 	}
	// });
	// notifWin.setAlwaysOnTop(true, 'screen-saver');

	if (isDev) {
		// Load from Vite dev server
		mainWin.loadURL('http://localhost:5173');
		// win.webContents.openDevTools();
	} else {
		// Load built files
		mainWin.loadFile(path.join(__dirname, '../dist/index.html'));
	}
}

app.whenReady().then(async () => {
	createWindows();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindows();
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
})