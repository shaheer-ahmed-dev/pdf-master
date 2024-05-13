import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/domain/interface/profile-model';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
onChangeUsername($event: string) {
    this.username = $event;
  }
  loading = false;

  signInForm = this.formBuilder.group({
    email: '',
  })

  constructor(
    private readonly supabase: SupabaseService,
    private readonly formBuilder: FormBuilder, private router: Router
  ) { }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.signInForm.value.email as string
      const { error } = await this.supabase.signIn(email)
      if (error) throw error
      alert('Check your email for the signUp link!')
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
  username = '';
  email: string = '';
  password: string = '';
  id: string = '';
  async signUp() {
    console.log(this.email, this.password,this.username);
    if (this.email == '' || this.password == '' || this.username == '') {
      alert('Please fill all the fields');
      return;
    }
    if (this.username.length < 4) {
      alert('password cannot be less than 4 characters');
      return;
    }
    if (this.password.length < 6) {
      alert('password cannot be less than 6 characters');
      return;
    }
  const {data, error} = await  this.supabase.signUp(this.email, this.password);
  this.id = data.user?.id ?? '';

  if(data){
  // console.log(data);
 const profile : Profile = {
   username: this.username,
   email: this.email,
   avatar_url: '',
   website: ''
 };
  const {data, error} = await this.supabase.updateProfile(profile, this.id);
  if(data){
    alert('Account created successfully');
    // this.router.navigateByUrl('/auth/login');
  }
  // this.router.navigateByUrl('/auth/login');
}

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
}
