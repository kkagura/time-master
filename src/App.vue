<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Index from "./components/Index";
import { invoke } from "@tauri-apps/api";
import { ref } from "vue";
const value = ref("2");

document.addEventListener("DOMContentLoaded", () => {
  value.value = "8";
  // DOM 内容加载完成之后，通过 invoke 调用 在 Rust 中已经注册的命令
  invoke<string>("load_config")
    .then((res) => {
      value.value = res;
    })
    .catch((err) => {
      value.value = "xxx";
    });
});
</script>

<template>
  <Index />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
