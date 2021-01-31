import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ShowService} from '../show.service';
import { Show } from '../show.model';

export interface DialogData {
  review: string;
  name: string;
}

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.scss']
})
export class ShowPageComponent implements OnInit {

  constructor(public dialog: MatDialog,
             private showService: ShowService
  ) { }
  user: object;
  review: string;

  ngOnInit(): void {
  }

  openDialog(): void {
    let currentUser = this.showService.getUser();
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '450px',
      data: {'user': currentUser, 'review': this.review}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'review-dialog',
  templateUrl: 'review-dialog.html',
})
export class ReviewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    private showService: ShowService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let payload = {"id": this.data["user"]["id"], "review": this.data["review"]}
    this.showService.createReview(payload)
    console.log(this.data);
    this.onNoClick()
  }

}
