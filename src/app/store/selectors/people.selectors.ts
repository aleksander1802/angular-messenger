import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPeopleList from '../reducers/people.reducer';

export const selectGroupState =
    createFeatureSelector<fromPeopleList.PeopleState>(
        fromPeopleList.peopleFeatureKey
    );

export const selectPeople = createSelector(
    selectGroupState,
    (state) => state.people
);

export const selectPeopleListLoading = createSelector(
    selectGroupState,
    (state) => state.peopleListLoading
);

export const selectConversationListLoading = createSelector(
    selectGroupState,
    (state) => state.conversationListLoading
);
