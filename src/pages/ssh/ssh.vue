<template>
  <el-button type="primary" @click="open()">打开控制台</el-button>
  <div id="terminal"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Terminal } from 'xterm';

const SSh = defineComponent({
  name: 'ssh',
  setup() {
    const term = new Terminal();
    function open() {
      term.open(document.getElementById('terminal'));
      term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
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
