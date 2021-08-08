import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // global
})
export class LocalStrorageService {
  storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }
  
  set(key: string, value: string): void {
    this.storage[key] = value;
  }
  get(key: string): string {
    return this.storage[key] || false;
  }
  setObject(key: string, value: any): void {
    if (!value) {
      return;
    }
    this.storage[key] = JSON.stringify(value);
  }
  getObject(key: string): void {
    return JSON.parse(this.storage[key] || '{}');
  }

  getValue<T>(key: string): T {
    const obj = JSON.parse(this.storage[key] || null);
    return <T>obj || (null as any);
  }

  remove(key: string): any {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  get length(): number {
    return this.storage.length;
  }

  get isStrorageEmpty(): boolean {
    return this.length === 0;
  }
}
