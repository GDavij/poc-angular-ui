import { Injectable } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Injectable({
  providedIn: 'root'
})
export class TailwindService {

  constructor() { }

  public merge(...classes: string[]): string {
    return twMerge(classes);
  }
}
