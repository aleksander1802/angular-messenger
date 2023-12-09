import { createReducer, on } from '@ngrx/store';
import { ErrorFailure } from 'src/app/shared/models/error-types.interface';
import { GroupConversationItem } from 'src/app/yorha/models/group.interface';
import * as groupConversationActions from '../actions/group-conversation.actions';

export const groupConversationFeatureKey = 'groupConversation';

export interface GroupConversationState {
    groupConversationItems: {
        [groupID: string]: {
            groupConversationItem: GroupConversationItem[] | null;
            error: ErrorFailure | null;
            since: number | null;
        };
    } | null;
    loading: boolean;
}

export const initialState: GroupConversationState = {
    groupConversationItems: null,
    loading: false,
};

export const groupConversationReducer = createReducer<GroupConversationState>(
    initialState,

    on(
        groupConversationActions.loadGroupConversation,
        (state: GroupConversationState) => ({
            ...state,
            loading: true,
        })
    ),

    on(
        groupConversationActions.loadGroupConversationSuccess,
        (state, { groupID, items }) => ({
            ...state,
            groupConversationItems: {
                ...state.groupConversationItems,
                [groupID]: {
                    groupConversationItem: items,
                    error: null,
                    since:
                        items && items.length > 0
                            ? +items[items.length - 1].createdAt.S
                            : null,
                },
            },
            loading: false,
        })
    ),

    on(
        groupConversationActions.loadGroupConversationFailure,
        (state, { groupID, error }) => ({
            ...state,
            groupConversationItems: state.groupConversationItems
                ? {
                      ...state.groupConversationItems,
                      [groupID]: {
                          ...state.groupConversationItems[groupID],
                          error,
                      },
                  }
                : null,
            loading: false,
        })
    ),

    on(
        groupConversationActions.updateGroupConversation,
        (state: GroupConversationState) => ({
            ...state,
            loading: true,
        })
    ),

    on(
        groupConversationActions.updateGroupConversationSuccess,
        (state, { groupID, items }) => {
            const existingData = state.groupConversationItems?.[groupID] || {
                groupConversationItem: null,
                since: null,
            };

            return {
                ...state,
                groupConversationItems: {
                    ...state.groupConversationItems,
                    [groupID]: {
                        groupConversationItem:
                            items.length > 0
                                ? [
                                      ...(existingData.groupConversationItem ||
                                          []),
                                      ...items,
                                  ]
                                : [
                                      ...(existingData.groupConversationItem ||
                                          []),
                                  ],
                        error: null,
                        isTimerRunning: false,
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
        groupConversationActions.updateGroupConversationFailure,
        (state, { groupID, error }) => {
            const existingData = state.groupConversationItems?.[groupID] || {
                groupConversationItem: null,
                since: null,
            };

            return {
                ...state,
                groupConversationItems: {
                    ...state.groupConversationItems,
                    [groupID]: {
                        groupConversationItem:
                            existingData.groupConversationItem,
                        error: error,
                        since: existingData.since,
                    },
                },
                loading: false,
            };
        }
    ),

    on(
        groupConversationActions.conversationLoadingFalse,
        (state: GroupConversationState) => ({
            ...state,
            loading: false,
        })
    )
);
