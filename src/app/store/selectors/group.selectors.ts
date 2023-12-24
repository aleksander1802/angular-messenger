import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGroup from '../reducers/group.reducer';

export const selectGroupState = createFeatureSelector<fromGroup.GroupState>(
    fromGroup.groupFeatureKey
);

export const selectGroup = createSelector(
    selectGroupState,
    (state) => state.groups
);

export const selectGroupLoading = createSelector(
    selectGroupState,
    (state) => state.loading
);
