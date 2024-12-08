import { NotificationCategory, NotificationType } from "./pushNotification";

export type RouteConfig = {
  path: string;
  stack: boolean;
};

export type TargetRoute = ((...args: number[]) => RouteConfig) | RouteConfig;

export type WebLink = Record<NotificationType, TargetRoute>;
export type NotificationRoute = {
  [K in NotificationCategory]: Partial<WebLink>;
};

export const notificationRoute: NotificationRoute = {
  MEMBER: {
    AGREEMENT_UPDATE: (dogId: number) => ({
      path: `/dog/${dogId}?tab=school`,
      stack: true
    }),
    AGENDA_ARRIVED: (dogId: number) => ({
      path: `/agenda/${dogId}`,
      stack: true
    }),
    DOG_IMAGE: (dogId: number) => ({
      path: `/album/date-view/${dogId}`,
      stack: true
    })
  },
  ATTENDANCE: {
    TICKET_EXPIRED: (dogId: number) => ({
      path: `/admin/attendance/${dogId}?tab=ticket`,
      stack: true
    }),
    AGREEMENT_UPDATE: {
      path: "/admin/attendance",
      stack: false
    },
    NEW_DOG: {
      path: "/admin/attendance",
      stack: false
    }
  },
  CARE: {
    AGENDA_NOT_YET_SENT: {
      path: "/admin/care",
      stack: false
    },
    IMAGE_NOT_YET_SENT: {
      path: "/admin/care/gallery",
      stack: true
    }
  },
  ENROLLMENT: {
    ENROLLMENT_APPROVED: {
      path: "/approval?role=APPROVED",
      stack: false
    },
    ENROLLMENT_DENIED: {
      path: "/approval?role=APPROVAL_DENIED",
      stack: false
    }
  },
  MANAGEMENT: {
    NEW_DOG: {
      path: "/admin/school/enrollment/school-forms",
      stack: true
    },
    NEW_TEACHER: {
      path: "/admin/school/teacher",
      stack: true
    },
    TEACHER_DROP_OUT: {
      path: "/admin/school/teacher",
      stack: true
    }
  }
};

export interface NotificationData {
  type: NotificationType;
  category: NotificationCategory;
  dogId?: number;
}
