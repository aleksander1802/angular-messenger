import { createReducer, on } from '@ngrx/store';
import * as profileActions from '../actions/profile.actions';
import { UserProfile } from 'src/app/core/models/profile.interface';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';

export const profileFeatureKey = 'profile';

export interface ProfileState {
    data: UserProfile | null;
    loading: boolean;
    error: ErrorFailure | null;
}

export const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null,
};

export const profileReducer = createReducer(
    initialState,

    on(
        profileActions.loadProfile,
        profileActions.updateProfile,
        profileActions.logoutProfile,
        (state) => ({
            ...state,
            loading: true,
        })
    ),

    on(profileActions.loadProfileSuccess, (state, { profile }) => ({
        ...state,
        data: profile,
        loading: false,
    })),

    on(
        profileActions.loadProfileFailure,
        profileActions.updateProfileFailure,
        profileActions.logoutProfileFailure,
        (state, { error }) => ({
            ...state,
            error,
            loading: false,
        })
    ),

    on(profileActions.updateProfileSuccess, (state, { name }) => ({
        ...state,
        data: state.data ? { ...state.data, name: { S: name } } : null,
        loading: false,
        error: null,
    })),

    on(profileActions.logoutProfileSuccess, (state) => ({
        ...state,
        data: null,
        loading: false,
    })),

    on(profileActions.loadProfileUpdateLoading, (state) => ({
        ...state,
        loading: false,
    }))
);
