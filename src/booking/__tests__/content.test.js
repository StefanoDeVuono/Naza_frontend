import Vue from 'vue'
import VueRouter from 'vue-router'
import Content from '../components/content.vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Storage from 'common/storage'

describe('Content', () => {
  let wrapper
  let routerMock
  let localVue

  beforeEach(() => {
    Storage.reset()
    localVue = createLocalVue()
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

  it('shows the correct disabled steps', () => {
    wrapper = mount(Content, {
      slots: {
        default: ['hello world'],
      },
      propsData: {
        progressStep: 1,
      },
      localVue,
      mocks: {
        $router: routerMock,
      },
      stubs: ['router-link']
    })

    const step1 = wrapper.findAll('.v-step').at(0);
    const step2 = wrapper.findAll('.v-step').at(1);
    const step3 = wrapper.findAll('.v-step').at(2);
    const step4 = wrapper.findAll('.v-step').at(3);
    const step5 = wrapper.findAll('.v-step').at(4);

    expect(step1.props().disabled).toEqual(false)
    expect(step2.props().disabled).toEqual(true)
    expect(step3.props().disabled).toEqual(true)
    expect(step4.props().disabled).toEqual(true)
    expect(step5.props().disabled).toEqual(true)
  })
})
