interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: 'Dan',
  lastName: 'Iryivuze',
  age: 23,
  location: 'Toulouse',
};

const student2: Student = {
  firstName: 'Linka',
  lastName: 'Teta',
  age: 22,
  location: 'Barcelone',
};

const studentsList: Array<Student> = [student1, student2];

function renderTable(): void {
  const table = document.createElement('table');

  studentsList.forEach((student: Student) => {
    const row = document.createElement('tr');

    const cell1 = document.createElement('td');
    cell1.textContent = student.firstName;

    const cell2 = document.createElement('td');
    cell2.textContent = student.location;

    row.appendChild(cell1);
    row.appendChild(cell2);

    table.appendChild(row);
  });

  document.body.appendChild(table);
}

renderTable();
