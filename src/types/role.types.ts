/**
 * 멤버 역할 타입
 * - ROLE_MEMBER: 회원
 * - ROLE_ANONYMOUS: 비회원
 */
export const MemberRole = {
  /** 가입이 승인 된 사용자 */
  ROLE_MEMBER: "ROLE_MEMBER",
  /** 가입이 승인되지 않은 최초 사용자 */
  ROLE_ANONYMOUS: "ROLE_ANONYMOUS"
} as const;
export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole];
