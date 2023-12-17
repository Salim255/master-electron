# master-electron

- npm i -d electron@latest (prefer)
- npm i -g electron

# commands:

- to launch electron : electron

# Typical Structure of electron application

## Electron operate with two types of process

- Main application process, and this is a nodejs process, by running: npm start, which will open the application on chrome, this called Renderer process
- Main process can have many Renderer process, you can take the Main process like, the server-side, and the renderer like the client-slide

# Debugging

- npm i -g electron-rebuild
- electron-rebuild + package ("bycypt" module for example); helps to compile electron with the exact needed version of package from node module

# Debugging the Main process

- Chrome devTools provide excellent javaScript debugging
- 1. Configuring Chrome to listen on the port that will be debugging the app, and thats by running: (electron --inspect=5858 .), with that we gonna have node debugger listening in port 5858
- 2. Then we use Chrome inspector, and that by going to chrome://inspect
- 3. click configure, then enter (localhost:5858) then click on (done)
- 4. Step 3 will open new devtool for our app Main process
- to set up a breakpoint we use (debugger)
- to set up a break in launch, we an run (electron --inspect-brk=5858 .)

# Understanding Electron API:

## Electron split in 3 main API

- 1. Main Process API
- 2. Renderer Process API
- 3. Shared Modules API
- This breakdown in main APIs is very important

# APP module or APP instance,

- This app module created automatically be electron
- In this instance (APP) we control our app lifecycle (closing , opening ...)
- The very first event of this app, is (Ready event) and this fire as soon as our app has been created, and it's ready to use
- Also we can listen to the end of the app lifecycle by listening to before quite event

# BrowserWindow Module

- Is the module with which we create the Renderer Process win dows for our app
- We configure this BrowserWindow with a couple of parameters, like (window height and width), then by (webPreferences, we can tell electron that we do want nodejs integrated into the Render Process, and this by setting {noeIntegrated: true} on the browserWindow wep content, so this can give access to nodejs from our BrowserWindow, for things like 'require...')
- Then once we created that BrowserWindow, we can load html file into that Chromium browser window , and that by calling (loadFile('html file to load'))
- Showing window gracefully by using ( ready-to-show event ) this will hide the window to all it's content is loaded

# Frameless BrowserWindow instances

- Its useful to deal with window user interface(close bar...)

# BrowserWindow Properties and Methods & Events

- Events like, show, hide, focus, blur, getAllWindow, getFocusWindow ...

# BrowserWindow: Window State

- To add window state management, we need to install :
- npm install --save electron-window-state; so it's a library to store and restore window size and position for our Electron app

# BrowserWindow: webContents(module)

- BrowserWindow web content represent a content loaded into the browserWindow

## webContents Events

-
