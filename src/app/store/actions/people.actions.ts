import { createAction, props } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import {
    People,
    CompanionId,
    ConversationId,
    Conversation,
} from 'src/app/yorha/models/people.interface';
import { PeopleActionType } from '../action-types/people-action.types';

export const loadPeopleList = createAction(PeopleActionType.PEOPLE_LIST_LOAD);

export const loadPeopleListSuccess = createAction(
    PeopleActionType.PEOPLE_LIST_LOAD_SUCCESS,
    props<People>()
);
export const loadPeopleListFailure = createAction(
    PeopleActionType.PEOPLE_LIST_LOAD_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const loadConversations = createAction(
    PeopleActionType.CONVERSATIONS_LIST_LOAD
);

export const loadConversationsSuccess = createAction(
    PeopleActionType.CONVERSATIONS_LIST_LOAD_SUCCESS,
    props<Conversation>()
);

export const loadConversationsFailure = createAction(
    PeopleActionType.CONVERSATIONS_LIST_LOAD_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const createConversation = createAction(
    PeopleActionType.CONVERSATION_CREATE,
    props<CompanionId>()
);

export const createConversationSuccess = createAction(
    PeopleActionType.CONVERSATION_CREATE_SUCCESS,
    props<ConversationId>()
);

export const createConversationFailure = createAction(
    PeopleActionType.CONVERSATION_CREATE_FAILURE,
    props<{ error: ErrorFailure }>()
);

export const loadPeopleListLoadingFalse = createAction(
    PeopleActionType.PEOPLE_LIST_LOADING_FALSE
)
