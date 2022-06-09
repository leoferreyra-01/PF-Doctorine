export default function getAllPatientsName(budgets, allPatients) {
  const allBudgetsName = budgets.map(budget => {
    const patient = allPatients.find(p => p.Patient.ID === budget.PatientID);
    return {
      ...budget,
      patientFullName: patient.fullName,
      patientDocument: patient.document,
    };
  });
  return allBudgetsName;
}