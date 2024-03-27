import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  constructor() { }

  cpuList: any[] = [];
  gpuList: any[] = [];
  ramList: any[] = [];
  storageList: any[] = [];
  motherboardList: any[] = [];
  psuList: any[] = [];
  caseList: any[] = [];

  getCpuList(): any[] {
    return this.cpuList;
  }

  setCpuList(value: any[]): void {
    this.cpuList = value;
  }

  getGpuList(): any[] {
    return this.gpuList;
  }

  setGpuList(value: any[]): void {
    this.gpuList = value;
  }

  getRamList(): any[] {
    return this.ramList;
  }

  setRamList(value: any[]): void {
    this.ramList = value;
  }

  getStorageList(): any[] {
    return this.storageList;
  }

  setStorageList(value: any[]): void {
    this.storageList = value;
  }

  getMotherboardList(): any[] {
    return this.motherboardList;
  }

  setMotherboardList(value: any[]): void {
    this.motherboardList = value;
  }

  getPsuList(): any[] {
    return this.psuList;
  }

  setPsuList(value: any[]): void {
    this.psuList = value;
  }

  getCaseList(): any[] {
    return this.caseList;
  }

  setCaseList(value: any[]): void {
    this.caseList = value;
  }

  // Make sure this is correct, primarily the strings being checked to add parts to the correct list
  // Also the complete parts list can probably be stored in local storage in the browser. Will increase computation time
  // Finally make sure that either on method call, or change the method to make sure it works with the fact
  // that its held in a nested 'parts' json object
  setAllSeparatePartLists(completePartList: any[]): void {
    const cpuList: any[] = [];
    const gpuList: any[] = [];
    const ramList: any[] = [];
    const storageList: any[] = [];
    const motherboardList: any[] = [];
    const psuList: any[] = [];
    const caseList: any[] = [];

    for (let i = 0; i < completePartList.length; i++) {

      const currentPart = completePartList[i];

      /*
      Below adds some overhead now but aims to reduce complexity later. Will be tested to see if it keeps up
      The object split using array destructuring to remove the CPU field etc... this leaves the part lists clean
      i.e. Instead of the lists being cpus = [{CPU, Intel i5, 200}, {CPU, AMD Ryzen, 250}]
      They will now be cpus = [{Intel i5, 200}, {AMD Ryzen, 250}]
      */

      if (currentPart[0] === "CPU") {
        const [, partName, partPrice] = currentPart;
        cpuList.push({ partName, partPrice });
      } else if (currentPart[0] === "GPU") {
        const [, partName, partPrice] = currentPart;
        gpuList.push({ partName, partPrice });
      } else if (currentPart[0] === "RAM") {
        const [, partName, partPrice] = currentPart;
        ramList.push({ partName, partPrice });
      } else if (currentPart[0] === "Storage") {
        const [, partName, partPrice] = currentPart;
        storageList.push({ partName, partPrice });
      } else if (currentPart[0] === "Motherboard") {
        const [, partName, partPrice] = currentPart;
        motherboardList.push({ partName, partPrice });
      } else if (currentPart[0] === "PSU") {
        const [, partName, partPrice] = currentPart;
        psuList.push({ partName, partPrice });
      } else if (currentPart[0] === "Case") {
        const [, partName, partPrice] = currentPart;
        caseList.push({ partName, partPrice });
      }
    }

    // Assign the separated lists to the corresponding properties of the class
    this.cpuList = cpuList;
    this.gpuList = gpuList;
    this.ramList = ramList;
    this.storageList = storageList;
    this.motherboardList = motherboardList;
    this.psuList = psuList;
    this.caseList = caseList;
  }

}
