let oldFetch

export const mockFetch = (returnObj, status = 200) => {
  let fetchResponse

  // Mock JSON parse error
  if (typeof returnObj === 'object') {
    fetchResponse = jest.fn().mockResolvedValue({
      status: status,
      json: jest.fn().mockResolvedValue(returnObj),
    })
  } else {
    fetchResponse = jest.fn().mockResolvedValue({
      status: status,
      json: jest.fn().mockRejectedValue({}),
    })
  }

  oldFetch = global.fetch
  global.fetch = fetchResponse
}

export const restoreFetch = () => {
  global.fetch = oldFetch
  oldFetch = undefined
}
