import { Employee } from './Employee';

export interface Deployment {
  deploymentId: number;
  deploymentStatus: string;
  employee: Employee;
}
