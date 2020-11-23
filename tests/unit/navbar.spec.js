import { shallowMount, createLocalVue } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import Vuex from 'vuex'
import myStore from './mocks/store'
import VueRouter from 'vue-router'
import myRoutes from "./mocks/routes"

const local = createLocalVue()
local.use(Vuex)
const store = new Vuex.Store(myStore)
local.use(VueRouter)
const router = new VueRouter(myRoutes)

describe('QA Navbar', () => {

    it('muestra login si no se ha iniciado sesión', () => {
        store.dispatch('updateUser', undefined)
        const wrapper = shallowMount(Navbar, {
          propsData: {
            title: "Mi Tienda"
          },
          local,
          store,
          router,
        })
        expect(wrapper.text()).toContain('Login')
      }),

    it('inicio de sesión con visualización de usuario', () => {
        store.dispatch('updateUser', { email: 'user@mystore.com' })
        const wrapper = shallowMount(Navbar, {
            propsData: {
                title: "Mi Tienda"
            },
            local,
            store,
            router
        })
        expect(wrapper.text()).toContain('Usuario')
        expect(wrapper.text()).not.toContain('Login')
    })

})