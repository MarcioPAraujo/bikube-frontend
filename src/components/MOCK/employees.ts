const getEmployees = () => {
  const employees = [];

  for (let i = 1; i <= 113; i++) {
    employees.push({
      id: `${i}`,
      name: `John Kramer ${i}`,
      position: 'Engenheiro',
      sector: 'construção',
      duty: 'Planejamento residencial',
      joined: '1994-02-02',
    });
  }
  return employees;
};

export const employees = getEmployees();
