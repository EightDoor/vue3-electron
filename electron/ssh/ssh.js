const { ipcMain } = require('electron');
const pty = require('node-pty');
const os = require('os');
function send() {
  const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: process.env,
  });
  ptyProcess.on('data', function (data) {
    process.stdout.write(data);
  });
  ipcMain.on('send_message_ssh', (event, args) => {
    ptyProcess.write(args);
    ptyProcess.on('data', function (data) {
      event.reply('get_message_ssh', data);
    });
  });
}

function init() {
  send();
}
module.exports = { init };
