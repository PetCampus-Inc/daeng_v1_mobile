export const notificationType = {
  PENDING_TICKET: "이용권 만료 임박",
  TICKET_EXPIRED: "이용권 만료",
  TICKET_UPDATE: "이용권 갱신",
  AGREEMENT_UPDATE: "유의사항 업데이트",
  AGENDA_ARRIVED: "알림장 도착",
  DOG_IMAGE: "강아지 사진 도착",
  ENROLLMENT_APPROVED: "가입신청 승인",
  ENROLLMENT_DENIED: "가입신청 거절",
  NEW_DOG: "신규 가입 강아지",
  AGENDA_NOT_YET_SENT: "알림장 전송한적 없음",
  IMAGE_NOT_YET_SENT: "사진 전송한적 없음",
  DOG_INFO_UPDATE: "강아지 정보 수정",
  NEW_TEACHER: "새로운 교사 가입 신청",
  TEACHER_DROP_OUT: "교사 유치원 탈퇴"
} as const;
export type NotificationType = keyof typeof notificationType;

export const notificationCategory = {
  ATTENDANCE: "출석부",
  CARE: "강아지 관리",
  MANAGEMENT: "유치원 운영",
  ENROLLMENT: "가입",
  MEMBER: "견주"
} as const;
export type NotificationCategory = keyof typeof notificationCategory;
