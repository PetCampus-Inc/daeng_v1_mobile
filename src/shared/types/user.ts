/**
 * 유저 타입
 * - ADMIN: 관리자
 * - MEMBER: 견주
 */
export const User = {
  /** 관리자 */
  ADMIN: "ADMIN",
  /** 견주 */
  MEMBER: "MEMBER"
} as const;
export type User = (typeof User)[keyof typeof User];
