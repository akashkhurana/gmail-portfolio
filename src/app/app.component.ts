import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import * as PortfolioActions from './store/portfolio.actions';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isMobile = false;
  searchControl = new FormControl('');
  autocompleteOptions = ['Angular', 'React', 'TypeScript', 'NgRx', 'SCSS', 'Node.js', 'Firebase', 'Next.js', 'Prisma', 'Java'];
  filteredOptions$!: Observable<string[]>;

  private destroy$ = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  ngOnInit() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    this.store.dispatch(PortfolioActions.setDarkMode({ isDark }));

    this.store.dispatch(PortfolioActions.loadEmails());

    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.searchControl.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.store.dispatch(PortfolioActions.setSearchQuery({ query: query || '' }));
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.autocompleteOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openContactModal() {
    this.dialog.open(ContactModalComponent, {
      width: '500px',
      panelClass: 'gmail-compose-dialog',
      position: { bottom: '0px', right: '100px' },
      hasBackdrop: false
    });
  }

  markAllAsRead() {
    this.store.dispatch(PortfolioActions.markAllAsRead());
  }

  toggleDarkMode() {
    this.store.dispatch(PortfolioActions.toggleDarkMode());
  }
}

