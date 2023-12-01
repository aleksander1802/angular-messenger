import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CyberButtonComponent } from './components/cyber-button/cyber-button.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [CyberButtonComponent, MainLayoutComponent],
    imports: [CommonModule, RouterModule],
    exports: [CyberButtonComponent],
})
export class SharedModule {}
