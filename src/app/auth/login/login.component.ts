import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorageService.service';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loading = false;

  signInForm = this.formBuilder.group({
    email: '',
  })
rememberMe: boolean = true;
rememberUser: any;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder, private router: Router, public lss: LocalStorageService
  ) { }
  ngOnInit(): void {
  // if(this.lss.rememberUser){
  //   this.email = this.lss.rememberUser.email;
  //   this.password = this.lss.rememberUser.password;
  //   this.rememberMe = this.lss.rememberUser.rememberMe;
  // }
  }

  async onMagicLickSubmit(): Promise<void> {
    try {
      if (this.email == '') {
        alert('Please provide an email address');
        return;
      }
      this.loading = true
      const email = this.signInForm.value.email as string
      const { data, error } = await this.supabase.magicLinkLogin(email)
      if (error) throw error
      console.log(data);
      alert(data?.user || 'Check your email for the magic link')
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
    this.showPassword = !this.showPassword;
  }


  email: string = '';
  password: string = '';
  login() {


    console.log(this.email, this.password);
    if (this.email == '' || this.password == '') {
      alert('Please fill all the fields');
      return;
    }
    if (this.password.length < 6) {
      alert('password cannot be less than 6 characters');
      return;
    }
    this.supabase.signInWithPass(this.email, this.password).then(
      (res) => {
        console.log(res);
        if (res.data.user?.aud) {
          // alert('Login successfully');
          // if (this.rememberMe) {
          //   this.lss.rememberUser = { "email": this.email.toString(), "password": this.password.toString()};
          // } else {
          //   this.lss.rememberUser = null;
          // }
          this.supabase.session;
          this.lss.token = res.data.session.access_token;
          this.lss.userData = res.data.session.user;
          this.router.navigateByUrl('/convert');
        }
        if (res.error?.message) {
          alert(res.error.message);
        }
      }
    )

  }

  forgotPassword() {
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

  async signinwithgoogle() { const { data, error } = await this.supabase.signinwithgoogle(); console.log(error); console.log(data); }

}
