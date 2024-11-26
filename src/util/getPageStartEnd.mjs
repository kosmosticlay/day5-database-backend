/**
 * 페이지네이션을 위한 시작 및 끝 인덱스를 계산합니다.
 *
 * @param {number} limit - 페이지당 항목 수입니다.
 * @param {number} page - 현재 페이지 번호 (1부터 시작하는 인덱스).
 * @returns {Object} 페이지에 대한 시작 및 끝 인덱스를 포함하는 객체입니다.
 * @returns {number} return.pageStart - 현재 페이지의 첫 번째 항목 인덱스입니다.
 * @returns {number} return.pageEnd - 현재 페이지의 마지막 항목 인덱스입니다.
 *
 * @example
 * // limit = 10, page = 3인 경우
 * const { pageStart, pageEnd } = getPageStartEnd(10, 3);
 * console.log(pageStart); // 20
 * console.log(pageEnd);   // 30
 */
export default function getPageStartEnd(limit, page) {
  const pageStart = (page - 1) * limit;
  const pageEnd = pageStart + limit;
  return { pageStart, pageEnd };
}
