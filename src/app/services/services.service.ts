import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  public url = environment.hostUrlNgrock; // main url
  public role: string;
  public designationId:any;
  public expiry_time:any;


  public projectName:string="Swift Biz";

  constructor(private http: HttpClient, private router: Router) {}

  // ================== AUTH_PAGES SERVICES ==================

  // FOR REGISTER
  public register(data: any) {
    data = {
      ...data,
      role: ["employee"],
    };
    console.log(data);
    return this.http.post(
      environment.hostUrlNgrock + "/api/auth/v1/signup",
      data
    );
  }

  // FOR LOGIN
  public login(data: any) {
    // console.log(dtaa)
    // console.log(data);
    // return this.http.post(environment.hostUrlNgrock + "/signin", data);
    return this.http.post(
      environment.hostUrlNgrock +"/api/auth/v1/signin",
      data
   );
  }





  // FOR LOGOUT
  public logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("designationId");
    localStorage.removeItem("expieryTime");
    localStorage.removeItem("currentDesignationAndTask");

    this.router.navigate(["/login"]);
  }


  public getDynamicRoutes(data: any){
    return this.http.get(this.url +data)
  }

  // ------------- FORGOT PASSWORD 3 STEP PROCESS SERVICES ------------------

  //for verify  the user through otp 
public verify_employee_otp(data:any){
  return this.http.post(
    `${environment.hostUrlNgrock}/api/auth/activate`,data

  )
}

public save_password(data:any){
  return this.http.post(
    `${environment.hostUrlNgrock}/api/auth/save-password`,data
  )
}




  // FOR FORGOT PASSWORD
  public forgot_password(data: any) {
    // return this.http.post(this.url + "send-otp", data);
    return this.http.post(environment.hostUrlNgrock + "/api/auth/send-otp", data);
  }

  // FOR OTP VERIFICATION
  public otp_verification(data: any) {
    return this.http.post(
      environment.hostUrlNgrock + "/api/auth/verifyotp",
      data
    );
  }

  // FOR CHANGE PASSWORD
  public new_pass_set(data: any) {
    return this.http.put(
      environment.hostUrlNgrock + "/api/auth/new-password",
      data
    );
  }

  // ---------- TOKEN AND ROLE SET AND GET SERVICES --------------------

  // CHECK TOKEN IN LOCALSTORAGE (set or not)
  public tokenChecker() {
    return !!localStorage.getItem("token"); // return true or false
  }

  // GET TOKEN IF SET
  public getToken() {
    let token = localStorage.getItem("token");
    return localStorage.getItem("token");
  }

  // GET ROLE OF USER
  public getRole() {
    if (!!localStorage.getItem("role")) {
      return localStorage.getItem("role");
    }
    return this.role;
  }

  // SET ROLE OF USER
  public setRole(role: string) {
    this.role = role;
    console.log(this.role)
    localStorage.setItem("role", role);
  }


  public getExpiryTime(){

    if (!!localStorage.getItem("expieryTime")) {
      // console.log(expiry)
      this.expiry_time=localStorage.getItem("expieryTime")
      // console.log(this.expiry_time)
      return localStorage.getItem("expieryTime");
    }
   
    return localStorage.getItem("expieryTime")
  }

  


  public get_designationId(){
    if (!!localStorage.getItem("designationId")) {
      return localStorage.getItem("designationId");
    }
    

  }

  public get_currentDesignationAndTask(){
    if (!!localStorage.getItem("currentDesignationAndTask")) {
      return localStorage.getItem("currentDesignationAndTask");
    }
  }


public get_dynamic_sidebar(id:any){
  return this.http.get(this.url+"/getDutiesByDesignationId/"+id);
}
//method for getting leave calender 

public get_leave_calender(){
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '69420'
    });
  return this.http.get(this.url+"/api/v1/leave-calendar",{headers})

}

//get designation by level id 
public getDesignationByLevelId(id:any){
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '69420'
    });
  return this.http.get(this.url+"/getDesignationsByLevelId/"+id,{headers})

}

//get designation destId
public getDesignationByDestignationId(id:any){
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '69420'
    });
  return this.http.get(this.url+"/getDesignations/"+id,{headers})

}


//method for adding job levels 
public addJobLevel(data:any){
  console.log(data)
  const baseurl=this.url+`/saveJobLevel?levelName=${data}`
  return this.http.post(baseurl,null)

}


