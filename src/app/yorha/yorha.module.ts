import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { YoRHaRoutingModule } from './yorha-routing.module';
import { GrouplistComponent } from './components/grouplist/grouplist.component';
import { SharedModule } from '../shared/shared.module';
import { PeoplelistComponent } from './components/peoplelist/peoplelist.component';
import { ProfileLinkComponent } from './components/profile-link/profile-link.component';

@NgModule({
    declarations: [HomePageComponent, GrouplistComponent, PeoplelistComponent, ProfileLinkComponent],
    imports: [CommonModule, SharedModule, YoRHaRoutingModule],
})
export class YoRHaModule {}
