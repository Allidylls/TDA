// In renderer process (web page).
const {ipcRenderer} = require('electron');
console.log(ipcRenderer.sendSync('synchronous-message', 'ping sync')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg); // prints "pong"
});
ipcRenderer.send('asynchronous-message', 'ping async')
