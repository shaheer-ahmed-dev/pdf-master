import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { OtpVerificationComponent } from "./otp-verification/otp-verification.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { NgModule } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        ForgotPasswordComponent,
        OtpVerificationComponent,
        ChangePasswordComponent,
        

    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        // NgOtpInputModule,
    ]
})
export class AuthModule { }