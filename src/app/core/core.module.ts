import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfileEffects } from '../store/effects/profile.effects';
import { rootReducer } from '../store/state.model';
import { ProfileComponent } from './components/profile/profile.component';
import { httpInterceptorProviders } from './interceptors';
import { CommonModule } from '@angular/common';
import {
    profileFeatureKey,
    profileReducer,
} from '../store/reducers/profile.reducer';

import { SharedModule } from '../shared/shared.module';
import { GroupEffects } from '../store/effects/group.effects';
import { groupFeatureKey, groupReducer } from '../store/reducers/group.reducer';

@NgModule({
    declarations: [NotFoundComponent, ProfileComponent, ProfilePageComponent],
    providers: [httpInterceptorProviders],

    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot(rootReducer),
        StoreModule.forFeature(profileFeatureKey, profileReducer),
        StoreModule.forFeature(groupFeatureKey, groupReducer),
        EffectsModule.forRoot([ProfileEffects, GroupEffects]),
    ],
})
export class CoreModule {}
