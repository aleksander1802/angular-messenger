import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGroupConversation from '../reducers/group-conversation.reducer';

export const selectGroupConversationState =
    createFeatureSelector<fromGroupConversation.GroupConversationState>(
        fromGroupConversation.groupConversationFeatureKey
    );

export const selectGroupConversations = createSelector(
    selectGroupConversationState,
    (state) => state.groupConversationItems
);

export const selectGroupConversationItems = (groupID: string) =>
    createSelector(selectGroupConversationState, (state) =>
        state.groupConversationItems && state.groupConversationItems[groupID]
            ? state.groupConversationItems[groupID].groupConversationItem
            : null
    );

export const selectSince = (groupID: string) =>
    createSelector(selectGroupConversationState, (state) =>
        state.groupConversationItems && state.groupConversationItems[groupID]
            ? state.groupConversationItems[groupID].since
            : null
    );

export const selectGroupMessagesLoading = createSelector(
    selectGroupConversationState,
    (state) => state.loading
);
