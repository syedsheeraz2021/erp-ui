import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services/services.service';
import jwtDecode from 'jwt-decode';
import { DynamicRoutesService } from './dynamic-routes/dynamic-routes.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'argon-dashboard-angular';
public emp_id:any
  public isHam : boolean = true;

  public getData:any
  public getFirstApproverData:any;

  public hamTouch(){
    this.isHam = !this.isHam
    console.log('ham touch');
    
  }


  constructor(private services: ServicesService,private toastr: ToastrService) {
    this.checkTokenAndSetExpiry();

    // const token=this.services.getToken()
    // if (token) {
    //   const decodedToken: any = jwtDecode(token);
    //   // console.log(decodedToken.sub)
    //   const expiry_time = decodedToken.exp; 
    //   console.log(expiry_time) // Assuming 'id' is the property in the decoded token
    //   this.emp_id=expiry_time

    // } else {
    //   console.error('Token not found.');
    // }

    // console.log(token)
    // this.services.getAllApprover().subscribe((successResponse:any)=>{
    //   console.log(successResponse);
    //   this.getData=successResponse
    //   // console.log(this.emp_id)
    //   this.getData.forEach((data:any)=>{
       
    //     if(data.firstApproverEmpId==this.emp_id  || data.secondApproverEmpId==this.emp_id) {
    //       console.log("data.firstApproverEmpId",data.firstApproverEmpId)
    //       this.services.getApproverDataById(this.emp_id).subscribe((successResponse:any)=>{
    //         console.log(successResponse);

    //       let endDateNull=  successResponse.filter((items)=>{
    //         if(items.endDate==null){
    //           return items
    //         }

    //         })
    //         console.log(endDateNull[0].employeeData)
    //         console.log(endDateNull[0].employeeNotifications)
    //         let filteredEmployeeData = endDateNull[0].employeeData.filter(data => {
    //           return endDateNull[0].employeeNotifications.some(notification => notification.employeeId === data.employeeId);
    //       });
          
    //       console.log(filteredEmployeeData);
    //       filteredEmployeeData.forEach((item)=>{
    //         this.toastr.info("please approve the leave "+ "" + item.employeeId)
    //         // alert("please approve the leave "+ "" + item.employeeId)
    //       })
    //       // console.log(this.getFirstApproverData)

    //         // endDateNull.forEach((item)=>{
    //         //   console.log(item.employeeNotifications)
    //         //   item.employeeNotifications.forEach((item)=>{
    //         //     console.log(item.noOfLeavesApproved)
    //         //     if(item.noOfLeavesApproved>=3){
    //         //       // alert("please approve leave"+ " " +item.nameOfEmployee)

    //         //     }
    //         //   })      
    //         //       })
    //         // this.getFirstApproverData= successResponse[0].employeeData.map((employeeData:any)=>{
    //         // return employeeData
    //         //   // console.log("You are the approver ", employeeData.employeeId)
    //         // })
    //         // this.getFirstApproverData=d
            
    //       })
  
  
    //     }
    //     if(data.secondApproverEmpId==this.emp_id  ) {
    //       console.log("data.firstApproverEmpId",data.firstApproverEmpId)
    //       this.services.getApproverDataById(this.emp_id).subscribe((successResponse:any)=>{
    //         console.log(successResponse);

    //       let endDateNull=  successResponse.filter((items)=>{
    //         if(items.endDate==null){
    //           return items
    //         }

    //         })
    //         console.log(endDateNull[0].employeeData)
    //         console.log(endDateNull[0].employeeNotifications)
    //         let filteredEmployeeData = endDateNull[0].employeeData.filter(data => {
    //           return endDateNull[0].employeeNotifications.some(notification => notification.employeeId === data.employeeId);
    //       });
          
    //       console.log(filteredEmployeeData);
    //       filteredEmployeeData.forEach((item)=>{
    //         this.toastr.info("please approve the leave "+ "" + item.employeeId)
    //         // alert("please approve the leave "+ "" + item.employeeId)
    //       })
    //       // console.log(this.getFirstApproverData)

    //         // endDateNull.forEach((item)=>{
    //         //   console.log(item.employeeNotifications)
    //         //   item.employeeNotifications.forEach((item)=>{
    //         //     console.log(item.noOfLeavesApproved)
    //         //     if(item.noOfLeavesApproved>=3){
    //         //       // alert("please approve leave"+ " " +item.nameOfEmployee)

    //         //     }
    //         //   })      
    //         //       })
    //         // this.getFirstApproverData= successResponse[0].employeeData.map((employeeData:any)=>{
    //         // return employeeData
    //         //   // console.log("You are the approver ", employeeData.employeeId)
    //         // })
    //         // this.getFirstApproverData=d
            
    //       })
  
  
    //     }
    //     // if(data.secondApproverEmpId==this.emp_id) {
    //     //   console.log("data.Second",data.firstApproverEmpId)
    //     //   this.services.getApproverDataById(this.emp_id).subscribe((successResponse:any)=>{
    //     //     console.log(successResponse);

    //     //   let endDateNull=  successResponse.filter((items)=>{
    //     //     if(items.endDate==null){
    //     //       return items
    //     //     }

    //     //     })
    //     //     console.log(endDateNull[0].employeeData)
    //     //     console.log(endDateNull[0].employeeNotifications)
    //     //     let filteredEmployeeData = endDateNull[0].employeeData.filter(data => {
    //     //       return endDateNull[0].employeeNotifications.some(notification => notification.employeeId === data.employeeId);
    //     //   });
          
    //     //   console.log(filteredEmployeeData);
    //     //   filteredEmployeeData.forEach((item)=>{
    //     //     this.toastr.info("please approve the leave "+ "" + item.employeeId)
    //     //     // alert("please approve the leave "+ "" + item.employeeId)
    //     //   })

    //     //     // endDateNull.forEach((item)=>{
    //     //     //   console.log(item.employeeNotifications)
    //     //     //   item.employeeNotifications.forEach((item)=>{
    //     //     //     console.log(item.noOfLeavesApproved)
    //     //     //     if(item.noOfLeavesApproved>=3){
    //     //     //       // alert("please approve leave"+ " " +item.nameOfEmployee)

    //     //     //     }
    //     //     //   })      
    //     //     //       })
    //     //     // this.getFirstApproverData= successResponse[0].employeeData.map((employeeData:any)=>{
    //     //     // return employeeData
    //     //     //   // console.log("You are the approver ", employeeData.employeeId)
    //     //     // })
    //     //     // this.getFirstApproverData=d
    //     //     console.log(this.getFirstApproverData)
    //     //   })
  
  
    //     // }


        
        

    //   })
      
      
    // })
   }
  //  testToastr() {
  //   this.toastr.info('This is a test toast!', 'Test');
  // }

  
  checkTokenAndSetExpiry() {
    const token = this.services.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const expiryTime = decodedToken.exp;
      console.log(expiryTime);
      // this.emp_id = decodedToken.exp; // Assuming you want to save the expiry time

      // Calculate the time until expiry in milliseconds
      const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds since epoch
      const timeUntilExpiry = (expiryTime - currentTime) * 1000; // Convert time until expiry to milliseconds

      if (timeUntilExpiry > 0) {
        setTimeout(() => {
          // this.onTokenExpiry(); // Call the function you want to execute on expiry
        }, timeUntilExpiry);
      } else {
        console.log('Token has already expired.');
        this.onTokenExpiry(); 
      }
    } else {
      console.error('Token not found.');
    }
  }

  onTokenExpiry() {
    console.log('Token has expired. Executing onTokenExpiry function...');
    this.services.logOut()
    // Here, add the code that should run when the token expires
    // For example, you might want to redirect the user to the login page or refresh the token
  }

  ngOnInit(): void {


   
    // console.log(this.getFirstApproverData)

    
    

    



    // this.services.getResponseFromServer()
    // const token = this.services.getToken();
    //  if (token) {
    //   const decodedToken: any = jwtDecode(token);
    //   const expiryTime = decodedToken; 
    //   console.log(expiryTime.sub) // Assuming 'id' is the property in the decoded token

    // } else {
    //   console.error('Token not found.');
    // }

  }
}
    // if (token) {
    //   const decodedToken: any = jwtDecode(token);
    //   const expiryTime = decodedToken; 
    //   console.log(expiryTime.exp) // Assuming 'id' is the property in the decoded token

    // } else {
    //   console.error('Token not found.');
    // }

    
  //   if (token) {
  //     const decodedToken: any = jwtDecode(token);
  //     const expiryTime = decodedToken.exp // Convert to milliseconds
  //     const currentTime = Date.now();
  //     const twoMinutes = 2 * 60 * 1000; // Two minutes in milliseconds
  
  //     if (expiryTime - currentTime <= twoMinutes) {
  //         // If the token is going to expire within the next 2 minutes
  //         alert('Token is about to expire!');
  //     }
  
  //     console.log('Token expiry time in milliseconds:', expiryTime);
  // } else {
  //     console.error('Token not found.');
  // }


//   if (token) {
//     const decodedToken: any = jwtDecode(token);
//     const expiryTime = decodedToken.exp; // Yahan maan lijiye ki yeh milliseconds mein hai
//     const currentTime = Date.now();
//     const twoMinutes = 2 * 60 * 1000; // Do minute milliseconds mein

//     if (expiryTime - currentTime <= twoMinutes) {
//         // Agar token agle do minute mein expire hone wala hai
//         alert('Token is about to expire!');
//     }

//     console.log('Token expiry time in milliseconds:', expiryTime);
// } else {
//     console.error('Token not found.');
// }


// if (token) {
//   const decodedToken: any = jwtDecode(token);
//   const expiryTime = decodedToken.exp;
//   console.log(expiryTime);
//   const currentTime = Date.now();
  
//   const twoMinutes = 2 * 60 * 1000; // Do minute milliseconds mein

//   if (expiryTime - currentTime <= twoMinutes) {
      
//       alert('Session Expired Please Login Again!');
      
//       setTimeout(() => {
//         this.services.logOut()

//       }, expiryTime - currentTime);
//   }

//   console.log('Token expiry time in milliseconds:', expiryTime);
// } else {
//   console.error('Token not found.');
// }


  
//   }
// }
