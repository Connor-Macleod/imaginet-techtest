<template>
  <div>
    <default-header />
    <div class="content">
      <index/>
      <default-sidebar />
    </div>
  </div>
</template>

<script>
import DefaultHeader from "@/components/header/defaultHeader.vue";
import DefaultSidebar from "@/components/sidebar/defaultSidebar.vue";
import Index from "@/components/recipeGrid/recipeGrid.vue";

export default {
  name: 'App',
  components: {
    Index,
    DefaultSidebar,
    DefaultHeader
  }
}
</script>

<style lang="less">
body {
  margin: 0;
  font-family: Sans-Serif;
}
.content {
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px){
    flex-direction: row;
  }
}

img {
  max-width: 100%;
}
</style>
