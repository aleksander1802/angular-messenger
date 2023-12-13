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
    on(
        groupActions.loadGroupList,
        groupActions.updateGroupList,
        groupActions.createGroup,
        groupActions.deleteGroup,
        (state) => ({ ...state, loading: true })
    ),

    on(
        groupActions.loadGroupListSuccess,
        groupActions.updateGroupListSuccess,
        (state, { Items }) => ({
            ...state,
            groups: Items,
            loading: false,
        })
    ),

    on(groupActions.createGroupSuccess, (state, action) => {
        return {
            ...state,
            groups: state.groups ? [...state.groups, action] : null,
            error: null,
            loading: false,
        };
    }),

    on(groupActions.deleteGroupSuccess, (state, { groupID }) => {
        const updatedGroups =
            state.groups?.filter((group) => group.id.S !== groupID) || null;
        return {
            ...state,
            groups: updatedGroups,
            error: null,
            loading: false,
        };
    }),

    on(
        groupActions.loadGroupListFailure,
        groupActions.createGroupFailure,
        groupActions.updateGroupListFailure,
        groupActions.deleteGroupFailure,
        (state, { error }) => ({
            ...state,
            error,
            loading: false,
        })
    ),

    on(groupActions.loadGroupListUpdateLoading, (state) => ({
        ...state,
        loading: false,
    }))
);
