import Vue from 'vue'
import VueRouter from 'vue-router'
import Content from '../components/content.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Storage from 'common/storage'

describe('Content', () => {
  let wrapper
  let routerMock

  beforeEach(() => {
    Storage.reset()
    const localVue = createLocalVue()
    routerMock = {
      go: jest.fn(),
    }

    wrapper = shallowMount(Content, {
      slots: {
        default: ['hello world'],
      },
      propsData: {
        progressStep: 3,
      },
      localVue,
      mocks: {
        $router: routerMock,
      },
    })
  })

  it('renders the slotted component', () => {
    expect(wrapper.html()).toMatch(/hello world/)
  })

  it('navigates back when pressing a previous step', () => {
    wrapper.vm.step = 1
    expect(routerMock.go).toHaveBeenCalledWith(-2)
  })
})
