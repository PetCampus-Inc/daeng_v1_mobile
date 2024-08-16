/**
 * 멤버 역할 타입
 * - ROLE_MEMBER: 회원
 * - ROLE_ANONYMOUS: 비회원
 */
export const MemberRole = {
  /** 가입이 승인되지 않은 사용자 */
  ROLE_ANONYMOUS: "ROLE_ANONYMOUS",
  /** 가입이 승인 된 사용자 */
  ROLE_MEMBER: "ROLE_MEMBER"
} as const;
export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole];

/**
 * 관리자 역할 타입
 * - ROLE_OWNER: 원장님
 * - ROLE_TEACHER: 선생님
 */
export const AdminRole = {
  /** 원장님 */
  ROLE_OWNER: "ROLE_OWNER",
  /** 선생님 */
  ROLE_TEACHER: "ROLE_TEACHER"
} as const;
export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole];

/**
 * 승인 상태 타입
 * - APPROVAL_CANCEL: 승인 취소
 * - APPROVAL_DENIED: 승인 거부
 * - APPROVAL_PENDING: 승인 대기
 */
export const ApprovalStatus = {
  /** 승인 완료 */
  APPROVED: "APPROVED",
  /** 승인 취소 */
  APPROVAL_CANCEL: "APPROVAL_CANCEL",
  /** 승인 거부 */
  APPROVAL_DENIED: "APPROVAL_DENIED",
  /** 승인 대기 */
  APPROVAL_PENDING: "APPROVAL_PENDING"
} as const;
export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

/**
 * 사용자 역할 및 승인 상태 타입
 * - MemberRole: 회원 상태
 * - AdminRole: 관리자 상태
 * - ApprovalStatus: 승인 상태
 */
export const Role = {
  ...MemberRole,
  ...AdminRole,
  ...ApprovalStatus
} as const;
export type Role = (typeof Role)[keyof typeof Role];