//METHOD FOR ADDING ADDITIONAL TASK 

public add_additional_task(data:any){
  return this.http.post(this.url+"/api/v1/save_designationTask",data,{ responseType: 'text' })
}

//get All employee of task how assign  by taskId
 
public getEmployeeByTaskId(id:any){
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '69420'
    });
  return this.http.get( environment.hostUrlNgrock+"/api/v1/findAllEmpByTaskId/"+id,{headers})
}


//update mena end the additional task 

public endTheAdditionalTask(data:any){
  return this.http.put( environment.hostUrlNgrock+`/api/v1/end_task`,data)
}






  // ----------------------------------------------------------
  // ================== ADMIN_PAGES SERVICES ==================

  // not implemented
  public dashboard() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    // console.log("dashboard services");
    // return this.http.get(environment.hostUrl + "dashboard");
    return this.http.get(environment.hostUrlNgrock + "/api/v1/dashboard",{headers}
    //  {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }
    );
  }

  //getting all departnment
  
  public getDepart(){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get( environment.hostUrlNgrock+"/api/v1/all/departments",{headers})
  }

  //get department by departmentId
  public getDepartByDepartmentId(id:any){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get( environment.hostUrlNgrock+"/api/v1/departmentId/"+id,{headers})
  }

  

// add department
public addDepartment(data:any){
  console.log(data)
  return this.http.post(environment.hostUrlNgrock+`/api/v1/save/department`,data)
}

  //update the department


  public upadteDepartment(id:any,data:any){
    console.log(id,data)
    return this.http.put(environment.hostUrlNgrock+`/api/v1/update/department/by/id/${id}`,data)
  }

  //  holidays
  addHolidays(data:any){
    return this.http.post(environment.hostUrlNgrock+ "/api/v1/calendar/add-holiday",data)
  }



  public getAllHolidays(){

  }

  // ONBOARDING NEW EMPOYEE
  public addPost(formData: any) {
    console.log(formData)
    // return this.http.post(this.url + "/personal-info", formData);
    return this.http.post(
      environment.hostUrlNgrock + "/api/v1/personal-info",
      formData
    );
  }
  // ONBOARDING Updating NEW EMPOYEE
  public updatePost(formData: any,email:string) {
    return this.http.put(
      environment.hostUrlNgrock + `/api/v1/personal-info/update/email/${email}`,
      formData
    );
  }

  //update designation


  updateDesignationLevel(data: any) {
    // Create HttpHeaders
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(environment.hostUrlNgrock + `/updateDesignation`, data, { headers });
  }


  //get additional task  by emp id 
  public getAdditionalTaskByemp_id(ID: any) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(
      `${environment.hostUrlNgrock}/api/v1/getActive_designationTask/${ID}`,{headers}
    );
  }

//update leave approver 

public update_leave_approver(id:any,data:any){
  return this.http.put(`${environment.hostUrlNgrock}/api/v1/leave/approver/${id}`,data)
}

  // ONBOARDING GET ALL EMPLOYEES
  public getAllEmployees() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(
      environment.hostUrlNgrock + "/api/v1/personal-info/find/all",{headers}
    );



  }


  //get All Active Employeee
  public getAllActiveEmployee() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(
      environment.hostUrlNgrock + "/api/v1/find-all/personal-info/active",{headers}
    );



  }


  
  // ONBOARDING GET EMPLOYEE BY EMAIL
  public searchEmployeeByEmail(email: any) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(
      `${environment.hostUrlNgrock}/api/v1/personal-info/email/${email}`,{headers}
    );
  }
  // ONBOARDING GET EMPLOYEE BY ID
  public searchEmployeeById(ID: any) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(
      `${environment.hostUrlNgrock}/api/v1/personal-info/employeeId/${ID}`,{headers}
    );
  }

  //get All Location
  public getAllLocation() {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(
      `${environment.hostUrlNgrock}/api/v1/find/all/locations`,{headers}
    );
  } 

  // get location by location Id
  public getLocationByLocationById(id:any) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(
      `${environment.hostUrlNgrock}/api/v1/location/id/${id}`,{headers}
    );
  }

  //update location

  public updateLocation(id:any,data:any){
    return this.http.put(`${environment.hostUrlNgrock}/api/v1/location/update/${id}`,data)

  }
  


  //Add Approver 

  public add_approver(data:any){
    return this.http.post(`${environment.hostUrlNgrock}/api/v1/leaveApprovers`,data,{ responseType: 'text' })
  }


  //add shift 
  public addShift(data:any){
    return this.http.post(`${environment.hostUrlNgrock}/save-shift`,data)
  }



