import { createReducer, on } from '@ngrx/store';
import { Email } from '../models/email.model';
import * as PortfolioActions from './portfolio.actions';

export interface PortfolioState {
    emails: Email[];
    activeTab: 'primary' | 'promotions' | 'social';
    activeEmailId: string | null;
    searchQuery: string;
    isDarkMode: boolean;
    loading: boolean;
    error: any;
}

export const initialState: PortfolioState = {
    emails: [],
    activeTab: 'primary',
    activeEmailId: null,
    searchQuery: '',
    isDarkMode: false,
    loading: false,
    error: null
};

export const portfolioReducer = createReducer(
    initialState,
    on(PortfolioActions.loadEmails, state => ({ ...state, loading: true })),
    on(PortfolioActions.loadEmailsSuccess, (state, { emails }) => ({
        ...state,
        emails,
        loading: false
    })),
    on(PortfolioActions.loadEmailsFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(PortfolioActions.selectTab, (state, { tab }) => ({
        ...state,
        activeTab: tab,
        activeEmailId: null, // Reset active email when changing tabs
        loading: true
    })),
    on(PortfolioActions.selectTabComplete, state => ({
        ...state,
        loading: false
    })),
    on(PortfolioActions.selectEmail, (state, { emailId }) => ({
        ...state,
        activeEmailId: emailId
    })),
    on(PortfolioActions.markAsRead, (state, { emailId }) => ({
        ...state,
        emails: state.emails.map(email =>
            email.id === emailId ? { ...email, isRead: true } : email
        )
    })),
    on(PortfolioActions.markAllAsRead, state => ({
        ...state,
        emails: state.emails.map(email => ({ ...email, isRead: true }))
    })),
    on(PortfolioActions.setSearchQuery, (state, { query }) => ({
        ...state,
        searchQuery: query
    })),
    on(PortfolioActions.toggleDarkMode, state => ({
        ...state,
        isDarkMode: !state.isDarkMode
    })),
    on(PortfolioActions.setDarkMode, (state, { isDark }) => ({
        ...state,
        isDarkMode: isDark
    }))
);
