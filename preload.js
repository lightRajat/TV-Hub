const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('systemUtils', {
  increaseVolume: () => ipcRenderer.invoke('increase-volume'),
  decreaseVolume: () => ipcRenderer.invoke('decrease-volume'),
})