<template>
  <div class="toast-box" v-show="show">
    <svg v-show="type === 'success'" t="1602946231661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7928" width="32" height="32"><path d="M63.223 512s231.768 189.585 254.79 350.823c0 0 303.907-497.491 641.582-542.003 0 0-102.837-74.944-69.07-193.396 0 0-187.256 18.685-540.279 566.638l-165.452-280.85L63.223 512z" p-id="7929" fill="#ffffff"></path></svg>
    <svg v-show="type === 'error'" style="height: 22px;" t="1602946352695" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1605" width="32" height="32"><path d="M86.016 0L2.048 70.656c149.504 111.616 288.768 239.616 411.136 367.616C225.792 627.2 78.848 813.056 1.536 887.808L161.28 1021.44c56.832-117.248 180.224-294.912 345.6-481.28C672.256 727.552 796.16 906.24 852.992 1024c0 0 155.648-165.376 169.472-139.776C962.56 816.64 816.128 620.032 619.52 418.816c112.64-115.712 239.104-230.4 374.272-331.264l-36.864-68.608c-153.088 76.288-299.008 189.44-430.08 309.76C394.752 203.264 245.248 83.968 86.016 0z" p-id="1606" fill="#ffffff"></path></svg>
    <span>{{ message }}</span>
  </div>
</template>


<script>
export default {
  data() {
    return {
      type: '',
      message: '',
      show: true,
    };
  },
};
</script>


<style scoped>
.toast-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  text-align: center;
  border-radius: 5px;
  font-size: 15px;
  line-height: 18px;
  padding: 15px 15px;
  display: flex;
  align-items: center;
}
</style>