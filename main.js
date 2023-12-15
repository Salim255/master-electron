const { app, BrowserWindow } = require("electron");
const colors = require("colors");

console.log(colors.rainbow("hello wolrd"));
//Keep a global reference of the window object, if you don't, the window will be closed automatically when yhe JavaScript object is garbage collected.
let mainWindow;

//Create a new BrowserWindow when 'app' is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: { nodeIntegration: true },
  });

  //Load index.html into the new BrowserWindow
  mainWindow.loadFile("./index.html");

  //Open DevTools - Remove for PROD!
  mainWindow.openDevTools();

  //Listen for window being closed
  mainWindow.on("closed", () => {
    //debugger;
    mainWindow = null;
  });
}

//Electron 'app' ready
app.on("ready", createWindow);

//Quit when all windows are closed -(Not macOS -Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//When app icon is clicked and app is running, (macOS) recreate BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
