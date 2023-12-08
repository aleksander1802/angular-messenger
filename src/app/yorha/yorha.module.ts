import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { YoRHaRoutingModule } from './yorha-routing.module';
import { GrouplistComponent } from './components/grouplist/grouplist.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileLinkComponent } from './components/profile-link/profile-link.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { ConversationDetailComponent } from './components/conversation-detail/conversation-detail.component';

@NgModule({
    declarations: [
        HomePageComponent,
        GrouplistComponent,
        ProfileLinkComponent,
        PeopleListComponent,
        GroupDetailComponent,
        ConversationDetailComponent,
    ],
    imports: [CommonModule, SharedModule, YoRHaRoutingModule],
})
export class YoRHaModule {}
