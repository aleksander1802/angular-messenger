import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPeopleConversation from '../reducers/people-conversation.reducer';

export const selectPeopleConversationState =
    createFeatureSelector<fromPeopleConversation.PeopleConversationState>(
        fromPeopleConversation.peopleConversationFeatureKey
    );

export const selectPeopleConversationList = createSelector(
    selectPeopleConversationState,
    (state) => state.peopleConversationList
);

export const selectConversationLoading = createSelector(
    selectPeopleConversationState,
    (state) => state.loading
);

export const selectPeopleConversationItems = (conversationID: string) =>
    createSelector(selectPeopleConversationState, (state) =>
        state.peopleConversationMessageItems &&
        state.peopleConversationMessageItems[conversationID]
            ? state.peopleConversationMessageItems[conversationID]
                  .peopleConversationMessageItem
            : null
    );

export const selectPeopleConversationSince = (conversationID: string) =>
    createSelector(selectPeopleConversationState, (state) =>
        state.peopleConversationMessageItems &&
        state.peopleConversationMessageItems[conversationID]
            ? state.peopleConversationMessageItems[conversationID].since
            : null
    );
