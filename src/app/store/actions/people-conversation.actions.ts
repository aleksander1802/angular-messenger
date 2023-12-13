import { createAction, props } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import {
    Conversation,
    CompanionId,
    ConversationID,
    ConversationItem,
    ConversationMessageItem,
} from 'src/app/yorha/models/people.interface';
import { PeopleConversationActionType } from '../action-types/people-conversation.types';

export const loadConversationList = createAction(
    PeopleConversationActionType.PEOPLE_LOAD_CONVERSATION_LIST
);

export const loadConversationListSuccess = createAction(
    PeopleConversationActionType.PEOPLE_LOAD_CONVERSATION_LIST_SUCCESS,
    props<Conversation>()
);

export const loadConversationListFailure = createAction(
    PeopleConversationActionType.PEOPLE_LOAD_CONVERSATION_LIST_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const updateConversationList = createAction(
    PeopleConversationActionType.PEOPLE_UPDATE_CONVERSATION_LIST
);

export const updateConversationListSuccess = createAction(
    PeopleConversationActionType.PEOPLE_UPDATE_CONVERSATION_LIST_SUCCESS,
    props<Conversation>()
);

export const updateConversationListFailure = createAction(
    PeopleConversationActionType.PEOPLE_UPDATE_CONVERSATION_LIST_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const createConversation = createAction(
    PeopleConversationActionType.PEOPLE_CREATE_CONVERSATION,
    props<CompanionId>()
);

export const createConversationSuccess = createAction(
    PeopleConversationActionType.PEOPLE_CREATE_CONVERSATION_SUCCESS,
    props<ConversationItem>()
);

export const createConversationFailure = createAction(
    PeopleConversationActionType.PEOPLE_CREATE_CONVERSATION_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const deleteConversation = createAction(
    PeopleConversationActionType.PEOPLE_DELETE_CONVERSATION,
    props<ConversationID>()
);

export const deleteConversationSuccess = createAction(
    PeopleConversationActionType.PEOPLE_DELETE_CONVERSATION_SUCCESS,
    props<ConversationID>()
);

export const deleteConversationFailure = createAction(
    PeopleConversationActionType.PEOPLE_DELETE_CONVERSATION_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const loadConversationMessage = createAction(
    PeopleConversationActionType.PEOPLE_LOAD_CONVERSATION_MESSAGE,
    props<{ conversationID: string; since?: number }>()
);

export const loadConversationMessageSuccess = createAction(
    PeopleConversationActionType.PEOPLE_LOAD_CONVERSATION_MESSAGE_SUCCESS,
    props<{ conversationID: string; items: ConversationMessageItem[] }>()
);

export const loadConversationMessageFailure = createAction(
    PeopleConversationActionType.PEOPLE_LOAD_CONVERSATION_MESSAGE_FAILURE,
    props<{ conversationID: string; error: ErrorFailure }>()
);

export const updateConversationMessage = createAction(
    PeopleConversationActionType.PEOPLE_UPDATE_CONVERSATION_MESSAGE,
    props<{ conversationID: string; since?: number }>()
);

export const updateConversationMessageSuccess = createAction(
    PeopleConversationActionType.PEOPLE_UPDATE_CONVERSATION_MESSAGE_SUCCESS,
    props<{ conversationID: string; items: ConversationMessageItem[] }>()
);

export const updateConversationMessageFailure = createAction(
    PeopleConversationActionType.PEOPLE_UPDATE_CONVERSATION_MESSAGE_FAILURE,
    props<{ conversationID: string; error: ErrorFailure }>()
);

export const sendConversationMessage = createAction(
    PeopleConversationActionType.PEOPLE_SEND_CONVERSATION_MESSAGE,
    props<{ conversationID: string; message: string; since: number | null }>()
);

export const sendConversationMessageSuccess = createAction(
    PeopleConversationActionType.PEOPLE_SEND_CONVERSATION_MESSAGE_SUCCESS,
    props<{ conversationID: string; since: number | null }>()
);

export const sendConversationMessageFailure = createAction(
    PeopleConversationActionType.PEOPLE_SEND_CONVERSATION_MESSAGE_FAILURE,
    props<{ conversationID: string; error: ErrorFailure }>()
);

export const conversationListLoadingFalse = createAction(
    PeopleConversationActionType.PEOPLE_LOAD_CONVERSATION_LIST_LOADING_FALSE
);
