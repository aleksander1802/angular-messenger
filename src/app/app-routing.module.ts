import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { ProfilePageComponent } from './core/pages/profile-page/profile-page.component';
import { LoginGuard } from './auth/guards/login.guard';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: () =>
                    import('./auth/auth.module').then((m) => m.AuthModule),
                canActivate: [LoginGuard],
            },
            {
                path: '',
                loadChildren: () =>
                    import('./yorha/yorha.module').then((m) => m.YoRHaModule),

                canActivate: [AuthGuard],
            },
            {
                path: 'profile',
                component: ProfilePageComponent,
                canActivate: [AuthGuard],
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
