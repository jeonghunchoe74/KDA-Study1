import React, { useState, useEffect, useRef, StrictMode } from 'react';
import './NaverMap.css';

// 중요! 네이버 클라우드 플랫폼에서 발급받은 클라이언트 ID를 입력하세요.
// https://www.ncloud.com/product/applicationService/maps
const NAVER_MAP_CLIENT_ID = '5dvasu056d'; 

const API_BASE_URL = 'http://localhost:8000';


export function NaverMap({ location }) {
  const mapElement = useRef(null);
  const [error, setError] = useState(null);
  
  const MapStyles = () => (
    <style>{`
      .map-container { width: 100%; height: 400px; border-radius: 12px; border: 1px solid #e0e0e0; }
      .map-error { display: flex; align-items: center; justify-content: center; height: 100%; color: #d9534f; font-size: 14px; text-align: center; padding: 10px; }
    `}</style>
  );

  useEffect(() => {
    if (!location) return;
    if (!window.naver || !window.naver.maps) {
      setError("네이버 지도 API를 불러오지 못했습니다. Client ID를 확인해주세요.");
      return;
    }
    if (!mapElement.current) return;

    window.naver.maps.Service.geocode({ query: location }, (status, response) => {
      if (status !== window.naver.maps.Service.Status.OK || response.v2.addresses.length === 0) {
        setError(`'${location}'에 대한 위치를 찾을 수 없습니다.`);
        return;
      }
      const foundLocation = response.v2.addresses[0];
      const point = new window.naver.maps.Point(foundLocation.x, foundLocation.y);
      const map = new window.naver.maps.Map(mapElement.current, { center: point, zoom: 16 });
      new window.naver.maps.Marker({ position: point, map: map });
      setError(null);
    });
  }, [location]);

  return (
    <>
      <MapStyles />
      {error ? (
        <div className="map-container map-error">{error}</div>
      ) : (
        <div ref={mapElement} className="map-container" />
      )}
    </>
  );
}

function NaverMapPage({ onBack }) {
    const [locationInput, setLocationInput] = useState('서울시청'); // 기본값 설정
    const [searchedLocation, setSearchedLocation] = useState('서울시청');

    const handleSearch = () => {
        if (!locationInput.trim()) {
            alert('검색할 장소를 입력하세요.');
            return;
        }
        setSearchedLocation(locationInput);
    };

    return (
        <div className="map-page-container">
            <div className="map-header">
                <h2>네이버 지도 검색</h2>
                <button onClick={onBack} className="back-button">뒤로가기</button>
            </div>
            <div className="map-search-area">
                <input 
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="장소를 입력하세요 (예: 경복궁)"
                    className="map-search-input"
                />
                <button onClick={handleSearch} className="map-search-button">검색</button>
            </div>
            <NaverMap location={searchedLocation} />
        </div>
    );
}



export default NaverMapPage;

