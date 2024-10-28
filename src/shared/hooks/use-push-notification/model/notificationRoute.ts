import { NotificationCategory, NotificationType } from "./pushNotification";

export type TargetRoute = ((...args: number[]) => string) | string;
export type WebLink = Record<NotificationType, TargetRoute>;
export type NotificationRoute = {
  [K in NotificationCategory]: Partial<WebLink>;
};

export const notificationRoute: NotificationRoute = {
  MEMBER: {
    AGREEMENT_UPDATE: (dogId: number) => `/dog/${dogId}`,
    AGENDA_ARRIVED: (dogId: number) => `/agenda/${dogId}`,
    DOG_IMAGE: (dogId: number) => `/album/date-view/${dogId}`
  },
  ATTENDANCE: {
    TICKET_EXPIRED: (dogId: number) => `/admin/attendance/${dogId}?tab=ticket`,
    AGREEMENT_UPDATE: (dogId: number) => `/admin/attendance/${dogId}?tab=agreement`,
    NEW_DOG: "/admin/attendance"
  },
  CARE: {
    AGENDA_NOT_YET_SENT: (dogId: number) => (dogId ? `/admin/care/notice/${dogId}` : "/admin/care"),
    IMAGE_NOT_YET_SENT: (dogId: number) => `/admin/care/gallery/${dogId}`
  },
  ENROLLMENT: {
    ENROLLMENT_APPROVED: "/approval?role=APPROVED",
    ENROLLMENT_DENIED: "/approval?role=APPROVAL_DENIED"
  },
  MANAGEMENT: {
    NEW_DOG: "/admin/school/enrollment/school-forms",
    NEW_TEACHER: "/admin/school/teacher",
    TEACHER_DROP_OUT: "/admin/school/teacher"
  }
};

export interface NotificationData {
  type: NotificationType;
  category: NotificationCategory;
  dogId?: number;
}
