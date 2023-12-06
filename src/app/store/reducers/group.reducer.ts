import { createReducer, on } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import { GroupItem } from 'src/app/yorha/models/group.interface';
import * as groupActions from '../actions/group.actions';

export const groupFeatureKey = 'group';

export interface GroupState {
    groups: GroupItem[] | null;
    loading: boolean;
    error: ErrorFailure | null;
}

export const initialState: GroupState = {
    groups: null,
    loading: false,
    error: null,
};

export const groupReducer = createReducer(
    initialState,
    on(groupActions.loadGroupList, (state) => ({ ...state, loading: true })),

    on(groupActions.loadGroupListSuccess, (state, action) => ({
        ...state,
        groups: action.Items,
        loading: false,
    })),

    on(groupActions.loadGroupListFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    }))
);
