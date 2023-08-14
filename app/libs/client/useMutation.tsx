import { useState } from "react";

interface useMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

type useMutationResult = [(data: any) => void, useMutationState];

// 커스텀 훅
export default function useMutation(url: string): useMutationResult {
  const [state, setState] = useState<useMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  // 백엔드로 보낸 data를 받는 fn
  function mutation(data: any) {
    setState((prev) => ({...prev,loading:true}));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({...prev,data})))
      .catch((error) => setState((prev)=> ({...prev,error})))
      .finally(() => setState((prev) => ({...prev, loading:false})));
  }
  return [mutation, { ...state }];
}