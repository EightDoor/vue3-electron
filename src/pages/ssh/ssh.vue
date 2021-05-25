<template>
  <el-button type="primary" @click="open()">打开控制台</el-button>
  <div id="terminal"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Terminal } from 'xterm';
import os from 'os';
import process from 'process';
import pty from 'node-pty';
import { FitAddon } from 'xterm-addon-fit';
import { log } from '@/utils/log';

const SSh = defineComponent({
  name: 'ssh',
  setup() {
    const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];

    const term = new Terminal({
      cols: 80,
      rows: 34,
      cursorBlink: true,
    });
    const ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 34,
      cwd: process.cwd(),
      env: process.env,
    });
    function open() {
      term.open(document.getElementById('terminal'));
      const fitaddon = new FitAddon();
      term.loadAddon(fitaddon);
      fitaddon.fit();
      // Setup communication between xterm.js and node-pty
      term.onData((data) => {
        ptyProcess.write(data);
        log('xterm=> ' + data);
      });
      ptyProcess.on('data', function (data) {
        term.write(data);
      });
      term.onLineFeed(() => {
        const buffer = term.buffer;
        const newLine = buffer.getLine(buffer.baseY + buffer.cursorY);
        if (newLine && !newLine.isWrapped) {
          const inputData = getLineData(
            buffer,
            buffer.baseY + buffer.cursorY - 1
          );
          // parseCmd(inputData);
          console.log(inputData);
        } else {
        }
      });

      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
    }
    function getLineData(buffer, lineIndex) {
      let line = buffer.getLine(lineIndex);
      if (!line) {
        return;
      }
      let lineData = line.translateToString(true);
      while (lineIndex > 0 && line.isWrapped) {
        line = buffer.getLine(--lineIndex);
        if (!line) {
          break;
        }
        lineData = line.translateToString(false) + lineData;
      }
      return lineData;
    }
    return {
      term,
      //fun
      open,
    };
  },
});
export default SSh;
</script>
<style lang="less">
@import './ssh.less';
</style>
