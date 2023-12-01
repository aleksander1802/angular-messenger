import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CyberButtonComponent } from './components/cyber-button/cyber-button.component';

@NgModule({
    declarations: [CyberButtonComponent],
    imports: [CommonModule],
    exports: [CyberButtonComponent],
})
export class SharedModule {}
