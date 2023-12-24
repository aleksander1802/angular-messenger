import { createReducer, on } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import {
    ConversationItem,
    ConversationMessageItem,
} from 'src/app/yorha/models/people.interface';

import * as peopleConversationActions from '../actions/people-conversation.actions';

export const peopleConversationFeatureKey = 'peopleConversation';

export interface PeopleConversationState {
    peopleConversationList: ConversationItem[] | null;

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
    peopleConversationList: null,
    peopleConversationMessageItems: null,
    loading: false,
};

export const peopleConversationReducer = createReducer<PeopleConversationState>(
    initialState,

    on(
        peopleConversationActions.loadConversationList,
        peopleConversationActions.updateConversationList,
        peopleConversationActions.createConversation,
        peopleConversationActions.deleteConversation,
        peopleConversationActions.loadConversationMessage,
        peopleConversationActions.updateConversationMessage,
        peopleConversationActions.sendConversationMessage,
        (state) => ({
            ...state,
            loading: true,
        })
    ),

    on(
        peopleConversationActions.loadConversationListSuccess,
        peopleConversationActions.updateConversationListSuccess,
        (state, { Items }) => ({
            ...state,
            peopleConversationList: [...Items],
            loading: false,
        })
    ),

    on(
        peopleConversationActions.loadConversationListFailure,
        peopleConversationActions.updateConversationListFailure,
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
                ) || null;

            return {
                ...state,
                peopleConversationList: updatedConversationList,
                loading: false,
            };
        }
    ),

    on(
        peopleConversationActions.loadConversationMessageSuccess,
        peopleConversationActions.updateConversationMessageSuccess,
        (state, { conversationID, items }) => {
            const existingData = state.peopleConversationMessageItems?.[
                conversationID
            ] || {
                peopleConversationMessageItem: null,
                since: null,
            };

            return {
                ...state,
                peopleConversationMessageItems: {
                    ...state.peopleConversationMessageItems,
                    [conversationID]: {
                        peopleConversationMessageItem:
                            items && items.length > 0
                                ? [
                                      ...(existingData.peopleConversationMessageItem ||
                                          []),
                                      ...items,
                                  ]
                                : [
                                      ...(existingData.peopleConversationMessageItem ||
                                          []),
                                  ],
                        error: null,
                        since:
                            items && items.length > 0
                                ? +items[items.length - 1].createdAt.S
                                : existingData.since,
                    },
                },
                loading: false,
            };
        }
    ),

    on(
        peopleConversationActions.loadConversationMessageFailure,
        peopleConversationActions.updateConversationMessageFailure,
        (state, { conversationID, error }) => {
            const existingData = state.peopleConversationMessageItems?.[
                conversationID
            ] || {
                peopleConversationMessageItem: null,
                since: null,
            };

            return {
                ...state,
                peopleConversationMessageItems: {
                    ...state.peopleConversationMessageItems,
                    [conversationID]: {
                        peopleConversationMessageItem:
                            existingData.peopleConversationMessageItem,
                        error,
                        since: existingData.since,
                    },
                },
                loading: false,
            };
        }
    ),

    on(
        peopleConversationActions.sendConversationMessageSuccess,
        (state, { conversationID, since }) => {
            const existingData = state.peopleConversationMessageItems?.[
                conversationID
            ] || {
                peopleConversationMessageItem: null,
                since: null,
            };

            return {
                ...state,
                peopleConversationMessageItems: {
                    ...state.peopleConversationMessageItems,
                    [conversationID]: {
                        peopleConversationMessageItem:
                            existingData.peopleConversationMessageItem,
                        error: null,
                        since,
                    },
                },
                loading: false,
            };
        }
    ),

    on(
        peopleConversationActions.sendConversationMessageFailure,
        (state, { conversationID, error }) => {
            const existingData = state.peopleConversationMessageItems?.[
                conversationID
            ] || {
                peopleConversationMessageItem: null,
                since: null,
            };

            return {
                ...state,
                peopleConversationMessageItems: {
                    ...state.peopleConversationMessageItems,
                    [conversationID]: {
                        peopleConversationMessageItem:
                            existingData.peopleConversationMessageItem,
                        error,
                        since: existingData.since,
                    },
                },
                loading: false,
            };
        }
    ),

    on(peopleConversationActions.conversationListLoadingFalse, (state) => ({
        ...state,
        loading: false,
    }))
);