//method for getting all shift 

public getAllShift(){
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '69420'
    });
  return this.http.get( environment.hostUrlNgrock+"/get-Allshift",{headers})
}



  // ONBOARDING DELETE EMPLOYEE
  public deleteEmployee(email: string, FormData) {
    return this.http.put(
      `${environment.hostUrlNgrock}/api/v1/personal-info/delete/${email}`,
      FormData
    );
  }



  //add leave type
  public addLeaveType(formData: any) {
    console.log(formData)
    // return this.http.post(this.url + "/personal-info", formData);
    return this.http.post(
      environment.hostUrlNgrock + "/api/v1/leave/type",
      formData
    );
  }



  //ADD LOCATION 


  public add_location(data:any){
    return this.http.post(environment.hostUrlNgrock + "/api/v1/location", data)

  }
  


// GET all job levels 


public get_all__job_levels(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    })
  };
  return this.http.get(environment.hostUrlNgrock + "/getAllJobLevel",httpOptions)
}

//method for get all hioliday
public get_all_holidays(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    })
  };
  return this.http.get(environment.hostUrlNgrock + "/api/v1/calendar/holidays",httpOptions)
}


// method for getting particular  employee with leave  reason 
public get_employee_with_leaveReason(empId:number,year:number,month:number,country:string){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    })
  };
  return this.http.get(environment.hostUrlNgrock + `/api/v1/total/leaves/in-month/${empId}/${year}/${month}/${country}`,httpOptions)
}
// method for getting particular  employee with leave  reason 
public get_employee_with_leaveDetails_year(empId:number,year:number,country:string){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    })
  };
  return this.http.get(environment.hostUrlNgrock + `/api/v1/total/leaves/in-year/${empId}/${year}/${country}`,httpOptions)
}
//get all employees leave details by date 
public get_employees_with_leaveDetails_by_date(date:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    })
  };
  return this.http.get(environment.hostUrlNgrock + `/api/v1/by-date/${date}`,httpOptions)
}
public get_all_designation(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    })
  };
  return this.http.get(environment.hostUrlNgrock + "/getAllDesignations",httpOptions)
}



public add_duties(data:any){
  return this.http.post(environment.hostUrlNgrock + "/saveduties",data)

}

public get_all_duties(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    })
  };
  return this.http.get(environment.hostUrlNgrock + "/loadAllDuties",httpOptions)
}


//add sub duties


public add_sub_duties(data:any){
  return this.http.post(environment.hostUrlNgrock +"/save_subduties",data)
}


public get_all_sub_duties(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    })
  };
  return this.http.get(environment.hostUrlNgrock + "/getAllSubDuties",httpOptions)
}
public get_all_task(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420'
    })
  };
  return this.http.get(environment.hostUrlNgrock + "/getAllTask",httpOptions)
}

