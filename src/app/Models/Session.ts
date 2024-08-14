import { Time } from '@angular/common';

export class Session {
  classId: number;
  classDuration: number;
  classDate: string;
  startTime: string;
  endTime: string;
  complete: boolean;
  team: { teamName: string };
  progress: number;
  isActive: any;
  completed: any;
}
