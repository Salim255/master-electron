const { app, BrowserWindow } = require("electron");
const colors = require("colors");

//Keep a global reference of the window object, if you don't, the window will be closed automatically when yhe JavaScript object is garbage collected.
let mainWindow, secondaryWindow;

//Create a new BrowserWindow when 'app' is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: { nodeIntegration: true },
    backgroundColor: "red",
  });

  secondaryWindow = new BrowserWindow({
    width: 900,
    height: 500,
    webPreferences: { nodeIntegration: true },
    parent: mainWindow,
    modal: true,
    show: false,
  });

  //Load index.html into the new BrowserWindow

  mainWindow.loadFile("./index.html");
  secondaryWindow.loadFile("./secondaryIndex.html");
  //Show mainWindow when it's ready to show
  // mainWindow.once("ready-to-show", mainWindow.shadow);
  //Open DevTools - Remove for PROD!
  //mainWindow.openDevTools();

  setTimeout(() => {
    secondaryWindow.show();
    setTimeout(() => {
      //secondaryWindow.hide();
      //or
      secondaryWindow.close();
      secondaryWindow = null;
    }, 2000);
  }, 2000);
  //Listen for window being closed
  mainWindow.on("closed", () => {
    //debugger;
    mainWindow = null;
  });
  /*  secondaryWindow.on("closed", () => {
    //debugger;
    secondaryWindow = null;
  }); */
}

//browser window blur
app.on("browser-window-blur", () => {
  console.log("App unfocus...");
});

app.on("browser-window-focus", () => {
  console.log("App focus...");
});

//Quit app
/* app.on("before-quit", () => {
  console.log("App is quitting...");
}); */
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
