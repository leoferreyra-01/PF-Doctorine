export default function orderBudgetsByDate(budgets) {
  const orderedBudgets = budgets.sort((a, b) => {
    return new Date(b.creationDate) - new Date(a.creationDate);
  });
  return orderedBudgets;
}
