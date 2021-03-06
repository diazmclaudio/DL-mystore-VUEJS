import { shallowMount, createLocalVue } from '@vue/test-utils'
import Products from '@/components/Products.vue'
import Vuex from 'vuex'
import myStore from './mocks/store'

const local = createLocalVue()
local.use(Vuex)
const store = new Vuex.Store(myStore)

describe('QA Products', () => {

  it('Filtro por nombre de productos', () => {
    const productName = 'Café'
    const productSearch = 'Casa'
    const wrapper = shallowMount(Products, {
      local,
      Vuex
    })
    wrapper.setData({
      products: [
        { name: productSearch },
        { name: productName }
      ]
    })
    wrapper.find('input').setValue(productSearch)
    expect(wrapper.vm.search).toEqual(productSearch)

    expect(wrapper.vm.computedProductList).toEqual(         
      expect.arrayContaining([      
        expect.objectContaining({   
          name: productSearch               
        })
      ])
    )

    expect(wrapper.vm.computedProductList).toEqual(         
      expect.not.arrayContaining([      
        expect.objectContaining({   
          name: productName               
        })
      ])
    )
  }),

  it('agregar productos al carro de compras', () => {
    const producto = {
      name: 'Computadora',
      price: 100.0,
      qty: 1,
    }
    const wrapper = shallowMount(Products, {
      local,
      Vuex,
      store
    })
    wrapper.vm.addToCart(producto)
    expect(wrapper.vm.$store.getters.shoppingCart.list[0]).toEqual(producto)
  })

})