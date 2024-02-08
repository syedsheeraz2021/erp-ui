import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {
get_employee_Id:any;
inchargeInfo:any;
tableData:any
  myForm: FormGroup;
  ngOnInit(): void {

    this.service.getAllLocation().subscribe((successResponse)=>{
console.log(successResponse)
this.tableData=successResponse
    },((errorResponse)=>{
      console.log(errorResponse)
      alert("Something went wrong")
    }))
    this.myForm = this.fb.group({
      concernedAuthorityEmpId: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      inchargeInfo: [this.inchargeInfo, Validators.required],
      country: ['', Validators.required],
      isMaintenanceRequired:[null],
      commentsForMaintenance:[null],
    });
    
  }

  constructor(private fb: FormBuilder,private service:ServicesService,private router:Router) {
    this.service.getAllEmployees().subscribe((successResponse:any)=>{
      console.log(successResponse)
      this.get_employee_Id=successResponse

    })
   
  }


  find_name(event:any){
    console.log(event.target.value)
     const id:any=event.target.value;
     console.log(id)
     console.log(this.get_employee_Id)
     const employee:any = this.get_employee_Id.filter((idx) => idx.employeeId == id);
// const email = employee ? employee.email : null;
console.log(employee[0]?.firstName + " " + employee[0]?.middleName + " " + employee[0]?.lastName )
this.inchargeInfo=employee[0]?.firstName + " " + employee[0]?.middleName + " " + employee[0]?.lastName
// console.log();


    //  this.service.personalInfo(id).subscribe(successResponse =>{
    //   console.log(successResponse)
    //  })

  }

  onSubmit() {
    console.log(this.myForm.value);
    let formData={
      concernedAuthorityEmpId:this.myForm.value.concernedAuthorityEmpId,
      name:this.myForm.value.name,
      address:this.myForm.value.address,
      latitude:this.myForm.value.latitude,
      longitude:this.myForm.value.longitude,
      country:this.myForm.value.country,
      inchargeInfo:this.inchargeInfo,
      isMaintenanceRequired:this.myForm.value.isMaintenanceRequired,
      commentsForMaintenance:this.myForm.value.commentsForMaintenance
}
console.log(formData);
    // this.service.add_location(formData).subscribe((successResponse) => {
    //   console.log(successResponse)
    // })

    this.service.add_location(formData).subscribe({
      next: (successResponse) => {
        alert(successResponse);
        console.log(successResponse)
        // Redirect to another page
        this.router.navigate(['/user-profile']); // Replace with your path
      },
      error: (errorResponse) => {
        console.error(errorResponse);
        // Handle error, possibly show an error message to the user
        // You might use Angular's built-in error handling or a custom service
      }
    });
  }

  editData(id:any){
    console.log(id)
    this.router.navigate([`forms/update-location/${id}`])

  }
  }


