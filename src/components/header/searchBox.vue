<template>
  <div class="searchBox">
    <icon-base icon="search_magnify" color="#000" class="searchButton" @click="doSearch"/>
    <input type="text" :value="search" @keyup.enter="doSearch" @input="updateSearch" placeholder="Search" aria-label="Search">
  </div>
</template>

<script>
import IconBase from "@/components/icons/index.vue";

export default {
  name: "searchBox",
  components: { IconBase },
  data:()=>({
    unsearchedSearchTerm: null
  }),
  computed: {
    search(){
      return this.$store.state.recipes.searchTerm
    }
  },
  methods: {
    updateSearch(event){
      this.unsearchedSearchTerm = event.target.value
    },
    doSearch(){
      if (this.unsearchedSearchTerm===null) return
      this.$store.dispatch('recipes/updateSearch', this.unsearchedSearchTerm)
    }
  }
}
</script>

<style lang="less" scoped>
  .searchBox{
    border: 1px solid #9c9c9c;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:focus-within{
      background: white;
      border-color: #000;
    }
    input{
      background: none;
      border: none;
      width: 100%;
      flex-grow: 1;
      flex-shrink: 1;
      outline: none;
    }
  }
  .searchButton{
    padding: 10px;
    aspect-ratio: 1/1;
    height: 100%;
    cursor: pointer;
    box-sizing: border-box;
    /deep/ svg {
      width: 100%;
      height: 100%
    }
  }
</style>
