import { createReducer, on } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import {
    ConversationItem,
    ConversationMessageItem,
} from 'src/app/yorha/models/people.interface';

import * as peopleConversationActions from '../actions/people-conversation.actions';

export const peopleConversationFeatureKey = 'peopleConversation';

export interface PeopleConversationState {
    peopleConversationList: ConversationItem[] | [];

    peopleConversationMessageItems: {
        [conversationID: string]: {
            peopleConversationMessageItem: ConversationMessageItem[] | null;
            error: ErrorFailure | null;
            since: number | null;
        };
    } | null;

    loading: boolean;
}

export const initialState: PeopleConversationState = {
    peopleConversationList: [],
    peopleConversationMessageItems: null,
    loading: false,
};

export const peopleConversationReducer = createReducer<PeopleConversationState>(
    initialState,

    on(
        peopleConversationActions.loadConversationList,
        peopleConversationActions.createConversation,
        peopleConversationActions.deleteConversation,
        (state) => ({
            ...state,
            loading: true,
        })
    ),

    on(
        peopleConversationActions.loadConversationListSuccess,
        (state, { Items }) => ({
            ...state,
            peopleConversationList: [...Items],
            loading: false,
        })
    ),

    on(
        peopleConversationActions.loadConversationListFailure,
        peopleConversationActions.createConversationFailure,
        peopleConversationActions.deleteConversationFailure,
        (state, { error }) => ({
            ...state,
            error,
            loading: false,
        })
    ),

    on(
        peopleConversationActions.createConversationSuccess,
        (state, conversation) => ({
            ...state,
            peopleConversationList:
                state.peopleConversationList &&
                state.peopleConversationList.length > 0
                    ? [...state.peopleConversationList, conversation]
                    : [conversation],
            loading: false,
        })
    ),

    on(
        peopleConversationActions.deleteConversationSuccess,
        (state, { conversationID }) => {
            const updatedConversationList =
                state.peopleConversationList?.filter(
                    (conversation) => conversation.id.S !== conversationID
                ) || [];

            return {
                ...state,
                peopleConversationList: updatedConversationList,
                loading: false,
            };
        }
    )
);
