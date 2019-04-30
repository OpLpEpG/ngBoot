import { Injectable } from '@angular/core';
import { CHIPS } from '../../../types/CHIPS';

@Injectable({
  providedIn: 'root'
})
export class ChipService {

  constructor() { }

  getCips(): string[] {

    const res: string[] = [];

    for (const c of CHIPS) { res.push(c.name); }

    return res;
  }
}
