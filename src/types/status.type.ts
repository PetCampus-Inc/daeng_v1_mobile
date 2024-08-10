/**
 * 승인 상태 타입
 * - APPROVAL_CANCEL: 승인 취소
 * - APPROVAL_DENIED: 승인 거부
 * - APPROVAL_PENDING: 승인 대기
 */
export const ApprovalStatus = {
  /** 승인 취소 */
  APPROVAL_CANCEL: "APPROVAL_CANCEL",
  /** 승인 거부 */
  APPROVAL_DENIED: "APPROVAL_DENIED",
  /** 승인 대기 */
  APPROVAL_PENDING: "APPROVAL_PENDING"
} as const;
export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

/**
 * 유치원 가입 상태 타입
 * - ENROLLED: 등록
 * - DROP_OUT: 탈퇴
 */
export const EnrollmentStatus = {
  /** 유치원 등록된 상태 */
  ENROLLED: "ENROLLED",
  /** 유치원 탈퇴한 상태 */
  DROP_OUT: "DROP_OUT"
} as const;
export type EnrollmentStatus = (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus];

/**
 * 상태 타입
 * - ApprovalStatus: 승인 상태 타입
 * - AttendanceStatus: 출석 상태 타입
 * - EnrollmentStatus: 유치원 가입 상태 타입
 * - AgendaStatus: 알림장 상태 타입
 */
export const Status = {
  ...ApprovalStatus,
  ...EnrollmentStatus
} as const;
export type Status = (typeof Status)[keyof typeof Status];
