import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageKey } from 'src/app/enum/storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public storageKey = StorageKey;
  private storage: Storage;
  private subjects: Map<string, BehaviorSubject<any>>;

  constructor() {
    this.storage = window.sessionStorage;
    this.subjects = new Map<string, BehaviorSubject<any>>();
  }

  /**
   * watch data of given key
   * @param key session storage的key
   */
  watch<T>(key: StorageKey): Observable<T | null> {
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<T | null>(null));
    }
    let item: string | null = this.storage.getItem(key);

    if (item !== null) {
      item = JSON.parse(item as string);
    }

    this.subjects.get(key)?.next(item);
    return (this.subjects.get(key) as BehaviorSubject<T>).asObservable();
  }

  /**
   * get data of given key
   * @param key 要取值的key
   */
  get<T>(key: StorageKey): T | null {
    const item: string | null = this.storage.getItem(key);
    if (item === null || item === undefined) {
      return null;
    } else {
      return JSON.parse(item as string);
    }
  }

  /**
   * set value on given key
   * @param key storage 的 key
   * @param value 要寫入得值
   */
  set(key: StorageKey, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
    if (!this.subjects.has(key)) {
      this.subjects.set(key, new BehaviorSubject<any>(value));
    } else {
      this.subjects.get(key)?.next(value);
    }
  }

  /**
   * remove given key
   * @param key 要移除資料的key
   */
  remove(key: StorageKey): void {
    if (this.subjects.has(key)) {
      this.subjects.get(key)?.complete();
      this.subjects.delete(key);
    }
    this.storage.removeItem(key);
  }

  /**
   * clear all available keys
   */
  clear(): void {
    this.subjects.clear();
    this.storage.clear();
  }
}
