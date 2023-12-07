import { createReducer, on } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import { GroupItem } from 'src/app/yorha/models/group.interface';
import * as groupActions from '../actions/group.actions';

export const groupFeatureKey = 'group';

export interface GroupState {
    groups: GroupItem[] | null;
    loading: boolean;
    error: ErrorFailure | null;
    isGroupTimerRunning: boolean;
}

export const initialState: GroupState = {
    groups: null,
    loading: false,
    error: null,
    isGroupTimerRunning: false,
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
    })),

    on(groupActions.createGroup, (state) => ({ ...state, loading: true })),

    on(groupActions.createGroupSuccess, (state, action) => {
        return {
            ...state,
            groups: state.groups ? [...state.groups, action] : null,
            error: null,
            loading: false,
        };
    }),

    on(groupActions.createGroupFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    })),

    on(groupActions.updateGroupList, (state) => ({ ...state, loading: true })),

    on(groupActions.updateGroupListSuccess, (state, action) => ({
        ...state,
        groups: action.Items,
        loading: false,
    })),

    on(groupActions.updateGroupListFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    })),

    on(groupActions.deleteGroup, (state) => ({ ...state, loading: true })),

    on(groupActions.deleteGroupSuccess, (state, { groupId }) => {
        const updatedGroups =
            state.groups?.filter((group) => group.id.S !== groupId) || null;
        return {
            ...state,
            groups: updatedGroups,
            error: null,
            loading: false,
        };
    }),

    on(groupActions.deleteGroupFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    })),

    on(groupActions.loadGroupListUpdateLoading, (state) => ({
        ...state,
        loading: false,
    }))
);
