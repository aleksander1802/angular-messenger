import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private currentTheme: string;

    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
    }

    getCurrentTheme(): string {
        return this.currentTheme;
    }

    toggleTheme(): void {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
    }
}
