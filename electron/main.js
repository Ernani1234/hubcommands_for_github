import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Start the existing Express + WebSocket server
import '../server/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const iconPath = path.join(__dirname, '..', 'app', 'icon', 'iconapp.ico');
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#0f2a1e',
    icon: iconPath,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);
  win.loadURL('http://localhost:5050/');
}

app.setAppUserModelId('com.githubshub.app');

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});