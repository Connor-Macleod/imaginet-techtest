// initial state
const state = () => ({
    recipes: [],
    currentTags: [],
    currentAreas: [],
    currentCategories: [],
    searchTerm: "Soup",
    selected: null
})

// getters
const getters = {}

// actions
const actions = {
    async getRecipes({commit, state}) {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php${state.searchTerm?`?s=${state.searchTerm}`:''}`)
        const resJson = await res.json()

        commit('resetCategories')
        commit('resetTags')
        commit('resetAreas')

        const recipes = resJson.meals.map((meal) => {
            //we want a saner structure for the recipe, so let's do some restructuring to make it easier to use down the line
            meal.ingredients = []
            for (let i = 20; i--;) { // we use a decrementing for loop, as they're faster. really not an issue here, but they're also quicker to write
                const ingredient = meal[`strIngredient${i + 1}`]
                const measure = meal[`strMeasure${i + 1}`]
                if (ingredient) {
                    meal.ingredients[i] = {ingredient, measure}
                }
                // we don't need to keep the keys once we've transformed them into a more usable format
                delete meal[`strIngredient${i + 1}`]
                delete meal[`strMeasure${i + 1}`]
            }
            commit('addCategories', meal.strCategory?.split(','))
            commit('addAreas', meal.strArea?.split(','))
            commit('addTags', meal.strTags?.split(','))

            return meal
        })
        commit('setRecipes', recipes)
    },
    updateSearch({dispatch, commit}, term){
        commit('setSearchTerm', term);
        dispatch('getRecipes');
    },

    // these actions are provided as it's not expected for other code to need to know what the objects holding the
    // attribute type is called, so these abstract that away
    excludeCategory({commit}, category) {
        commit('excludeAttribute', {
            attributeType: 'currentCategories',
            mealKey: 'strCategory',
            attributeValue: category
        })
    },
    excludeArea({commit}, area) {
        commit('excludeAttribute', {
            attributeType: 'currentAreas',
            mealKey: 'strArea',
            attributeValue: area
        })
    },
    excludeTag({commit}, tag) {
        commit('excludeAttribute', {
            attributeType: 'currentTags',
            mealKey: 'strTags',
            attributeValue: tag
        })
    }
}

// mutations
const mutations = {
    setRecipes(state, recipes) {
        state.recipes = recipes
    },
    selectRecipe(state, recipeId){
        if (state.selected === recipeId) state.selected = null
        else state.selected = recipeId
    },

    // using sets like this isn't the most efficient, but it is sure much easier to handle duplicates
    addCategories(state, categories = []) {
        const allCats = new Set(state.currentCategories)
        categories.forEach(cat => allCats.add(cat.trim()))
        state.currentCategories = Array.from(allCats)
    },
    addAreas(state, areas = []) {
        const allAreas = new Set(state.currentAreas)
        areas.forEach(area => allAreas.add(area.trim()))
        state.currentAreas = Array.from(allAreas)
    },
    addTags(state, tags = []) {
        const allTags = new Set(state.currentTags)
        tags.forEach(tag => allTags.add(tag.trim()))
        state.currentTags = Array.from(allTags)
    },

    resetCategories(state) {
        state.currentCategories = []
    },
    resetAreas(state) {
        state.currentAreas = []
    },
    resetTags(state) {
        state.currentTags = []
    },
    setSearchTerm(state, term){
        state.searchTerm = term
    },
    excludeAttribute(state, {attributeType, attributeValue, mealKey}){
        const recipes = [...state.recipes]
        const attributes = [...state[attributeType]]

        const catRegExp = new RegExp(attributeValue)
        state.recipes = recipes.filter((meal)=>!catRegExp.test(meal[mealKey]))
        state[attributeType] = attributes.filter((attr)=> attr !== attributeValue)

    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
