import { createAction, props } from '@ngrx/store';
import { ProfileError } from 'src/app/core/models/error.interface';
import {
    UserProfile,
    UserProfileName,
} from 'src/app/core/models/profile.interface';
import { ProfileActionType } from '../action-types/profile-action.types';

export const loadProfile = createAction(ProfileActionType.PROFILE_LOAD);

export const loadProfileSuccess = createAction(
    ProfileActionType.PROFILE_LOAD_SUCCESS,
    props<{ profile: UserProfile }>()
);

export const loadProfileFailure = createAction(
    ProfileActionType.PROFILE_LOAD_FAILURE,
    props<{ error: ProfileError }>()
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
    props<{ error: ProfileError }>()
);
