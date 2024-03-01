import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
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
  signUp() {
    console.log(this.email, this.password);
    this.supabase.signUp(this.email, this.password).then(
      (res) => {
        console.log(res.data.user?.aud);
        // alert('Registration successfully, check your mail for verification link.');
        alert(res.data.session?.user.aud);
      }
    ).catch((err) => {
      alert(err.message);
      console.log(err);
    });

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
