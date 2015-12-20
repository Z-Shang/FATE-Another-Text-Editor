'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', function(){
    app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 1280, height: 800});

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
});
