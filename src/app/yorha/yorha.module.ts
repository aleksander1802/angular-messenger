import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { YoRHaRoutingModule } from './yorha-routing.module';

@NgModule({
    declarations: [HomePageComponent],
    imports: [CommonModule, YoRHaRoutingModule],
})
export class YoRHaModule {}
