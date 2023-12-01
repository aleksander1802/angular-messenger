import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        // children: [
        //     {
        //         path: '',
        //         // redirectTo: 'login',
        //         pathMatch: 'full',
        //     },

        //     // {
        //     //     path: '**',
        //     //     component: NotFoundComponent,
        //     // },
        // ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
