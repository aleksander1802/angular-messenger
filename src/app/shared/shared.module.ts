import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CyberButtonComponent } from './components/cyber-button/cyber-button.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [CyberButtonComponent, MainLayoutComponent, ToastComponent],
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    exports: [CyberButtonComponent, ToastComponent, ReactiveFormsModule],
})
export class SharedModule {}
