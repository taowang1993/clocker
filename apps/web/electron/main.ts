import { app, BrowserWindow, screen, shell } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function isOAuthUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    return hostname === "accounts.google.com";
  } catch {
    return false;
  }
}

function createWindow() {
  const displays = screen.getAllDisplays();
  const primaryDisplay = screen.getPrimaryDisplay();
  const targetDisplay =
    displays.find((display) => display.internal === false) ??
    displays.find((display) => display.id !== primaryDisplay.id) ??
    primaryDisplay;
  const { x, y } = targetDisplay.bounds;

  const win = new BrowserWindow({
    x,
    y,
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 16, y: 12 },
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
    },
  });

  win.maximize();

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isOAuthUrl(url)) {
      return {
        action: "allow",
        overrideBrowserWindowOptions: {
          width: 500,
          height: 700,
          titleBarStyle: "default",
          autoHideMenuBar: true,
          parent: win,
        },
      };
    }
    shell.openExternal(url);
    return { action: "deny" };
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
