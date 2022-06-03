export function orderBudgetsByHigherPrice(budgets) {
  const orderedBudgets = budgets.sort((a, b) => {
    if (a.totalPrice > b.totalPrice) return -1;

    if (a.totalPrice < b.totalPrice) return 1;

    return 0;
  });
  return orderedBudgets;
}

export function orderBudgetsByLowerPrice(budgets) {
  const orderedBudgets = budgets.sort((a, b) => {
    if (a.totalPrice > b.totalPrice) return 1;

    if (a.totalPrice < b.totalPrice) return -1;

    return 0;
  });
  return orderedBudgets;
}
