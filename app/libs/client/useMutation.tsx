import { useState } from "react";


// 제네릭을 주는 이유  : 각각의 다른 데이터 타입을 호출(두개 이상의 데이터를 다루기 위해)
interface useMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

// 배열로 두개의 반환값의 타입을 반환
// 두가지 서로 다른 종류의 값을 함께 반환하고 활용하기 위해
// 두개의 배열 반환 (1. api요청을 보내는 로직 2. 상태를 업데이트 하는 로직)
type useMutationResult<T> = [(data: any) => void, useMutationState<T>];

// 커스텀 훅
export default function useMutation<T = any>(
  url: string
): useMutationResult<T> {
  const [state, setState] = useState<useMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  // 백엔드로 보낸 data를 받는 fn
  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    // api 요청을 보내는 로직
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // 상태를 업데이트 하는 로직 : api 요청에 따른 상태 변화를 추적하고 렌더링에 활용
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  // useMutation 훅은 두가지 주요 기능을 제공
  // 1. api 요청을 보내는 mutation함수
  // 2. api 요청 상태를 관리하는 상태 객체
  // 이 두가지 기능을 함께 제공하기 위해 배열로 두개의 요소를 가진 useMutationResult 타입을 정의하고 사용
  return [mutation, { ...state }];
}
