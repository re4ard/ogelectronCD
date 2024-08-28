const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow;
let indexLoaded = false; // Flag to track if index.html is loaded

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 480,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile('start.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  const pythonProcess = spawn('python', [path.join(__dirname, 'CD_Detection.py')]);

  pythonProcess.stdout.on('data', (data) => {
    const message = data.toString().trim();
    if (message === "CD Detected with files" && !indexLoaded) {
        mainWindow.loadFile(path.join(__dirname, 'MainParts', 'load.html'));
        indexLoaded = true;
    } else if (message === "No CD Detected" || message === "Permission error: D drive not ready or accessible") {
        mainWindow.loadFile(path.join(__dirname, 'start.html'));
        indexLoaded = false;
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error("Error occurred in Python script:", data.toString());
  });

  pythonProcess.on('error', (error) => {
    console.error("Error occurred while spawning Python process:", error);
  });

  pythonProcess.on('exit', (code) => {
    console.log("Python process exited with code:", code);
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
