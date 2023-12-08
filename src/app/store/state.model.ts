import { combineReducers } from '@ngrx/store';
import { ProfileState, profileReducer } from './reducers/profile.reducer';
import { GroupState, groupReducer } from './reducers/group.reducer';
import { PeopleState, peopleReducer } from './reducers/people.reducer';

export interface AppState {
    profile: ProfileState;
    group: GroupState;
    peopleList: PeopleState;
}

export const rootReducer = combineReducers({
    profile: profileReducer,
    group: groupReducer,
    peopleList: peopleReducer,
});
