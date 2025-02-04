interface DirectorInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
}

interface TeacherInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
}

class Director implements DirectorInterface {
  workFromHome() {
    return 'Working from home';
  }

  getCoffeeBreak() {
    return 'Getting a coffee break';
  }

  workDirectorTasks() {
    return 'Getting to director tasks';
  }
}

class Teacher implements TeacherInterface {
  workFromHome() {
    return 'Cannot work from home';
  }
  
  getCoffeeBreak() {
    return 'Cannot have a break';
  }
  
  workTeacherTasks() {
    return 'Getting to work';
  }
}

function createEmployee(salary: number | string): Director | Teacher {
  if (typeof salary === 'number' && salary < 500) return new Teacher;

  return new Director;
}

function isDirector(employee: Director | Teacher): boolean {
  return employee instanceof Director;
}

function executeWork(employee: Director | Teacher): void {
  if (isDirector(employee)) {
    let director = employee as Director;
    console.log(director.workDirectorTasks());
  } else {
    let teacher = employee as Teacher;
    console.log(teacher.workTeacherTasks());
  }
}

type Subjects = 'Math' | 'History';

function teachClass(todayClass: Subjects): string {
  if (todayClass === 'Math') return 'Teaching Math';
  if (todayClass === 'History') return 'Teaching History';
}
