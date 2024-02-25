import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  token: string = '';
  otpValue: String = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;



  constructor(private route: ActivatedRoute, private router: Router,
    private authRepo: SupabaseService) {
    this.token = this.route.snapshot.paramMap.get('token')!.split('=')[1] ?? '';
  }
  onChangePass(event: any) {
    console.log(event);
    this.password = event;
  }

  onShowPass() {
    this.showPassword = !this.showPassword;
  }


  onConfirmPass(event: any) {
    console.log(event);
    this.confirmPassword = event;
  }
  login() {
    if (this.password != this.confirmPassword) {
      alert("Password and Confirm Password should be same");
      return;
    }
    // this.authRepo.resetPassword(this.token, this.password, this.confirmPassword).subscribe(
    //   {
    //     next: (data: any) => {
    //       alert("Password changed successfully");
    //       this.router.navigateByUrl('/auth/login');


    //       console.log(data);
    //     },
    //     error: (error: any) => {
    //       console.log(error);
    //     }
    //   }
    // );

    // this.router.navigateByUrl('/auth/login');
  }

}
