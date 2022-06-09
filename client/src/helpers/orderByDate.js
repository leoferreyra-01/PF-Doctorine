export default function orderBudgetsByRecentDate(budgets) {
  const orderedBudgets = [...budgets];
  return orderedBudgets.sort((a, b) => {
    return new Date(b.creationDate) - new Date(a.creationDate);
  });
}
export function orderBudgetsByOlderDate(budgets) {
  const orderedBudgets = [...budgets];
  return orderedBudgets.sort((a, b) => {
    return new Date(a.creationDate) - new Date(b.creationDate);
  });
}