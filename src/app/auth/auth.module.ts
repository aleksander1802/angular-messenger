import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
    declarations: [RegisterPageComponent, LoginPageComponent],
    imports: [CommonModule],
})
export class AuthModule {}
