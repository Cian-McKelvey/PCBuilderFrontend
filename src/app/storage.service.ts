import { Injectable } from '@angular/core';

/**
 * Service for interacting with the browser's local storage.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {


  /**
   * Saves a value to local storage under the specified key.
   * @param key - The key to store the value under.
   * @param value - The value to store.
   */
  saveToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieves a value from the local storage for the specified key.
   * @param key - The key to retrieve the value for.
   * @returns item - value stored under the specified key, or null if the key doesn't exist.
   */
  getFromLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
