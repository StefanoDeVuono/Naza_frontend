global.Stripe = jest.fn().mockReturnValue({
  handleCardSetup: jest.fn(),
  elements: jest.fn(),
})