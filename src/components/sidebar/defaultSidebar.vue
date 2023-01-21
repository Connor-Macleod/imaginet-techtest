<template>

  <div class="sidebar">
    <attribute-selector title="Category" :attributes="categories" @exclude="excludeCategory"/>
    <attribute-selector title="Area" :attributes="areas" @exclude="excludeArea" />
    <attribute-selector title="Tags" :attributes="tags" @exclude="excludeTag" />
  </div>
</template>

<script>
import AttributeSelector from "@/components/sidebar/attributeSelector.vue";

export default {
  name: "defaultSidebar",
  components: {AttributeSelector},
  computed: {
    categories() {
      return this.$store.state.recipes.currentCategories;
    },
    areas() {
      return this.$store.state.recipes.currentAreas;
    },
    tags() {
      return this.$store.state.recipes.currentTags;
    }
  },
  methods: {
    excludeCategory(category){
      this.$store.dispatch('recipes/excludeCategory', category)
    },
    excludeArea(area){
      this.$store.dispatch('recipes/excludeArea', area)
    },
    excludeTag(tag){
      this.$store.dispatch('recipes/excludeTag', tag)
    }
  }
}
</script>

<style lang="less" scoped>
  .sidebar{
    position: sticky;
    height: calc(100vh - 200px);
    width: 100%;
    overflow-y: auto;

    @media (min-width: 1023px){
      height: calc(100vh - 100px);
      width: 350px;
      order: -1;
    }
    top: 100px;
    background: #b7b7b7;
    flex-shrink: 0;
  }
</style>
