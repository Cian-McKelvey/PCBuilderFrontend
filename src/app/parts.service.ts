import { Injectable } from '@angular/core';

/**
 * Service for managing and manipulating lists of computer parts.
 */
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

  /**
   * Getters and setters for accessing and modifying the part lists.
   * Each part list has a corresponding getter and setter method.
   */

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

  /**
   * Separates a complete list of parts into individual lists based on the part type.
   * @param completePartList - An array containing all parts, with each part represented as an array [type, name, price].
   */
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
      This adds some overhead now but aims to reduce complexity later. Will be continually tested to see if it keeps up.
      The objects are split using array destructuring to remove the Type field etc... this leaves the part lists clean
      i.e. Instead of the lists being : cpus = [{CPU, Intel i5, 200}, {CPU, AMD Ryzen, 250}]
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
      } else if (currentPart[0] === "HDD" || currentPart[0] === "SSD") {
        const [, partName, partPrice] = currentPart;
        storageList.push({ partName, partPrice });
      } else if (currentPart[0] === "Motherboard") {
        const [, partName, partPrice] = currentPart;
        motherboardList.push({ partName, partPrice });
      } else if (currentPart[0] === "Power Supply") {
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
