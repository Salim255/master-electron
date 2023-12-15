const { app, BrowserWindow } = require("electron");
const colors = require("colors");

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

//browser window blur
app.on("browser-window-blur", () => {
  console.log("App unfocus...");
});

app.on("browser-window-focus", () => {
  console.log("App focus...");
});

//Quit app
app.on("before-quit", () => {
  console.log("App is quitting...");
});
//Electron 'app' ready
app.on("ready", () => {
  console.log("App is ready, and running ...", colors.rainbow("hello wolrd"));
  console.log(app.getPath("desktop"));
  console.log(app.getPath("music"));
  console.log(app.getPath("temp"));
  console.log(app.getPath("userData"));
});

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
