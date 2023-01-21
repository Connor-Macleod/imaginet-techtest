<template>
  <div class="favouritesDropdown">
    <div class="dropdownControl" tabindex="0">
      <div />
      <div>Favourites</div> <icon-base icon="favourite_outline" color="#000" class="fav-icon"/>
      <div />
    </div>
    <ul class="dropdown">
      <li v-for="favourite in favourites" :key="favourite.id" @click="selectFavourite(favourite)"  tabindex="0">
        <img :src="favourite.thumb">
        <p>{{ favourite.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import IconBase from "@/components/icons/index.vue";

export default {
  name: "favouritesDropdown",
  components: {IconBase},
  created() {
    this.$store.dispatch('favourites/getFavourites')
  },
  computed: {
    favourites() {
      return this.$store.state.favourites.favourites
    }
  },
  methods: {
    selectFavourite({id, term}){
      this.$store.dispatch('recipes/updateSearch', term)
      this.$store.commit('recipes/selectRecipe', id)
    }
  }
}
</script>

<style lang="less" scoped>
.favouritesDropdown {
  width: 100%;
  @media (min-width: 1024px) {
    width: 20vw;
    max-width: 300px;
  }

  overflow: visible;
  border-radius: 5px;
  border: 1px solid #9c9c9c;
  flex-shrink: 0;
  &:hover, &:focus-within {
    background: white;
    outline: none;
    .dropdown{
      display: flex;
    }
  }
}

.dropdown {
  display: none;
  height: 500px;
  overflow-y: auto;
  position: absolute;
  background: white;
  margin: -2px 0 0 -1px;
  width: calc(100% - 150px);
  max-height: calc(100vh - 150px);
  @media (min-width: 1024px) {
    max-height: 80vh;
    width: 20vw;
    max-width: 300px;
  }
  padding: 0;
  border: 1px solid #9c9c9c;
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  flex-direction: column;
  row-gap: 10px;
  > li {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
    padding: 5px 30px;
    cursor: pointer;
    &:hover, &:focus{
      background: #9c9c9c;
      outline: none;
    }
  }
  img {
    width: 50px;
    aspect-ratio: 1/0.7;
    object-fit: cover;
    border-radius: 5px;
  }
  img, p{
    display: inline-block;
  }
}


.dropdownControl{
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  &:focus{
    outline:none
  }
}
</style>
