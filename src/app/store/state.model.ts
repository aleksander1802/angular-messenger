import { combineReducers } from '@ngrx/store';
import { ProfileState, profileReducer } from './reducers/profile.reducer';

export interface AppState {
    profile: ProfileState;
}

export const rootReducer = combineReducers({
    profile: profileReducer,
});
