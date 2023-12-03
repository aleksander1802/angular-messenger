import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from '../reducers/profile.reducer';

export const selectProfileState = createFeatureSelector<fromProfile.ProfileState>(
    fromProfile.profileFeatureKey
);

export const selectProfile = createSelector(
    selectProfileState,
    (state) => state.data
);
