import { title } from '@/config'

/**
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 * -${title} 系统标题拼接
 */
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${title}`
}
