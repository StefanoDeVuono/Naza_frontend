import Vue from 'vue'
import VueRouter from 'vue-router'
import HairColorSelector from '../customize/hair-color-selector.vue'
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

  it('renders the image', () => {
    expect(wrapper.html()).toMatch(/\/red\.png/)
  })
})
