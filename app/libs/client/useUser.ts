import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useUser() {
  const { data, error, mutate } = useSWR("/api/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  return {
    user: data?.profile,
    isLoading: !data && !error,
  };
}
