/**
 * 오브젝트를 병합합니다.
 * @param defaultOptions 기본 옵션 객체
 * @param options 사용자 옵션 객체 (선택)
 * @returns 병합된 옵션 객체
 */
export const mergeObject = <T extends object>(defaultOptions: T, options?: Partial<T>): T => {
  return { ...defaultOptions, ...options };
};
