import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  constructor() { }

  // Can create a build JSON object in the same format as the backend. This can then be sent to the backend
  // to update a build that is already in place, this will allow more than one part to be edited at once.
}
