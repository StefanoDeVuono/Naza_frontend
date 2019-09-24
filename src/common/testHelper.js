let oldFetch

export const mockFetch = (returnObj, status=200) => {
  const fetchResponse = {
    status: status,
    json: jest.fn(() => Promise.resolve(returnObj)),
  }
  oldFetch = global.fetch
  global.fetch = () => Promise.resolve(fetchResponse)
}

export const restoreFetch = () => {
  global.fetch = oldFetch
  oldFetch = undefined
}
