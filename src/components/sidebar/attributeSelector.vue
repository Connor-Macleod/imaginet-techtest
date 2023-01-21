<template>
  <div class="attributesSelector">
    <h3>{{title}}</h3>
    <div class="attributeBox">
      <div class="attributeTag" v-for="attr in attributes" v-bind:key="attr"><div class="attributeRemove" @click="excludeAttr(attr)" @keyup.enter="excludeAttr(attr)" tabindex="0" :aria-label="`Remove ${attr} from results`">✖</div>{{attr}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "attributeSelector",
  props: {
    title: String,
    attributes: Array
  },
  methods:{
    excludeAttr(attr){
      this.$emit('exclude', attr)
    }
  }
}
</script>

<style lang="less" scoped>
  .attributesSelector{
    padding: 10px
  }
  .attributeBox{
    display: flex;
    flex-direction: row;
    border-radius: 5px;
    border: 1px solid #9c9c9c;
    flex-wrap: wrap;
    padding: 5px;
    gap: 5px;
  }
  .attributeTag {
    background: #d3d3d3;
    padding: 2px;
    display: flex;
    flex-direction: row;
    gap: 7px;
    border-radius: 3px;
    border: 1px solid transparent;
    &:focus-within, &:hover{
      border-color: #000;
    }
    *:focus{
      outline: none;
    }
  }
  .attributeRemove{
    cursor: pointer
  }
</style>
