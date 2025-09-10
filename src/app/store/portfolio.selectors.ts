import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from './portfolio.reducer';

export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

export const selectAllEmails = createSelector(
    selectPortfolioState,
    (state: PortfolioState) => state.emails
);

export const selectActiveTab = createSelector(
    selectPortfolioState,
    (state: PortfolioState) => state.activeTab
);

export const selectActiveEmailId = createSelector(
    selectPortfolioState,
    (state: PortfolioState) => state.activeEmailId
);

export const selectSearchQuery = createSelector(
    selectPortfolioState,
    (state: PortfolioState) => state.searchQuery
);

export const selectIsDarkMode = createSelector(
    selectPortfolioState,
    (state: PortfolioState) => state.isDarkMode
);

export const selectEmailsByActiveTab = createSelector(
    selectAllEmails,
    selectActiveTab,
    selectSearchQuery,
    (emails, activeTab, searchQuery) => {
        let filtered = emails.filter(email => email.type === activeTab);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(e =>
                e.subject.toLowerCase().includes(q) ||
                e.snippet.toLowerCase().includes(q) ||
                (e.techStack && e.techStack.some(t => t.toLowerCase().includes(q))) ||
                (e.labels && e.labels.some(l => l.toLowerCase().includes(q)))
            );
        }
        return filtered;
    }
);

export const selectActiveEmail = createSelector(
    selectAllEmails,
    selectActiveEmailId,
    (emails, activeEmailId) => emails.find(email => email.id === activeEmailId) || null
);

export const selectLoading = createSelector(
    selectPortfolioState,
    (state: PortfolioState) => state.loading
);
