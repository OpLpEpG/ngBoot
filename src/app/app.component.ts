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
  help_file = 'свойства файла';
  adr = 3;
  /**
   * fileChangeEvent
      event: any   
  */
  public fileChangeEvent(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {

      let f: File = fileInput.target.files[0];
      this.help_file = `время файла: ${new Date(f.lastModified).toLocaleString()}
                        размер файла: ${f.size}`;

      let reader = new FileReader();

      reader.onload = ( e:any) => this.metatext = e.target.result;
      
      reader.readAsDataURL(f);
  }
}
}
