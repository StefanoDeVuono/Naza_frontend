import Vue from 'vue'
import VueRouter from 'vue-router'
import HairColorSelector from '../hair-color-selector.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'

describe('HairColorSelector', () => {
  let wrapper
  let handlePress

  beforeEach(() => {
    handlePress = jest.fn()
    const localVue = createLocalVue()
    wrapper = shallowMount(HairColorSelector, {
      propsData: {
        colors: [
          { presentation: 'red' },
          { presentation: 'blue' },
          { presentation: 'green' },
        ],
        selectedColor: 'blue',
        onPress: handlePress,
      },
      localVue,
    })
  })

  it('shows the selected color', () => {
    expect(wrapper.text()).toMatch(/Your Choice: blue/)
  })

  it('renders the image', () => {
    expect(wrapper.html()).toMatch(/assets\/hair-colors\/red\.jpeg/)
  })
})
