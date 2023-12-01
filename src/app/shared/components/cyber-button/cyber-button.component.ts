import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cyber-button',
    templateUrl: './cyber-button.component.html',
    styleUrls: ['./cyber-button.component.scss'],
})
export class CyberButtonComponent {
    @Input() buttonText = '';
}
