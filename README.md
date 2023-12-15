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
