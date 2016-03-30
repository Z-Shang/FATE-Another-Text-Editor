'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let mainWindow = null;

if(process.platform == 'darwin'){
  Menu.setApplicationMenu(new Menu());
  // Delete the menu items on Mac OS X devices.
}

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 880,
    minHeight: 310
  });

//  mainWindow.setMenu(null); // Diable the Native Menu on Windows, use Context Menu inside the HTML.
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.show();
  mainWindow.maximize();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
