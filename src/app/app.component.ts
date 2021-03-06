import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bootloader';
  inpText = 'lorem100';
  metatext = 'metatext';
  helpfile = 'свойства файла';
  adr = 3;

  public fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {

      const f: FileList = fileInput.target.files;

      this.helpfile = `время файла: ${new Date(f[0].lastModified).toLocaleString()}
                        размер файла: ${f[0].size}`;

      const reader = new FileReader();

      reader.onload = (e: any) => this.metatext = e.target.result;

      reader.readAsDataURL(f[0]);
  }
}
}
