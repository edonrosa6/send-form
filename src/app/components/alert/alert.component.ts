import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, errors: string[], error?: boolean },
    private dialogRef: MatDialogRef<AlertComponent>) {
  }

  ngOnInit(): void {
    if (this.data) {

    }
  }
}
