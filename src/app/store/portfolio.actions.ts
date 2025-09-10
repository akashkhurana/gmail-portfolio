import { createAction, props } from '@ngrx/store';
import { Email } from '../models/email.model';

export const loadEmails = createAction('[Portfolio] Load Emails');

export const loadEmailsSuccess = createAction(
    '[Portfolio] Load Emails Success',
    props<{ emails: Email[] }>()
);

export const loadEmailsFailure = createAction(
    '[Portfolio] Load Emails Failure',
    props<{ error: any }>()
);

export const selectTab = createAction(
    '[Portfolio] Select Tab',
    props<{ tab: 'primary' | 'promotions' | 'social' }>()
);

export const selectTabComplete = createAction('[Portfolio] Select Tab Complete');

export const selectEmail = createAction(
    '[Portfolio] Select Email',
    props<{ emailId: string | null }>()
);

export const markAsRead = createAction(
    '[Portfolio] Mark As Read',
    props<{ emailId: string }>()
);

export const markAllAsRead = createAction('[Portfolio] Mark All As Read');

export const setSearchQuery = createAction(
    '[Portfolio] Set Search Query',
    props<{ query: string }>()
);

export const toggleDarkMode = createAction('[Portfolio] Toggle Dark Mode');

export const setDarkMode = createAction(
    '[Portfolio] Set Dark Mode',
    props<{ isDark: boolean }>()
);
