export class TaskDocument {
    fileName: string;
    filePath: string;
  
    constructor(fileName: string = '', filePath: string = '') {
      this.fileName = fileName;
      this.filePath = filePath;
    }
  }