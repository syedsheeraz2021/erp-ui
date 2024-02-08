import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from './services.service';
import { Injectable } from '@angular/core';

@Injectable() // Add this line
export class AuthInterceptor implements HttpInterceptor {
  private promptBefore = 2 * 60 * 1000; // 2 minutes before expiry

  constructor(private authService: ServicesService, private toastr: ToastrService) {
    this.checkSession();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Intercept logic here if needed
    return next.handle(req);
  }

  private checkSession() {
    const expiryTime = this.authService.getExpiryTime(); // Get expiry time from your auth service
    console.log(expiryTime);
    

    if (expiryTime) {
      const expiryDate = new Date(expiryTime);
      const currentTime = new Date();
      const timeUntilExpiry = expiryDate.getTime() - currentTime.getTime();

      if (timeUntilExpiry > 0) {
        timer(timeUntilExpiry - this.promptBefore).subscribe(() => {
          // Replace alert with Toastr
          // this.toastr.info('Time to login again!', 'Session Expiring Soon');
          // console.log('Time to login again!');
        });
      }else if(timeUntilExpiry == 0){
        this.authService.logOut();

      }
    }
    if (expiryTime) {
      const expiryDate = new Date(expiryTime);
      const currentTime = new Date();
      const timeUntilExpiry = expiryDate.getTime() - currentTime.getTime();

      if (timeUntilExpiry > 0) {
        timer(timeUntilExpiry - this.promptBefore).subscribe(() => {
          // Replace alert with Toastr
          this.toastr.info('Time to login again!', 'Session Expiring Soon');
          // console.log('Time to login again!');
        });
      }else if(timeUntilExpiry == 0){
        this.authService.logOut();

      }
    }
  }
}

