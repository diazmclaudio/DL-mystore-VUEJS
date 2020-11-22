import { shallowMount, createLocalVue } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import Vuex from 'vuex'
import myStore from './mocks/store'
import VueRouter from 'vue-router'
import myRoutes from "./mocks/routes"

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(myStore)
localVue.use(VueRouter)
const router = new VueRouter(myRoutes)

describe('Test Navbar', () => {

    it('Aparece login si no inició sesión', () => {
        store.dispatch('updateUser', undefined)
        const wrapper = shallowMount(Navbar, {
          propsData: {
            title: "Mi Tienda"
          },
          localVue,
          store,
          router,
        })
        expect(wrapper.text()).toContain('Login')
      }),

    it('Muestra usuario si inicia sesión', () => {
        store.dispatch('updateUser', { email: 'user@mystore.com' })
        const wrapper = shallowMount(Navbar, {
            propsData: {
                title: "Mi Tienda"
            },
            localVue,
            store,
            router
        })
        expect(wrapper.text()).toContain('Usuario')
        expect(wrapper.text()).not.toContain('Login')
    })

})