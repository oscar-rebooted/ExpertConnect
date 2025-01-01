// electron/main.js
import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null; // Explicitly type mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true, // Security: ensure no direct access to Node APIs
    },
  });

  // Load your React app, served by Webpack dev server during development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000'); // React dev server
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html')); // For production
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
