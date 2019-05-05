import { RaReservation } from "./reservation.model";

export class RaNotification {
  _id: string;
  message: string;
  extra?: string;
  status: string;
  category: string;
  reservation?: RaReservation;
  createdAt?: Date;
  updatdAt?: Date;
}
