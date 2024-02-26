import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorageService.service';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
loading = false;

  signInForm = this.formBuilder.group({
    email: '',
  })

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder, private router: Router,private lss:LocalStorageService
  ) {}

  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.signInForm.value.email as string
      const { error } = await this.supabase.signIn(email)
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.signInForm.reset()
      this.loading = false
    }
  }
  showPassword: boolean = false;
onShowPass() {
  this.showPassword = !this.showPassword;}

  email : string = 'shaheer.ahmed@centrictech.com';
  password : string = '123';
  login(){
    console.log(this.email, this.password);
    this.supabase.signInWithPass(this.email,this.password).then(
      (res)=>{
        console.log(res);
        alert(res.error?.message);
        if(res.data.user?.aud){
          alert('Login successfully');
this.lss.token = res.data.session.access_token;
          this.router.navigateByUrl('/convert');
        }
      }
    ).catch((res)=>{
      alert(res._session.error_description);
      console.log(res);

    });

  }

  forgotPassword(){
    this.router.navigateByUrl('/forgotpassword');
  }
  onChangeEmail(event: any) {
    console.log(event);
    this.email = event;
  }
  onChangePass(event: any) {
    console.log(event);
    this.password = event;
  }
}
