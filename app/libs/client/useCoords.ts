import { useEffect, useState } from "react";

interface useCoordsState {
  latitude: number | null;
  longitude: number | null;
}

export default function useCoords() {
  const [coords, setCoord] = useState<useCoordsState>({
    latitude: null,
    longitude: null,
  });
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoord({ latitude, longitude });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return coords;
}

// Geolocation API
// 사용자의 현재 위치를 지도에 표시하거나 위치 기반 개인화 정보를 제공하는 등, 웹 앱에서 위치 정보를 가져와야 하는 경우가 종종 있음
// Geolocation API는 navigator.geolocation을 통해 접근. 이 때, 사용자의 브라우저는 위치 정보 접근 권한을 요청하게 되고, 사용자가 허가할 경우 현재 장치에서 사용 가능한 최선의 방법(GPS, WiFi, ...)을 통해 위치를 파악
// https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API

// Geolocation.getCurrentPosition()
// 장치의 현재 위치를 조사한 후 GeolocationPosition 객체로 반환
// ex) navigator.geolocation.getCurrentPosition(success, error, [options])

// success
// GeolocationPosition 객체를 유일한 매개변수로 받는 콜백 함수

// error: Optional
// GeolocationPositionError 객체를 유일한 매개변수로 받는 콜백 함수

// https://developer.mozilla.org/ko/docs/Web/API/Geolocation/getCurrentPosition

// 브레이브 브라우저에서 위치 값 못 가져올 시 => 크롬에서 테스트