import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            // { path: 'group/:groupId', component: GroupDetailComponent },
            // { path: 'conversation/:conversationId', component: ConversationDetailComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class YoRHaRoutingModule {}
