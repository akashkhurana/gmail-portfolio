import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Email } from '../../models/email.model';
import * as PortfolioSelectors from '../../store/portfolio.selectors';
import * as PortfolioActions from '../../store/portfolio.actions';

@Component({
    selector: 'app-email-detail',
    templateUrl: './email-detail.component.html',
    styleUrls: ['./email-detail.component.scss']
})
export class EmailDetailComponent implements OnInit, OnDestroy {
    email$: Observable<Email | null>;
    showRawData = false;
    private destroy$ = new Subject<void>();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.email$ = this.store.select(PortfolioSelectors.selectActiveEmail);
    }

    ngOnInit() {
        this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.store.dispatch(PortfolioActions.selectEmail({ emailId: id }));
            }
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    goBack() {
        this.store.select(PortfolioSelectors.selectActiveTab).subscribe(tab => {
            this.router.navigate(['/inbox', tab]);
        }).unsubscribe();
    }
}
