function getTopPerformers(employees, criteria) {
    return employees
      .filter(employee => 
        employee.department === criteria.department &&
        employee.performanceRating >= criteria.minPerformance &&
        employee.yearsOfExperience >= criteria.minExperience &&
        employee.salary <= criteria.maxSalary
      )
      .sort((a, b) => {
        if (b.performanceRating !== a.performanceRating) {
          return b.performanceRating - a.performanceRating;
        }
        return a.salary - b.salary;
      });
  }
  
  const employees = [
    { id: 1, name: "Mike", department: "Sales", salary: 65000, yearsOfExperience: 5, performanceRating: 85 },
    { id: 2, name: "Bob", department: "Sales", salary: 65000, yearsOfExperience: 4, performanceRating: 92 },
    { id: 3, name: "Ashley", department: "HR", salary: 72000, yearsOfExperience: 6, performanceRating: 88 },
    { id: 4, name: "David", department: "Sales", salary: 75000, yearsOfExperience: 3, performanceRating: 78 },
    { id: 5, name: "Eve", department: "Sales", salary: 75000, yearsOfExperience: 3, performanceRating: 85 }
  ];
  
  const criteria = {
    department: "Sales",
    minPerformance: 80,
    minExperience: 3,
    maxSalary: 70000
  };
  
  console.log(getTopPerformers(employees, criteria));
  