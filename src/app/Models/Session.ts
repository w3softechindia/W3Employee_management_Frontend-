// export class Session {
//   classId: number;
//   classDuration: number;
//   classDate: string;
//   // classStatus: string;
//   startTime: string;
//   endTime: string;
//   // sessionNumber: number; 

//   complete: boolean;
//   team: { teamName: string; };
//   progress: number;
// }

// export class Session {
//   classId: number;
//   classDuration: number;
//   classDate: string;
//   startTime: string;
//   endTime: string;
//   complete: boolean;
//   team: { teamName: string };
//   progress?: number;
// }


// export interface Session {
//   complete: boolean;
//   classId: string;
//   classDuration: number;  // Duration in minutes
//   startTime: string;
//   endTime: string;
//   joinTime: string;
//   leaveTime: string;
//   meetingLink: string;
//   progress?: number;  // Optional property to hold the calculated progress
// }

export interface Session {
isActive: any;
completed: any;
  classId: number;
  classDuration: number;
  classDate: string;
  startTime: string; // Use string
  endTime: string; // Use string
}



