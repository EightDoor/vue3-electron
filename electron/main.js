const { app, BrowserView } = require("electron");

const path = require("path");

function createWindow() {
  const win = new BrowserView({
    width: 800,
    height: 600,
  });
  win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then((res) => {
  if (BrowserView.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});
