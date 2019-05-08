import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgrammService {

  constructor(private http: HttpClient) { }

  programm(): Observable<any> {
    console.log('programm begin')
    return this.http.get('http://localhost:3000/programm/bootfile', {
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
            return `Unhandled programm event: ${event.type}  ${event}`;
        }
      }));
  }
}
