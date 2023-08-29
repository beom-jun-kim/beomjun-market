"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/me")
      .then((response) => response.json())
      .then((data) => {
        if(!data.ok){

            // replace : 이전 페이지에 대한 히스토리를 남기지 X
            router.replace("/enter");
        }
        setUser(data.profile);
      });
  }, [router]);

  return user;
}
