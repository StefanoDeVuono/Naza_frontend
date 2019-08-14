import Vue from 'vue'
import fetchResponse from './categories.fetchResponse.json'
import Categories from './categories.vue'

const mockFetchResponse = returnObj => {
  console.log('fetch response', fetchResponse)
  global.fetch = () => {
    return Promise.resolve(JSON.stringify(fetchResponse))
  }
}

describe('Categories', () => {
  let oldFetch

  beforeEach(() => {
    oldFetch = global.fetch
    mockFetchResponse()
  })

  afterEach(() => {
    global.fetch = oldFetch
  })

  it('initializes the categories', () => {
    const component = new Vue(Categories)
    component.$mount()
    expect(component.categories).toHaveLength(1)
  })
})
