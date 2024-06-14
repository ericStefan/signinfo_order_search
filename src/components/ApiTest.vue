<template>
  
</template>

<script>
// 这个组件用来展示如何调用api接口
import api from '@/api';

export default {
  data() {
    return {
      user: null,
      loading: true,
      error: null,
    };
  },
  created() {
    // 使用API调用
    api.user.getUserById(1)
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        this.error = "Failed to load user data.";
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style lang="scss" scoped>

</style>