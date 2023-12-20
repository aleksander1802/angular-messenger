import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
    constructor(private themeService: ThemeService) {}

    toggleTheme() {
        this.themeService.toggleTheme();
    }
}
