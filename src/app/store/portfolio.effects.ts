import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, withLatestFrom, delay } from 'rxjs/operators';
import { PortfolioDataService } from '../services/portfolio-data.service';
import * as PortfolioActions from './portfolio.actions';

@Injectable()
export class PortfolioEffects {
    loadEmails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PortfolioActions.loadEmails),
            mergeMap(() =>
                this.portfolioService.getEmails().pipe(
                    map(emails => PortfolioActions.loadEmailsSuccess({ emails })),
                    catchError(error => of(PortfolioActions.loadEmailsFailure({ error })))
                )
            )
        )
    );

    simulateTabLoad$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PortfolioActions.selectTab),
            delay(500),
            map(() => PortfolioActions.selectTabComplete())
        )
    );

    toggleDarkMode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PortfolioActions.toggleDarkMode, PortfolioActions.setDarkMode),
            withLatestFrom(this.store.select(state => (state as any).portfolio.isDarkMode)),
            tap(([action, isDark]) => {
                localStorage.setItem('darkMode', (isDark as boolean).toString());
                if (isDark) {
                    document.body.classList.add('dark-theme');
                } else {
                    document.body.classList.remove('dark-theme');
                }
            })
        ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private portfolioService: PortfolioDataService,
        private store: Store
    ) { }
}
