import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPeopleList from '../reducers/people.reducer';

export const selectPeopleState =
    createFeatureSelector<fromPeopleList.PeopleState>(
        fromPeopleList.peopleFeatureKey
    );

export const selectPeople = createSelector(
    selectPeopleState,
    (state) => state.people
);

export const selectPeopleListLoading = createSelector(
    selectPeopleState,
    (state) => state.peopleListLoading
);

export const selectConversationListLoading = createSelector(
    selectPeopleState,
    (state) => state.conversationListLoading
);
