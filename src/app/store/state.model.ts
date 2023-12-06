import { combineReducers } from '@ngrx/store';
import { ProfileState, profileReducer } from './reducers/profile.reducer';
import { GroupState, groupReducer } from './reducers/group.reducer';

export interface AppState {
    profile: ProfileState;
    group: GroupState;
}

export const rootReducer = combineReducers({
    profile: profileReducer,
    group: groupReducer,
});
