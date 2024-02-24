import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServicesService } from "src/app/services/services.service";
import { Subject, BehaviorSubject } from "rxjs";

@Component({
  selector: "app-all-employees",
  templateUrl: "./all-employees.component.html",
  styleUrls: ["./all-employees.component.scss"],
})
export class AllEmployeesComponent implements OnInit {
    response: any = new Subject();
    button:string = "Approved"
    public isLoading = new BehaviorSubject(true);
    constructor(private EmpService: ServicesService, private router: Router) {}

    getEmployees() {
      this.isLoading.next(true);
      this.EmpService.getAllEmployees().subscribe((res) => {
        console.log(res)
        
        this.isLoading.next(false);
        this.response.next(res);
      });
    }

    delEmployee(email: string) {
      const formFileData = new FormData();
      formFileData.append("PersonalInfo", JSON.stringify({ status: "Inactive" }));

      this.EmpService.deleteEmployee(email, formFileData).subscribe((res) => {
        this.getEmployees();
      });
    }

    // rejoinEmployee(email: string) {
    //   this.EmpService.rejoinEmployee(email).subscribe((res) => {
    //     this.getEmployees();
    //   });
    // }

    searchEmpByEmail(email: any): void {
      this.isLoading.next(true);
      if (email) {
        this.EmpService.searchEmployeeByEmail(email).subscribe((res) => {
          let responseArray = [res];
          this.isLoading.next(false);
          this.response.next(responseArray);
        });
      } else {
        this.getEmployees();
      }
    }

    navigate(id: number): void {
      this.router.navigate([`employee-details/${id}`]);
    }

    ngOnInit(): void {
      this.getEmployees();
    }
}

