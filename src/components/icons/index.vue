<template>
  <div v-html="svg"></div>
</template>

<script>
import icons from './icons'
export default {
  name: "iconBase",
  props:{
    color: {type: String, default: '#ffffff'},
    icon: {type: String, required: true}
  },
  computed: {
    svg (){
      return icons[this.icon](this.color)
    }
  }
}
</script>

<style scoped>

</style>
