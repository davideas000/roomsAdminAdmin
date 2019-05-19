import { RaReservation } from "./reservation.model";

export enum RaNotificationStatus {read ='read', unread = 'unread'};
export enum RaNotificationCategory {
  rejectedReservation = 'rejected-reservation',
  removedReservation = 'removed-reservation',
  approvedReservation = 'approved-reservation',
};

export class RaNotification {
  _id: string;
  message: string;
  extra?: string;
  status: RaNotificationStatus;
  category: RaNotificationCategory;
  reservation?: RaReservation;
  createdAt: Date;
  updatdAt?: Date;
}
