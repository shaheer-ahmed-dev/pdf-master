import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutes } from '../utils/resources/routes';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: AppRoutes.login,
    component: LoginComponent,
  },
  {
    path: AppRoutes.signup,
    component: SignupComponent,
  },
  {
    path: AppRoutes.forgot,
    component: ForgotPasswordComponent,
  },
  {
    path: `${AppRoutes.otp}/:email`,
    component: OtpVerificationComponent,
  
  },
  
  {
    path: `${AppRoutes.changePassword}/:token`,
    component: ChangePasswordComponent,
  
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
