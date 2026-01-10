'use client';

import { useEffect, useRef, useState } from 'react';

interface YandexMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  markerTitle?: string;
  className?: string;
}

declare global {
  interface Window {
    ymaps: {
      ready: (callback: () => void) => void;
      Map: new (
        element: HTMLElement,
        options: {
          center: [number, number];
          zoom: number;
          controls?: string[];
        }
      ) => YandexMapInstance;
      Placemark: new (
        coords: [number, number],
        properties: { balloonContent?: string; hintContent?: string },
        options?: { preset?: string }
      ) => YandexPlacemark;
    };
  }
}

interface YandexMapInstance {
  geoObjects: {
    add: (placemark: YandexPlacemark) => void;
  };
  behaviors: {
    disable: (behavior: string) => void;
    enable: (behavior: string) => void;
  };
  events: {
    add: (event: string, handler: () => void) => void;
    remove: (event: string, handler: () => void) => void;
  };
  destroy: () => void;
}

interface YandexPlacemark {
  // Placemark instance
}

export function YandexMap({
  latitude = 41.2995,
  longitude = 69.2401,
  zoom = 12,
  markerTitle = 'Tour Location',
  className = '',
}: YandexMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<YandexMapInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');

    const initMap = () => {
      if (!mapContainerRef.current || !window.ymaps) return;

      window.ymaps.ready(() => {
        if (!mapContainerRef.current) return;

        // Destroy existing map if any
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
        }

        try {
          const map = new window.ymaps.Map(mapContainerRef.current, {
            center: [latitude, longitude],
            zoom: zoom,
            controls: ['zoomControl', 'fullscreenControl'],
          });

          // Disable scroll zoom completely
          map.behaviors.disable('scrollZoom');

          // Also disable drag on mobile to prevent conflicts
          // map.behaviors.disable('drag');

          // Add marker
          const placemark = new window.ymaps.Placemark(
            [latitude, longitude],
            {
              balloonContent: markerTitle,
              hintContent: markerTitle,
            },
            {
              preset: 'islands#blueCircleDotIcon',
            }
          );

          map.geoObjects.add(placemark);
          mapInstanceRef.current = map;
          setIsLoading(false);
        } catch (err) {
          setError('Failed to initialize map');
          setIsLoading(false);
        }
      });
    };

    if (existingScript) {
      // Script already loaded
      if (window.ymaps) {
        initMap();
      } else {
        existingScript.addEventListener('load', initMap);
      }
    } else {
      // Load Yandex Maps script
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=your-api-key&lang=en_US';
      script.async = true;
      script.onload = initMap;
      script.onerror = () => {
        setError('Failed to load Yandex Maps');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, zoom, markerTitle]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Loading map...</p>
          </div>
        </div>
      )}
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
}
