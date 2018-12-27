<template>
  <tinymce :height="300"
           v-model="content" />
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style>
</style>
