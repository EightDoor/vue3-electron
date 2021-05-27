<template>
  <el-button type="primary" @click="open()">打开控制台</el-button>
  <div id="terminal"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Terminal } from 'xterm';
const { ipcRenderer } = require('electron');
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const SSh = defineComponent({
  name: 'ssh',
  setup() {
    const term = new Terminal({
      cols: 80,
      rows: 34,
      cursorBlink: true,
    });
    function open() {
      term.open(document.getElementById('terminal'));

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      fitAddon.fit();
      term.onData((data) => {
        // ptyProcess.write(data);
        ipcRenderer.send('send_message_ssh', data);
        console.log('xterm=> ' + data);
      });
      ipcRenderer.on('get_message_ssh', (event, args) => {
        console.log(args, 'args');
        term.write(args);
      });
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
