import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { ProfilePageComponent } from './core/pages/profile-page/profile-page.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'auth',
                pathMatch: 'full',
            },
            {
                path: 'auth',
                loadChildren: () =>
                    import('./auth/auth.module').then((m) => m.AuthModule),
            },
            {
                path: 'profile',
                component: ProfilePageComponent,
            },
            {
                path: '**',
                component: NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
