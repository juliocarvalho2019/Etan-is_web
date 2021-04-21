import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'dialog-elements.component',
  templateUrl: 'dialog-elements.component.html',
  styleUrls: ['./dialog-elements.component.css']
})
export class DialogElementsComponent {
 
  constructor(
    private dialogRef: MatDialogRef<DialogElementsComponent >,
    @ Inject ( MAT_DIALOG_DATA )  data )  {

      this.title  =  data . title ;
      this.message = data.message;
  }
  // result: Boolean = false;

  onClose(result: Boolean) {
    // this.result = result;
    this.dialogRef.close(result);

  }

  @Input() title: String = '';
  @Input() message: String = '';
  editarDialog(title: string, message:string): void {
  this.title = title;
  this.message = message;
  }

}
