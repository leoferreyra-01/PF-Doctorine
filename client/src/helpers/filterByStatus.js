export function filterCompletedBudgets(budgets) {
  const completedBudgets = budgets.filter(budget => budget.paid === true);
  return completedBudgets;
}

export function filterPendingBudgets(budgets) {
  const pendingBudgets = budgets.filter(budget => budget.paid === false);
  return pendingBudgets;
}
