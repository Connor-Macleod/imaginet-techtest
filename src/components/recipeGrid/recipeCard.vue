<template>
  <div :class="[{'deselected':!isSelected}, 'recipeCard']" @click="cardClicked" @keyup.enter="cardClicked" tabindex="0">
    <div class="recipeThumbnail">
      <img :src="recipe.strMealThumb"/>
      <div class="favouriteButton" @click.stop="toggleFavourite" @keyup.enter="toggleFavourite" tabindex="0" :aria-label="`favourite ${recipe.strMeal}`">
        <icon-base :icon="favouriteIcon" color="white" />
      </div>
    </div>
    <div class="recipeName">
      {{recipe.strMeal}}
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/icons/index.vue";

export default {
  name: "recipeCard",
  components: {IconBase},
  props: {
    isSelected: Boolean,
    recipe: {
      "required": true,
      type: Object,
      validator(value){
        // we check the required props for a meal, it must have at least an id, a name and a thumbnail
        return Object.prototype.hasOwnProperty.bind(value, 'idMeal')
        && Object.prototype.hasOwnProperty.bind(value, 'strMeal')
        && Object.prototype.hasOwnProperty.bind(value, 'strMealThumb')
      }
    }
  },
  methods:{
    cardClicked(){
      this.$emit('selected', this.recipe)
    },
    toggleFavourite(){
      if (this.isFavourite){
        this.$store.dispatch('favourites/removeFavourite', this.recipe.idMeal)
      }else {
        this.$store.dispatch('favourites/addFavourite', {id: this.recipe.idMeal,thumb: this.recipe.strMealThumb, name: this.recipe.strMeal})
      }
    }
  },
  computed: {
    isFavourite(){
      return this.$store.state.favourites.favourites.find(fav=>this.recipe.idMeal === fav.id)
    },
    favouriteIcon(){
      return this.isFavourite? 'favourite_fill' : 'favourite_outline'
    }
  }
}
</script>

<style lang="less" scoped>
.recipeCard{
  border: 1px solid #9c9c9c;
  border-radius: 5px;
  &:focus, &:hover{
    border-color: #000;
  }
  &.deselected{
    opacity: 0.5;
  }
}
.recipeName{
  padding: 25px;
  text-align: center;
}
.recipeThumbnail{
  padding-bottom: 70%;
  position: relative;
  > img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
}
.favouriteButton{
  padding: 10px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  &:hover, &:focus{
    outline: none;
     /deep/ svg path{
      fill: #9c9c9c!important
    }
  }
}
</style>
