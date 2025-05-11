/**
 * This file represents the Main Script.
 * 
 * app: Controls application's event lifecycle.
 * BrowserWindow: Creates & manages app windows.
 */
const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("path");
const Store = require("electron-store");

const store = new Store();
console.log(store.get("randomMessage"));
let mainWindow;
const createBrowserWindow = () => {

  // This represents a renderer process.
  // Loads the webpage in a new BrowserWindow instance.
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      experimentalFeatures: true,
      preload: path.join(__dirname, "preload.js") // Attaches the preload script to the renderer process.
    }
  })
  // win.loadFile(path.join(__dirname, 'index.html'));
  win.loadURL("http://localhost:3001/");

  win.on('page-title-updated', () => { console.log('Window Event: page-title-updated'); })
  win.on('close', () => { console.log('Window Event: close'); })
  win.on('closed', () => { console.log('Window Event: closed'); })
  win.on('session-end', () => { console.log('Window Event: session-end'); })
  win.on('unresponsive', () => { console.log('Window Event: unresponsive'); })
  win.on('responsive', () => { console.log('Window Event: responsive'); })
  win.on('blur', () => { console.log('Window Event: blur'); })
  win.on('focus', () => { console.log('Window Event: focus'); })
  win.on('show', () => { console.log('Window Event: show'); })
  win.on('hide', () => { console.log('Window Event: hide'); })
  win.on('ready-to-show', () => { console.log('Window Event: ready-to-show'); })
  win.on('maximize', () => { console.log('Window Event: maximize'); })
  win.on('unmaximize', () => { console.log('Window Event: unmaximize'); })
  win.on('minimize', () => { console.log('Window Event: minimize'); })
  win.on('restore', () => { console.log('Window Event: restore'); })
  win.on('will-resize', () => { console.log('Window Event: will-resize'); })
  win.on('resize', () => { console.log('Window Event: resize'); })
  win.on('resized', () => { console.log('Window Event: resized'); })
  win.on('will-move', () => { console.log('Window Event: will-move'); })
  win.on('move', () => { console.log('Window Event: move'); })
  win.on('moved', () => { console.log('Window Event: moved'); })
  win.on('enter-full-screen', () => { console.log('Window Event: enter-full-screen'); })
  win.on('leave-full-screen', () => { console.log('Window Event: leave-full-screen'); })
  win.on('enter-html-full-screen', () => { console.log('Window Event: enter-html-full-screen'); })
  win.on('leave-html-full-screen', () => { console.log('Window Event: leave-html-full-screen'); })
  win.on('always-on-top-changed', () => { console.log('Window Event: always-on-top-changed'); })
  win.on('app-command', () => { console.log('Window Event: app-command'); })
  win.on('swipe', () => { console.log('Window Event: swipe'); })
  win.on('rotate-gesture', () => { console.log('Window Event: rotate-gesture'); })
  win.on('sheet-begin', () => { console.log('Window Event: sheet-begin'); })
  win.on('sheet-end', () => { console.log('Window Event: sheet-end'); })
  win.on('new-window-for-tab', () => { console.log('Window Event: new-window-for-tab'); })
  win.on('system-context-menu', () => { console.log('Window Event: system-context-menu'); })

  mainWindow = win;
}

app.on("window-all-closed", () => {
  console.log("window-all-closed");
  store.set("randomMessage", "Windows Closed.")
  if (process.platform !== "darwin") app.quit();
})


app.on('did-become-active', () => { console.log('App Event: did-become-active') })
app.on('did-resign-active', () => { console.log('App Event: did-resign-active') })
app.on('continue-activity', () => { console.log('App Event: continue-activity') })
app.on('will-continue-activity', () => { console.log('App Event: will-continue-activity') })
app.on('continue-activity-error', () => { console.log('App Event: continue-activity-error'); })
app.on('activity-was-continued', () => { console.log('App Event: activity-was-continued'); })
app.on('update-activity-state', () => { console.log('App Event: update-activity-state'); })
app.on('new-window-for-tab', () => { console.log('App Event: new-window-for-tab'); })
app.on('browser-window-blur', () => { console.log('App Event: browser-window-blur'); })
app.on('browser-window-focus', () => { console.log('App Event: browser-window-focus'); })
app.on('browser-window-created', (e, win) => {
  console.log("App Event: browser-window-created: " + win.getTitle())

  const openedBrowserWindows = BrowserWindow.getAllWindows();

  if (win.id != 1) {
    console.log('App Event: browser-window-created: openedWindows ');
    console.log(openedBrowserWindows)

    // Place the newly created window on a fresh screen. 
    // Fresh screen is a screen on which there isn't a previously opened window.

    // #00. Iterate through all screens.
    const newScreen = screen.getAllDisplays().find((currentlyIteratedScreen) => {

      // #01. For each screen, iterate through all windows.
      const isBrowserWindowOnCurrentScreen = openedBrowserWindows.some((openedBrowserWindow) => {

        // #02. Determines the screen on which the window is located.
        const browserWindowScreen = screen.getDisplayNearestPoint({ x: openedBrowserWindow.getBounds().x, y: openedBrowserWindow.getBounds().y })
        console.log("currentlyIteratedScreen " + currentlyIteratedScreen.label)
        console.log("browserWindowScreen " + browserWindowScreen.label)
        // #03. Verify if the screen on which the window is located (browserWindowScreen)
        // is same as the currently iterating screen (currentlyIteratedScreen)
        return browserWindowScreen.id === currentlyIteratedScreen.id;
      })

      // #04. If the Browser Window is on "currently iterated screen", then we return false 
      // as we need to find fresh screen.
      return isBrowserWindowOnCurrentScreen ? false : true;
    });

    // Extract the coordinates of newScreen if found, if not, then choose the main.
    const { x, y } = newScreen?.bounds ?? mainWindow?.getBounds();

    win.setBounds({
      x: x,
      y: y,
      width: 600,
      height: 400
    });

  }

})
app.on('web-contents-created', () => { console.log('App Event: web-contents-created'); })
app.on('certificate-error', () => { console.log('App Event: certificate-error'); })
app.on('select-client-certificate', () => { console.log('App Event: select-client-certificate'); })
app.on('login', () => { console.log('App Event: login'); })
app.on('gpu-info-update', () => { console.log('App Event: gpu-info-update'); })
app.on('render-process-gone', () => { console.log('App Event: render-process-gone'); })
app.on('child-process-gone', () => { console.log('App Event: child-process-gone'); })
app.on('accessibility-support-changed', () => { console.log('App Event: accessibility-support-changed'); })
app.on('session-created', () => { console.log('App Event: session-created'); })
app.on('second-instance', () => { console.log('App Event: second-instance'); })



// Note: BrowserWindow can only be created after app module is ready.
app.whenReady().then(() => {

  createBrowserWindow();

  // For Mac OS
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createBrowserWindow()
  });

  // The response is sent to the renderer webpage. 
  ipcMain.handle("ping", () => "pong");
});
