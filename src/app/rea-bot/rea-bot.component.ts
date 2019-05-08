import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BootFileService } from '../boot-file.service';
import { ChipService } from '../chip.service';
import { IParseBootFile, isParseBootFile } from '../../../../types/DTOparseBootFileRes';
import { ProgrammService } from '../programm.service';

@Component({
  selector: 'app-rea-bot',
  templateUrl: './rea-bot.component.html',
  styleUrls: ['./rea-bot.component.css']
})
export class ReaBotComponent implements OnInit {

  button: any;

  get progress() {
    return this.bootForm.controls.progressData.value;
  }
  set progress(val: number) {
    if (this.progress !== val && val >= 0 && val <= 100) {
      this.bootForm.controls.progressData.setValue(val);
    }
  }


  constructor(private fb: FormBuilder,
              private bootFileServ: BootFileService,
              private chipSrv: ChipService,
              private programm: ProgrammService) {


    this.bootForm = fb.group({

      bootFile: ['',
        [Validators.required]],

      address: [{ value: 3, disabled: true },
      [Validators.required,
      Validators.min(1),
      Validators.max(16)]],

      serialNo: [{ value: 1, disabled: false },
      [Validators.required,
      Validators.min(1),
      Validators.max(0xFFFF)]],

      progressData: [{ value: 0, disabled: false },
      [Validators.required,
      Validators.min(0),
      Validators.max(100)]],

      chipType: [{ value: chipSrv.getCips()[0], disabled: true },
      [Validators.required]],
      chipTypeData: this.fb.array(chipSrv.getCips()),

    });
  }

  public bootForm: FormGroup;
  div1 = true;
  bootFileHelp = 'bootFileHelp: string';
  metatext: string;
  progressName = 'pn';

  cantProgrf = true;

  cantProgr(): boolean { return this.cantProgrf; }

  ngOnInit() {
    // this.bootForm.controls.chipType.disable();
    // this.bootForm.controls.serialNo.disable();
  }
  onProg(event: any) {
    this.programm.programm().subscribe(
      next => {
        console.log(`progr ${next}`);
      }
    );

  }

  onFile(event: any) {

    this.progress = 0;

    if (event.target.files && event.target.files[0]) {

      const f: FileList = event.target.files;

      this.bootFileHelp = `время файла: ${new Date(f[0].lastModified).toLocaleString()}
                          размер файла: ${f[0].size}`;

      const formData = new FormData();
      // this.bootForm.
      formData.append('bootfile', f[0]);

      console.log((f[0] as File));

      this.bootForm.controls.address.enable();
      this.bootForm.controls.chipType.enable();
      // this.bootForm.controls.programm.disable();


      this.bootFileServ.parseBootfile(formData).subscribe(
        next => {
          console.log(`progress`);
          console.log(next);
          this.progress = (next && next.value) || 0;
          if (next && isParseBootFile(next)) {
            const m = next as IParseBootFile;
            this.metatext = JSON.stringify(m);
            this.bootForm.controls.address.setValue(m.addr);
            this.bootForm.controls.address.disable();
            this.bootForm.controls.serialNo.setValue(m.serial || 1);
            this.bootForm.controls.chipType.setValue((m.chip && m.chip.name) || this.chipSrv.getCips()[0]);
            if (m.chip) { this.bootForm.controls.chipType.disable(); }
            this.cantProgrf = false;
            // this.bootForm.controls.programm.enable();
          }
        },
        err => {
          this.metatext = JSON.stringify(err);
        },
        () => this.progressName = 'end'
      );
      // const reader = new FileReader();
      // reader.onload = (e: any) => this.metatext = e.target.result;
      // reader.readAsDataURL(f[0]);
    } else {

      this.bootFileHelp = 'файл';

      this.metatext = '';
    }
  }

}
