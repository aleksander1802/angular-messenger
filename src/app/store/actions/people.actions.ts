import { createAction, props } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import {
    People,
    CompanionId,
    ConversationCreateId,
    Conversation,
} from 'src/app/yorha/models/people.interface';
import { PeopleActionType } from '../action-types/people-action.types';

export const loadPeople = createAction(PeopleActionType.PEOPLE_LIST_LOAD);
export const loadPeopleSuccess = createAction(
    PeopleActionType.PEOPLE_LIST_LOAD_SUCCESS,
    props<People>()
);
export const loadPeopleFailure = createAction(
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
    props<ConversationCreateId>()
);
export const createConversationFailure = createAction(
    PeopleActionType.CONVERSATION_CREATE_FAILURE,
    props<{ error: ErrorFailure }>()
);
