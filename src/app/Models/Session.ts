// src/app/models/session.model.ts
import { Time } from '@angular/common';

export class Session {
  classId: number;
  classDuration: number; // Duration in minutes
  classDate: string; // Date of the class in YYYY-MM-DD format
  startTime: string; // Start time in HH:mm format
  endTime: string; // End time in HH:mm format
  complete: boolean;
  team: { teamName: string }; // Reference to team with just teamName
  progress: number; // Progress percentage (0-100)
  isActive: boolean; // Indicates if the session is currently active
  completed: boolean; // Indicates if the session is completed
  description?: string; // Optional description of the session
  createdBy?: string; // Optional creator of the session
  createdDate?: string; // Optional date when the session was created

  // Method to check if the session is completed
  isCompleted(): boolean {
    return this.complete && this.progress >= 100; // Adjust logic as needed
  }
}
