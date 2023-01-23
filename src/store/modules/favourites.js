// initial state
const state = () => ({
    favourites: [],
})

// getters
const getters = {
}

// actions
const actions = {
    async getFavourites({commit}) {
        // we're fetching these from local storage on load. but this function could easily be modified to get favourites
        // from an API or other source
        const favourites = JSON.parse(window.localStorage.getItem('favourites'))
        if (!favourites) return

        commit('setFavourites', favourites)
    },
    addFavourite({state, commit, rootState}, favourite){
        const favourites = [...state.favourites]

        // we won't add duplicates. as sets don't handle more complex objects nicely, we have to handle that manually
        if (favourites.find(thisFavourite=>thisFavourite.id === favourite.id)) return
        const term = rootState.recipes.searchTerm || ""

        favourites.push({term, ...favourite })

        window.localStorage.setItem('favourites', JSON.stringify(favourites))
        commit('setFavourites', favourites)

    },
    removeFavourite({state, commit}, id){
        const favourites = [...state.favourites]

        const removalIndex = favourites.findIndex(thisFavourite=>thisFavourite.id === id)

        if (removalIndex===-1) return
        favourites.splice(removalIndex, 1)

        window.localStorage.setItem('favourites', JSON.stringify(favourites))
        commit('setFavourites', favourites)

    }
}

// mutations
const mutations = {
    setFavourites(state, favourites) {
        state.favourites = favourites
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
