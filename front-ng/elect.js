const electron = require('electron')
const {app, BrowserWindow} = electron

let win = null

app.on('ready', function () {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })

  win.loadURL('http://www.glassofguitar.com/')

  win.on('closed', function () {
    win = null
  })

})
// create the application window if the window variable is null
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
// quit the app once closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
