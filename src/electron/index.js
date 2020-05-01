const { app, BrowserWindow } = require('electron');
const path = require('path');
const development = process.env.NODE_ENV == 'development';

require('electron-reload')(__dirname);

const mainWindowPath = path.resolve(__dirname, '../../build', `${development ? 'dev' : 'prod'}`, 'index.html')
console.log(mainWindowPath);

const initMainWindow = () => {

	const mainWindow = new BrowserWindow({
		width: 500,
		height: 500,
		webPreferences: {
			nodeIntegration: true
		}
	})

	mainWindow.loadFile(mainWindowPath);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	})

	// send todos from main window when shown
	mainWindow.once('show', () => {
		// mainWindow.webContents.send('todos', todosStore.todos)
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(initMainWindow);

app.on('window-all-closed', (event) => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (Window.getAllWindows().length === 0) {
		initMainWindow();
	}
})

console.log('Humara Electron App')