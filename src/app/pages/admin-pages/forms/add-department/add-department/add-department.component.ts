import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  departmentForm: FormGroup;
  tableData:any;
  constructor(private fb: FormBuilder,private api:ServicesService,private router:Router) {

    this.api.getDepart().subscribe((successResponse)=>{
console.log(successResponse)
this.tableData = successResponse
    },((errorResponse)=>{
      console.log(errorResponse)
    }))
  }

  ngOnInit() {


    this.departmentForm = this.fb.group({
      departmentName: ['']
    });
  }

  onSubmit() {
    console.log(this.departmentForm.value);
    this.api.addDepartment(this.departmentForm.value).subscribe((successResponse)=>{
console.log(successResponse)
window.location.reload();
    },((errorResponse)=>{
      window.location.reload();
      alert("something went wrong")
      console.log(errorResponse)
    }))
    // Here you can call a service method to handle your CRUD operation
  }
  editData(id:any){
    console.log(id)
    this.router.navigate([`forms/update-department/${id}`])


    
  }

}
