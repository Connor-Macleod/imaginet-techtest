<template>
  <div class="recipeGrid">
    <template v-for="recipe in recipes" v-bind:key="recipe.idMeal" >
      <recipe-card :recipe="recipe" @selected="recipeSelected" :is-selected="!selected || recipe.idMeal === selected" />
      <recipe-info :recipe="recipe" v-if="recipe.idMeal === selected" />
    </template>
  </div>
</template>

<script>
import RecipeCard from "@/components/recipeGrid/recipeCard.vue";
import RecipeInfo from "@/components/recipeGrid/recipeInfo.vue";

export default {
  name: "recipeGrid",
  components: {RecipeInfo, RecipeCard},
  created() {
    this.$store.dispatch('recipes/getRecipes')
  },
  computed: {
    recipes (){
      return this.$store.state.recipes.recipes
    },
    selected(){
      return this.$store.state.recipes.selected
    }
  },
  methods: {
    recipeSelected(recipe){
      this.$store.commit('recipes/selectRecipe', recipe.idMeal)
    }
  }
}
</script>

<style lang="less" scoped>

.recipeGrid{
  display: grid;
  width: calc(100vw);

  @media (min-width: 1023px){
    width: calc(100vw - 350px);
  }
  box-sizing: border-box;
  grid-auto-flow: dense;
  gap: 40px 60px;

  padding: 15px 15px;
  grid-template-columns: 1fr;
  @media (min-width: 768px){
    grid-template-columns: 1fr 1fr;
    padding: 15px 55px;
  }
  @media (min-width: 1024px){
    padding: 15px 75px;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
