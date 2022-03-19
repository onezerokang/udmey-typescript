// 이 클래스의 문제는 employees를 외부에서 변경할 수 있다는 것.

class Department {
  static fiscalYear = 2020;
  protected employees: string[] = [];
  constructor(public readonly id: string, private name: string) {}

  describe(this: Department) {
    console.log(`Department (${this.id}: ${this.name})`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  // 이렇게 하면 private한 속성을 점 연선자로 접근할 수 없지만
  // getter를 사용해서 가져올 수 있다.
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  addEmployee(name: string): void {
    if (name === "Max") {
      return;
    }

    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment("0", ["Max"]);
const accounting = new AccountingDepartment("0", []);

accounting.mostRecentReport = "Your End Report";
accounting.addReport("Something went wrong...");
console.log(accounting.mostRecentReport);
accounting.addEmployee("Manu");
accounting.printEmployeeInformation();
accounting.printReports();

it.describe();
console.log(it);
