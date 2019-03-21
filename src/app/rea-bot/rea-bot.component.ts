import { Component, OnInit } from '@angular/core';
import {EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rea-bot',
  templateUrl: './rea-bot.component.html',
  styleUrls: ['./rea-bot.component.css']
})
export class ReaBotComponent implements OnInit {

  formData: FormData;
  files: File[];
  uploadInput: EventEmitter<any>;
  dragOver: boolean;
  div1 =  true ;
  prWidth = 80;
  public get prWidthst() {
    return `width: ${this.prWidth}%;`;
  }

  bootForm: FormGroup = this.fb.group({

    bootFile: [ '' ],
     address:  [3],
     chipType: [ ['ATmega8', 'ATMega164', 'ATMega664', 'STM32F1', 'STM32F4'] ],
     serialNo: [1]

   });
  bootFileHelp = 'bootFileHelp: string';


  constructor(private fb: FormBuilder) {
      this.files = [];
      this.uploadInput = new EventEmitter<any>();
  }

  showFiles() {
      // let files = '';
      // for (let i = 0; i < this.files.length; i ++) {
      //   files += this.files[i].name;
      //    if (!(this.files.length - 1 === i)) {
      //      files += ',';
      //   }
      // }
      // return files;
   }

  startUpload(): void {
      const event: any = {
      type: 'uploadAll',
      url: 'your-path-to-backend-endpoint',
      method: 'POST',
      data: { foo: 'bar' },
      };
      this.files = [];
      this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
      this.uploadInput.emit({ type: 'cancel' });
  }

  onUploadOutput(output: any): void {

      if (output.type === 'allAddedToQueue') {
      } else if (output.type === 'addedToQueue') {
        this.files.push(output.file); // add file to array when added
      } else if (output.type === 'uploading') {
        // update current data in files array for uploading file
        // const index = this.files.findIndex(file => file.id === output.file.id);
        // this.files[index] = output.file;
      } else if (output.type === 'removed') {
        // remove file from array when removed
        this.files = this.files.filter((file: File) => file !== output.file);
      } else if (output.type === 'dragOver') {
        this.dragOver = true;
      } else if (output.type === 'dragOut') {
      } else if (output.type === 'drop') {
        this.dragOver = false;
      }
      this.showFiles();
  }

  // constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.bootForm.controls.address.disable();
    // this.bootForm.controls.serialNo.disable();
  }

}
