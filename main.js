const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const loudness = require('loudness');

// main window
const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      webviewTag: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.setFullScreen(true);
  win.loadFile('src/index.html');
};
app.whenReady().then(createWindow);
app.on('window-all-closed', app.quit);

// volume controls
ipcMain.handle('increase-volume', async () => {
  let volume = await loudness.getVolume();
  volume++;
  volume = Math.ceil(volume / 10);
  volume *= 10;
  volume = volume > 100 ? 100 : volume;

  await loudness.setVolume(volume);
  return volume;
});
ipcMain.handle('decrease-volume', async () => {
  let volume = await loudness.getVolume();
  volume--;
  volume = parseInt(volume / 10);
  volume *= 10;
  volume = volume < 0 ? 0 : volume;

  await loudness.setVolume(volume);
  return volume;
});