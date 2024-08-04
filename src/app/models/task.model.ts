import { TaskDocument } from "./document.model";
import { Note } from "./note.model";

export class Task {
    id?: number;
    title: string;
    description: string;
    dueDate: Date;
    notes?: Note[];
    documents?: TaskDocument[];
    employeeId: number;
    teamLeaderId: number;
    isCompleted: boolean;
  
    constructor(
      title: string = '',
      description: string = '',
      dueDate: Date = new Date(),
      employeeId: number = 0,
      teamLeaderId: number = 0,
      notes: Note[] = [],
      documents: TaskDocument[] = [],
      isCompleted: boolean = false
    ) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.employeeId = employeeId;
      this.teamLeaderId = teamLeaderId;
      this.notes = notes;
      this.documents = documents;
      this.isCompleted = isCompleted;
    }
  }