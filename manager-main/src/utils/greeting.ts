/** 根据当前时间返回问候语 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return '早上好';
  if (hour < 18) return '下午好';
  return '晚上好';
}

/** 返回中文格式的日期标签 */
export function getDateLabel(options?: Intl.DateTimeFormatOptions): string {
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    ...options,
  });
}

/** 用户角色名称 */
export const USER_ROLE = '酒店运营者';
