import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private router:Router,private api:ServicesService) { }

  ngOnInit(): void {
    console.log(this.api.projectName)
  }


  navigateToPersonal(){
    this.router.navigate(['/personal'])
  }
  get_payroll(){
    console.log('get_payroll');
    this.router.navigate(['/emp_payroll']);
  }

  get_Leave_Module(){
    console.log("Entering leave")
    this.router.navigate(['/leave-module']);
  }
  get_Attendance(){
    console.log('getAttendance')
    this.router.navigate(['/time-off'])

  }
  getLeaveForm(){
    console.log("akdfjkh")
    this.router.navigate(['/form-to-fill/leaveform']);
  }
  // navigate_to_leave_form(){
  //   console.log("djhfkjadhj")
  //   this.router.navigate(['/form-to-fill/leaveform'])

  // }

}
