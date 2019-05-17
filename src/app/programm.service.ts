import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgrammService {

  ev: any;
  sj: Subject<any>;
  source: EventSource;

  constructor(private http: HttpClient) {
    //  this.connect();
  }

  private connect() {
    if (this.source) {
      this.source.close();
    }
    this.source = new EventSource('http://localhost:3000/programm/bootfile');

    this.sj = new Subject<any>();

    // this.sj.next('BEGIN');

    this.source.onmessage = message => {
      this.ev = message.data;
      if (message.data === '"end"') {
        this.disconnect();
      } else {
        this.sj.next(message.data);
      }
    };

    this.source.onerror = err => {
      this.ev = err;
      this.sj.error(err);
    };
  }
  private disconnect() {
    console.log('disconnect');
    this.sj.complete();
    this.source.close();
    // this.source = undefined;
  }
  programm(): Observable<any> {

    console.log('programm begin');

    this.connect();

    return this.sj.asObservable();

    // return this.http.get('http://localhost:3000/programm/bootfile', {
    //   reportProgress: true,
    //   observe: 'events',
    // })
    //   .pipe(map((event) => {

    //     switch (event.type) {

    //       case HttpEventType.UploadProgress:

    //         const progress = event.loaded / event.total * 100;
    //         return { status: 'download', value: progress };

    //       case HttpEventType.Response:
    //         // console.log(`Response: ${JSON.stringify(event.body)}`);
    //         return event.body;

    //       default:
    //         return `Unhandled programm event: ${event.type}  ${event}`;
    //     }
    //   }));
  }
  terminate() {
    this.http.get('http://localhost:3000/programm/terminate').subscribe(
      next => next,
    );
  }
}
