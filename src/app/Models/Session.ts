
import { Time } from "@angular/common";

export class Session {
  classId: number;
  classDuration: number;
  classDate: string;
  startTime: Time;
  endTime: Time;

  complete: boolean;
  team: { teamName: string; };
  progress: number;
}



