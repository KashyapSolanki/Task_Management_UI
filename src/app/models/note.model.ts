export class Note {
    content: string;
    createdAt: string;
    taskId?: number;
  
    constructor(content: string = '', createdAt: string = '', taskId?: number) {
      this.content = content;
      this.createdAt = createdAt;
      this.taskId = taskId;
    }
  }