<template>
  <svg aria-hidden="true"
       :width="width"
       :height="height">
    <use :xlink:href="icon"></use>
  </svg>
</template>

<script>
export default {
  name: 'd2-icon-svg',
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '1em'
    },
    height: {
      type: String,
      default: '1em'
    }
  },
  computed: {
    icon () {
      return `#d2-${this.name}`
    }
  }
}
</script>