public add_task(data:any){
  return this.http.post(environment.hostUrlNgrock +"/save_task",data)
}





  // ONBOARDING EMPLOYEE REJOIN //! not meant to be implemented
  // public rejoinEmployee(email: string) {
  //   return this.http.put(
  //     `${environment.hostUrlNgrock}/api/v1/personal-info/rejoin/${email}`,
  //     {}
  //   );
  // }

  // ----------------------------------------------------------
  // ================== EMPLOYEE_PAGES SERVICES ==================

  // FOR TIME AND ATTENDANCE (not implemeenvironment./ FOR TIME AND ATTENDANCE (not implemented)
  public punchIn(data:any) {
    // let empId = 1001;
    // punch-In-Time
    return this.http.post(`${this.url}/punch-In-Time`,data);
  }

  public checkedpunch(data1:any,data2:any){
    // console.log(data)
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(
      `${environment.hostUrlNgrock}/checkAttendance/${data2}/${data1}`,{headers}
    );
  }

  public getAttendanceByDate(data1: any, data2: any, data3: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      })
    };
  
    // Assuming environment.hostUrlNgrock is correctly defined in your environment file
    return this.http.get(
      `${environment.hostUrlNgrock}/get-attendence-byDate/${data3}/${data1}/${data2}`, 
      httpOptions
    );
  }

  public getAttedanceByMonth(id:any,year:any,month:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      })
    };
    return  this.http.get(
      `${environment.hostUrlNgrock}/get-attendence-byMonth/${id}/${year}/${month}`,
      httpOptions
    )


  }


  public getAllEmployeeOverTimeReq(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      })
    };

    return (
      this.http.get(
        `${environment.hostUrlNgrock}/get-OvertimeRequest`,httpOptions
      )
    )
    
  }


  public getAttendanceByAttendanceById(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      })
    };
    return (
      this.http.get(
        `${environment.hostUrlNgrock}/attendance/${id}`,httpOptions
      )
    )

  }


  public getupdateOverTime(data:any){
    return (
      this.http.post(
        `${environment.hostUrlNgrock}/update-overtime`,data
      )
    )

  }
  
  public punchOut(data:any) {
    // let empId = 1001;
    // punch-In-Time
    return this.http.post(`${this.url}/punch-out`,data);
  }
  public breakStart(data:any) {
    // let empId = 1001;
    // punch-In-Time
    return this.http.post(`${this.url}/break-start`,data);
  }
  public breakEnd(data:any) {
    // let empId = 1001;
    // punch-In-Time
    return this.http.post(`${this.url}/break-end`,data);
  }

  // ========== NOT IMPLEMENTED YET =============
  // method for getting personal info
  public personalInfo(userId:any) {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    // empId :number
    // let empId = 1002;
    return this.http.get(`${this.url}/api/v1/personal-info/employeeId/${userId}`,{headers});
  }

  //method for posting leave form
  public leaveformPost(leaveData:any) {
    return this.http.post(this.url + "/api/v1/leave/request", leaveData);
  }


  //method for getting All Leave forms
public getAllApprover(){
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '69420'
    });
return this.http.get(this.url + "/api/v1/findall/leaveapprovers",{headers});
}
//method for getting data by approver id 
public get_approverBy_id(id:any){
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '69420'
    });
return this.http.get(this.url + "/api/v1/findByFirstApproverEmpId/"+id ,{headers});
}

//method for getting approverData by employee id
public getApproverDataById(id:any){
  const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': '69420'
    });
return this.http.get(this.url + "/api/v1/findByApproverEmpId/"+id ,{headers});
}


  public getAllLeave(){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(this.url + "/api/v1/findAll/leaverequest",
    {headers})
  }
  public getAllLeaveType(){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(this.url + "/api/v1/find/all/leave/type",{headers})
  }
  public getAllLeave_for_pending(){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(this.url + "/api/v1/leave/request/findall/pending" ,{headers})
  }
  public getAllLeave_for_rejected(){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(this.url + "/api/v1/leave/request/findall/rejected",{headers})
  }
  public getAllLeave_for_accepted(){
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(this.url + "/api/v1/leave/request/findall/accepted",{headers})
  }


  public add_designation(data:any){
    return this.http.post(this.url+"/savedesignation",data)
  }


    // Leaving Form Detail GET EMPLOYEE BY ID
    public searchLeaveFormDetailsByemp_Id(ID: any) {
      const headers = new HttpHeaders({
        'ngrok-skip-browser-warning': '69420'
      });
      return this.http.get(
        `${this.url}/api/v1/findall/leave/request/with/employeeId/${ID}`,{headers}
      );
    }
    // Get Details of Leave Form By Leave Form Id
    public getLeaveFormDetailsByleaveForm_id(ID: any) {
      const headers = new HttpHeaders({
        'ngrok-skip-browser-warning': '69420'
      });
      return this.http.get(
        `${this.url}/api/v1/leave/request/${ID}`,{headers}
      );
    }


  // update the Leave form 
  public updateLeaveForm(leaveRequestId:any,formData:any){
    console.log(leaveRequestId)
    return this.http.put(
      `${this.url}/api/v1/leave/request/approvedByManager/${leaveRequestId}`
      ,formData)
  }
  //
  public updateLeaveFormByHr(leaveRequestId:any,formData:any){
    console.log(leaveRequestId)
    return this.http.put(
      `${this.url}/api/v1/leave/request/approvedByhr/${leaveRequestId}`
      ,formData)
  }


  // payrolll

  public payrollDetailsEmployee(id:any,year:any,month:any){
    console.log(id,year,month);
    
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420'
    });
    return this.http.get(`${this.url}/payRoll/${id}/${year}/${month}`,{headers})
  }






}
