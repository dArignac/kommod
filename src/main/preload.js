const { contextBridge, ipcRenderer } = require('electron');

// we are within Electron app
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    getToken(name) {
      // this is then handled in main.ts
      ipcRenderer.send('get-password', name);
    },
    setToken(name, value) {
      // this is then handled in main.ts
      ipcRenderer.send('set-password', name, value);
    },
    on(channel, func) {
      const validChannels = ['get-password'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['get-password'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
