import { createAction, props } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import { GroupConversationActionType } from '../action-types/group-conversation.types';
import { GroupConversationItem } from 'src/app/yorha/models/group.interface';

export const loadGroupConversation = createAction(
    GroupConversationActionType.GROUP_LOAD_CONVERSATION,
    props<{ groupID: string; since?: number }>()
);

export const loadGroupConversationSuccess = createAction(
    GroupConversationActionType.GROUP_LOAD_CONVERSATION_SUCCESS,
    props<{ groupID: string; items: GroupConversationItem[] }>()
);

export const loadGroupConversationFailure = createAction(
    GroupConversationActionType.GROUP_LOAD_CONVERSATION_FAILURE,
    props<{ groupID: string; error: ErrorFailure }>()
);

export const updateGroupConversation = createAction(
    GroupConversationActionType.GROUP_UPDATE_CONVERSATION,
    props<{ groupID: string; since?: number }>()
);

export const updateGroupConversationSuccess = createAction(
    GroupConversationActionType.GROUP_UPDATE_CONVERSATION_SUCCESS,
    props<{ groupID: string; items: GroupConversationItem[] }>()
);

export const updateGroupConversationFailure = createAction(
    GroupConversationActionType.GROUP_UPDATE_CONVERSATION_FAILURE,
    props<{ groupID: string; error: ErrorFailure }>()
);

export const sendGroupConversationMessage = createAction(
    GroupConversationActionType.GROUP_SEND_MESSAGE,
    props<{ groupID: string; message: string; since: number | null }>()
);

export const sendGroupConversationMessageSuccess = createAction(
    GroupConversationActionType.GROUP_SEND_MESSAGE_SUCCESS,
    props<{ groupID: string; since: number | null }>()
);

export const sendGroupConversationMessageFailure = createAction(
    GroupConversationActionType.GROUP_SEND_MESSAGE_FAILURE,
    props<{ groupID: string; error: ErrorFailure }>()
);

export const conversationLoadingFalse = createAction(
    GroupConversationActionType.GROUP_CONVERSATION_LOADING_FALSE
);
