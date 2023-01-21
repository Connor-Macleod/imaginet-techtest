import { createStore, createLogger } from 'vuex'
import recipes from './modules/recipes'
import favourites from "./modules/favourites";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        recipes,
        favourites
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
