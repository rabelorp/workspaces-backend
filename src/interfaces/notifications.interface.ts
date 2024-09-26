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
}

export interface NotificationData {
  userId?: string;
  action: ActionNotification;
  entity: EntityNotification;
  message: string;
  createdAt: Date;
  read?: boolean;
}
