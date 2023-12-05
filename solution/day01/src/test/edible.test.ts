import { addDays, subDays } from 'date-fns';

import { Food } from '../Food';

describe('Edible food', () => {
  const expirationDate = new Date(2023, 11, 1);
  const inspector = '118cb83e-fab6-4f0c-9a5d-fc5a039b2f87';
  const notFreshDate = addDays(expirationDate, 7);
  const freshDate = subDays(expirationDate, 7);

  it('food is edible when fresh', () => {
    const food = new Food(
      expirationDate,
      true,
      inspector
    );

    expect(food.isEdible(freshDate)).toBeTruthy();
  });

  const notEdibleFood: [boolean, string | null, Date][] = [
    [true, inspector, notFreshDate],
    [false, inspector, freshDate],
    [true, null, freshDate],
    [false, null, notFreshDate],
    [false, null, freshDate],
  ];

  it.each(notEdibleFood)(
    'food is not edible when not fresh',
    (approvedForConsumption, inspectorId, now) => {
      const food = new Food(
        expirationDate,
        approvedForConsumption,
        inspectorId
      );

      expect(food.isEdible(now)).toBeFalsy();
    }
  );
});
