import { Price } from '../interfaces/price';

describe('Price Interface', () => {

  it('should create a valid Price object', () => {

    const price: Price = {
      id: 1,
      amount: 100,
      createdAt: '2026-01-01T10:00:00',
      updatedAt: '2026-01-01T10:00:00'
    };

    expect(price).toBeTruthy();
    expect(price.amount).toBe(100);

  });

});
