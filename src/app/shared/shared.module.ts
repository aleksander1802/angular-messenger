import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CyberButtonComponent } from './components/cyber-button/cyber-button.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
    declarations: [
        CyberButtonComponent,
        MainLayoutComponent,
        ToastComponent,
        LoadingComponent,
    ],
    imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
    
    exports: [
        CyberButtonComponent,
        ToastComponent,
        ReactiveFormsModule,
        MaterialModule,
        LoadingComponent,
    ],
})
export class SharedModule {}
