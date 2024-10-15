export enum ActionNotification {
  CREATE = 1,
  UPDATE = 2,
  DELETE = 3,
}

export enum EntityNotification {
  ROOM = 1,
  WORKSTATION = 2,
  GARAGE = 3,
  LOCKER = 4,
  USER = 5,
  ROOM_RESERVATION = 6,
  WORKSTATION_RESERVATION = 7,
  GARAGE_RESERVATION = 8,
  LOCKER_RESERVATION = 9,
  USER_RESERVATION = 10,
  CHECKIN_RESERVATION = 11,
}

export interface NotificationData {
  userId?: string;
  action: ActionNotification;
  entity: EntityNotification;
  message: string;
  createdAt: Date;
  read?: boolean;
  reservationId?: string;
  activate?: boolean;
  checkInId?: string;
}
