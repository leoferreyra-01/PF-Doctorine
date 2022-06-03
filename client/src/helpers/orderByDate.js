export default function orderBudgetsByRecentDate(budgets) {
  const orderedBudgets = budgets.sort((a, b) => {
    return new Date(b.creationDate) - new Date(a.creationDate);
  });
  return orderedBudgets;
}

export function orderBudgetsByOlderDate(budgets) {
  const orderedBudgets = budgets.sort((a, b) => {
    return new Date(a.creationDate) - new Date(b.creationDate);
  });
  return orderedBudgets;
}
