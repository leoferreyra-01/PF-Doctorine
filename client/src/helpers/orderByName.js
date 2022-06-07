export function orderByNameAsc(budgets) {
  const orderedBudgets = [...budgets];
  return orderedBudgets.sort((a, b) => {
    if (a.patientFullName < b.patientFullName) return -1;
    if (a.patientFullName > b.patientFullName) return 1;
    return 0;
  });
}
export function orderByNameDes(budgets) {
  const orderedBudgets = [...budgets];
  return orderedBudgets.sort((a, b) => {
    if (a.patientFullName > b.patientFullName) return -1;
    if (a.patientFullName < b.patientFullName) return 1;
    return 0;
  });
}