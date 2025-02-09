import Vue from 'vue'
import { createInertiaApp } from '@inertiajs/vue2'

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./pages/**/*.vue')
        return pages[`./pages/${name}.vue`]()
    },
    setup({ el, App, props, plugin }) {
        Vue.use(plugin)
        Vue.mixin({ methods: { route } })

        new Vue({
            render: h => h(App, props),
        }).$mount(el)
    },
})
