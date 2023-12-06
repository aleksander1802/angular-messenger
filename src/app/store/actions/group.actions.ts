import { createAction, props } from '@ngrx/store';
import { GroupsActionType } from '../action-types/group-action.types';
import {
    GeneratedGroup,
    Group,
    GroupItem,
} from 'src/app/yorha/models/group.interface';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';

export const loadGroupList = createAction(GroupsActionType.GROUP_LIST_LOAD);

export const loadGroupListSuccess = createAction(
    GroupsActionType.GROUP_LIST_LOAD_SUCCESS,
    props<Group>()
);
export const loadGroupListFailure = createAction(
    GroupsActionType.GROUP_LIST_LOAD_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const createGroup = createAction(
    GroupsActionType.GROUP_CREATE,
    props<GeneratedGroup>()
);

export const createGroupSuccess = createAction(
    GroupsActionType.GROUP_CREATE_SUCCESS,
    props<GroupItem>()
);

export const createGroupFailure = createAction(
    GroupsActionType.GROUP_CREATE_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const deleteGroup = createAction(
    GroupsActionType.GROUP_DELETE,
    props<{ groupId: string }>()
);
export const deleteGroupSuccess = createAction(
    GroupsActionType.GROUP_DELETE_SUCCESS,
    props<{ groupId: string }>()
);
export const deleteGroupFailure = createAction(
    GroupsActionType.GROUP_DELETE_SUCCESS,
    props<{ error: ErrorFailure }>()
);
