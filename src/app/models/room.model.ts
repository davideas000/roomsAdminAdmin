import { RaDepartment } from './department.model';

export class RaRoom {
  _id: string;
  name: string;
  description?: string;
  width: number;
  length: number;
  capacity: number;
  type: string;
  department: RaDepartment;
  photos: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
