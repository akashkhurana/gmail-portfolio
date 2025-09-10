import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-contact-modal',
    templateUrl: './contact-modal.component.html',
    styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent {

    constructor(public dialogRef: MatDialogRef<ContactModalComponent>) { }

    onClose(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        // Placeholder for actual send logic
        alert('Message sent successfully!');
        this.dialogRef.close(true);
    }
}
