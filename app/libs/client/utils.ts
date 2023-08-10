// ... : 무한한 인자를 담는다
export function cls(...classname: string[]) {
  // join : 배열의 모든 요소를 연결해 하나의 문자열로
  return classname.join(" ");
}
