<template>
  <div>
    <!-- <tinymce :height="300" -->
    <!-- v-model="content" /> -->
    <button @click="handleClick">aaa</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    handleClick () {
      console.log(this.msgUtil.isDelSuccess({ 'code': 200 }))
    }
  }
}
</script>

<style>
</style>
