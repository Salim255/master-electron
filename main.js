const { app, BrowserWindow, webContents } = require("electron");
const colors = require("colors");
const windowStateKeeper = require("electron-window-state");

//Keep a global reference of the window object, if you don't, the window will be closed automatically when yhe JavaScript object is garbage collected.
let mainWindow, secondaryWindow;

//Create a new BrowserWindow when 'app' is ready
function createWindow() {
  //Create state manager
  let winState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
  });

  mainWindow = new BrowserWindow({
    width: winState.defaultWidth,
    height: winState.defaultHeight,
    x: 100, //x,y, to tell where to create this window (mainWindow)
    y: 100,
    minWidth: 300,
    minHeight: 150,
    webPreferences: { nodeIntegration: true },
    backgroundColor: "red",
    //frame: false,
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
  // mainWindow.loadURL("https://httpbin.org/basic-auth/user/passwd");
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

  // Tell windState, which window state should be stored
  winState.manage(mainWindow);

  //
  let wc = mainWindow.webContents;
  //console.log(webContents.getAllWebContents(), "Hello web content");

  wc.on("context-menu", (e, params) => {
    console.log(
      `Context menu opened on: ${params.mediaType} at x: ${params.x}, y: ${params.y}`
    );
    //
    console.log(`User selected text: ${params.selectionText}`);
    console.log(`Selection can be copied: ${params.editFlags.canCopy}`);
  });

  wc.on("media-started-playing", () => {
    console.log("Video Starting...");
  });

  wc.on("media-paused", () => {
    console.log("Video paused...");
  });

  /* wc.on("login", (request, authInfo, callback) => {
    console.log("Logging in:");
    callback("user", "passwd");
  });

  wc.on("did-navigate", (e, url, statusCode, message) => {
    console.log(`Navigate to: ${url}`);
    console.log(statusCode);
  });
 */
  //This event means, all our content is ready
  wc.on("did-finish-load", () => {
    //This will fire only when all the content are already loaded, including images
    console.log("Content fully loaded 🍎🍎");
  });

  //This event meant that the document object module of the HTML been loaded , is ready, we might have unloaded images ..., but the structure is ready to be interacted with
  wc.on("dom-ready", () => {
    //This will run even if the images not fully loaded//////
    console.log("Dom ready 🍎🍎");
  });

  wc.on("did-attach-webview", (event, wc) => {
    // event.preventDefault();
    //This will prevent form opening the url in a new browser window
    console.log(`Creating new window for:`, event, wc);
  });

  wc.on("before-input-event", (e, input) => {
    console.log(`${input.key} : ${input.type}`);
  });

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
