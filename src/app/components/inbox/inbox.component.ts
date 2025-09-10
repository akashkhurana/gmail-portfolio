import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from '../../models/email.model';
import * as PortfolioSelectors from '../../store/portfolio.selectors';
import * as PortfolioActions from '../../store/portfolio.actions';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
    emails$: Observable<Email[]>;
    activeTab$: Observable<string>;
    loading$: Observable<boolean>;

    tabMapping = ['primary', 'promotions', 'social'];
    activeTabIndex = 0;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.emails$ = this.store.select(PortfolioSelectors.selectEmailsByActiveTab);
        this.activeTab$ = this.store.select(PortfolioSelectors.selectActiveTab);
        this.loading$ = this.store.select(PortfolioSelectors.selectLoading);
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const tab = params.get('tab') as 'primary' | 'promotions' | 'social';
            if (tab && this.tabMapping.includes(tab)) {
                this.store.dispatch(PortfolioActions.selectTab({ tab }));
                this.activeTabIndex = this.tabMapping.indexOf(tab);
            } else {
                // Default to primary if invalid
                this.router.navigate(['/inbox/primary']);
            }
        });
    }

    onTabChange(event: MatTabChangeEvent) {
        const nextTab = this.tabMapping[event.index];
        this.router.navigate(['/inbox', nextTab]);
    }

    onEmailClick(emailId: string) {
        this.store.dispatch(PortfolioActions.markAsRead({ emailId }));
        this.router.navigate(['/inbox/detail', emailId]);
    }
}
