
// Main process script for Electron
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const window = new BrowserWindow({width: 800, height: 600})
    window.loadFile("public/index.html")
}

app.whenReady().then(() => { createWindow() })