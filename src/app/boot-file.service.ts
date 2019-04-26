import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BootFileService {

  constructor(private http: HttpClient) { }

  parseBootfile(boot: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/boot/bootfile', boot, {
      reportProgress: true,
      observe: 'events',
    })
      .pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:

            const progress = event.loaded / event.total * 100;
            return { status: 'download', value: progress };

          case HttpEventType.Response:
            // console.log(`Response: ${JSON.stringify(event.body)}`);
            return event.body;

          default:
            return `Unhandled event: ${event.type}`;
        }
      }));
  }
}
