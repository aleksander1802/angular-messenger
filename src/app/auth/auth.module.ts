import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './services/register/register.service';
import { LoginService } from './services/login/login.service';

@NgModule({
    declarations: [RegisterPageComponent, LoginPageComponent],
    providers: [RegisterService, LoginService],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        SharedModule,
    ],
})
export class AuthModule {}
