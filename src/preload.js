const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchExperts: (network) => ipcRenderer.invoke('fetch-experts', { network }),
    updateInterval: (interval) => ipcRenderer.send('update-interval', { interval }),
    onIntervalUpdated: (callback) => ipcRenderer.on('interval-updated', callback)
});
