<template>
  <div class="recipeInfo">
    <div class="video" v-if="recipe.strYoutube">
      <you-tube :src="recipe.strYoutube" width="100%" height="100%"/>
    </div>
    <div class="copy" tabindex="0">
      <h2>Instruction</h2>
      <p>{{recipe.strInstructions}}</p>
      <h2>Ingredients + Measure</h2>
      <ol>
        <li v-for="(ingredient, key) in recipe.ingredients" v-bind:key="key">{{ingredient.ingredient}} - {{ingredient.measure}}</li>
      </ol>
    </div>
  </div>
</template>

<script>
import YouTube from "vue3-youtube";

export default {
  name: "recipeInfo",
  components: {
    YouTube
  },
  props: {
  recipe: {
    "required": true,
    type: Object
  }
  }
}
</script>

<style lang="less" scoped>

.recipeInfo{
  border: 1px solid #9c9c9c;
  display: flex;
  position: relative;
  flex-direction: column;
  @media (min-width: 1024px){
    flex-direction: row;
  }
  border-radius: 5px;
  grid-column: 1 / -1;
  &:focus-within{
    border-color: #000;
  }
}
.video{
  width: 100%;
  @media (min-width: 1024px) {
    flex-grow: 1;
    flex-shrink: 1;
    width: 33%;
    max-width: 33%;
  }
  aspect-ratio: 16/9;
  > div {
    height: 100%
  }
}
.copy {
  overflow-y: auto;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  @media (min-width: 1024px){
    position: absolute;
    flex-grow: 2;
    flex-shrink: 2;
    width: 66%;
    right: 0;
    height: 100%;
  }
  &:focus{
    outline: none;
  }
  ol {
    padding : 0;
  }
  li {
    list-style: none;
  }
}
</style>
