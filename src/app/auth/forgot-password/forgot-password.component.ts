import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email : string = '';

  constructor(private router: Router,private  authRepo:SupabaseService){}

  onChange(value: string){
    this.email = value;
    console.log(this.email);
  }

  otpVerification(){
    // this.authRepo.forgotPassword(this.email).subscribe(
    //   {
    //     next: (data)=>{

    //       console.log(`datassss: ${data.message}`);
    //       alert("Check your mail for magic link!");

    //       // this.router.navigateByUrl(`/auth/otp/${this.email}`);

    //     }, 
    //     error: (error)=>{
    //       console.log(`errorwsssss ${error}`);
    //     }
    //   }
    // );
    // this.router.navigateByUrl(`/auth/otp/${this.email}`);
    

  }
}
