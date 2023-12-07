import { createAction, props } from '@ngrx/store';

import {
    UserProfile,
    UserProfileName,
} from 'src/app/core/models/profile.interface';
import { ProfileActionType } from '../action-types/profile-action.types';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';

export const loadProfile = createAction(ProfileActionType.PROFILE_LOAD);

export const loadProfileSuccess = createAction(
    ProfileActionType.PROFILE_LOAD_SUCCESS,
    props<{ profile: UserProfile }>()
);

export const loadProfileFailure = createAction(
    ProfileActionType.PROFILE_LOAD_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const updateProfile = createAction(
    ProfileActionType.PROFILE_UPDATE,
    props<{ name: string }>()
);

export const updateProfileSuccess = createAction(
    ProfileActionType.PROFILE_UPDATE_SUCCESS,
    props<UserProfileName>()
);

export const updateProfileFailure = createAction(
    ProfileActionType.PROFILE_UPDATE_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const logoutProfile = createAction(ProfileActionType.PROFILE_LOGOUT);

export const logoutProfileSuccess = createAction(
    ProfileActionType.PROFILE_LOGOUT_SUCCESS
);

export const logoutProfileFailure = createAction(
    ProfileActionType.PROFILE_LOGOUT_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const loadProfileUpdateLoading = createAction(
    ProfileActionType.PROFILE_LOADING_FALSE
);
