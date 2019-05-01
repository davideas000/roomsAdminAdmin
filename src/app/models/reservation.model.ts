import { RaUser } from './user.model';
import { RaRoom } from './room.model';

export class RaReservation {
  _id: string;
  reason: string;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  endTime: Date;
  code?: number;
  sequence?: number
  status: string;
  user: RaUser;
  room: RaRoom;
  createdAt?: Date;
  updatedAt?: Date;
}
