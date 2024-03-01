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

  async onMagicLickSubmit(): Promise<void> {
    try {
      if(this.email == '' ){
        alert('Please provide an email address');
        return;
      }
      this.loading = true
      const email = this.signInForm.value.email as string
      const { data ,error } = await this.supabase.magicLinkLogin(email)
      if (error) throw error
      console.log(data);
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

  email : string = '';
  password : string = '';
  login(){
    console.log(this.email, this.password);
    if(this.email == '' || this.password == ''){
      alert('Please fill all the fields');
      return;
    }
    this.supabase.signInWithPass(this.email,this.password).then(
      (res)=>{
        console.log(res);
        if(res.data.user?.aud){
          alert('Login successfully');
this.lss.token = res.data.session.access_token;
this.lss.userData = res.data.session.user;
          this.router.navigateByUrl('/convert');
        }
        if(res.error?.message){
          alert(res.error.message);
        }
      }
    )

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
