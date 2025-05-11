/**
 * This file represents the Renderer Script.
 * 
 * Preload.js: A script that helps expose privileged NodeJS APIs into the renderer process/webpages. 
 * By default, only the main process/entrypoint script has access to NodeJS API.
 * Preload script is injected before webpage are loaded in the renderer process.
 * 
 * Given both Renderer script (webpages) & Main Script have distinct responsibilities, 
 * communication b/w them is doing using Electron's IPC module.
 */
const { contextBridge, ipcRenderer } = require("electron");

/**
 * All these properties can be accessed in the index.html using `version.node()` etc.
 */
contextBridge.exposeInMainWorld("version", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke("ping")
})