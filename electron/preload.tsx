import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    fetchExperts: (network: string) => ipcRenderer.invoke('fetch-experts', { network }), // Specify type for 'network'
    updateInterval: (interval: number) => ipcRenderer.send('update-interval', { interval }), // Specify type for 'interval'
    onIntervalUpdated: (callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on('interval-updated', callback) // Specify type for 'callback'
});
