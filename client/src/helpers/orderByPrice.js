export function orderBudgetsByHigherPrice(budgets) {
  const orderedBudgets = [...budgets];
  return orderedBudgets.sort((a, b) => {
    if (a.totalPrice > b.totalPrice) return -1;
    if (a.totalPrice < b.totalPrice) return 1;
    return 0;
  });
}
export function orderBudgetsByLowerPrice(budgets) {
  const orderedBudgets = [...budgets];
  return orderedBudgets.sort((a, b) => {
    if (a.totalPrice > b.totalPrice) return 1;
    if (a.totalPrice < b.totalPrice) return -1;
    return 0;
  });
}