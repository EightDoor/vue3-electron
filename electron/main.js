const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  //
  isDev ? dev() : win.loadFile(path.join(__dirname, 'dist/index.html'));
  function dev() {
    win.loadURL('http://localhost:9999/').then(
      (
        r // 打开调试
      ) => win.webContents.openDevTools()
    );
  }
}

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
