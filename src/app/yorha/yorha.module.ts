import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { YoRHaRoutingModule } from './yorha-routing.module';
import { GrouplistComponent } from './components/grouplist/grouplist.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HomePageComponent, GrouplistComponent],
    imports: [CommonModule, SharedModule, YoRHaRoutingModule],
})
export class YoRHaModule {}
