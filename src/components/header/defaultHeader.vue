<template>
  <div class="header">
    <search-box class="searchBox"/>
    <favourites-dropdown />
  </div>
</template>

<script>
import SearchBox from "@/components/header/searchBox.vue";
import FavouritesDropdown from "@/components/header/favouritesDropdown.vue";

export default {
  name: "defaultHeader",
  components: {FavouritesDropdown, SearchBox}
}
</script>

<style lang="less" scoped>
  .header{
    width: 100vw;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-sizing: border-box;

    background: #ffff8b;
    display: flex;
    justify-content: space-between;
    row-gap: 25px;

    padding: 25px 15px;

    flex-direction: column;

    @media (min-width: 768px){
      padding: 25px 55px;
    }
    @media (min-width: 1024px){
      padding: 25px 75px 25px 350px;
      flex-direction: row;
    }

    >* {
      height: 50px;
    }
  }
  .searchBox{
    margin: 0;
    width: 100%;
    @media (min-width: 1024px) {
      margin: 0 55px;
    }
  }
</style>
