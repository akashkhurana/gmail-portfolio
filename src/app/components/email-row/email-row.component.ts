import { Component, Input, HostBinding } from '@angular/core';
import { Email } from '../../models/email.model';

@Component({
    selector: 'app-email-row',
    templateUrl: './email-row.component.html',
    styleUrls: ['./email-row.component.scss']
})
export class EmailRowComponent {
    @Input() email!: Email;

    @HostBinding('class.unread') get isUnread() {
        return !this.email.isRead;
    }

    toggleStar(event: Event) {
        event.stopPropagation();
        this.email.isStarred = !this.email.isStarred;
    }

    onCheckboxClick(event: Event) {
        event.stopPropagation();
    }
}
