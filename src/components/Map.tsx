import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { DEFAULT_LAT_LNG, URL_PARAMS_TO_CHECK } from "@/constants";
import checkURLParams from "@/helpers/checkURLParams";
import generateShareUrl from "@/helpers/generateShareUrl";
import parseSharedDataFromFragment from "@/helpers/parseSharedDataFromFragment";

import ImageUploader from "./ImageUploader";

interface LeafletEventHandlerFnMap {
  latlng: {
    lat: number;
    lng: number;
  };
}

const Map = () => {
  const urlParamsExists = checkURLParams(URL_PARAMS_TO_CHECK);

  console.log("urlParamsExists", urlParamsExists);

  const [sharedData, setSharedData] = useState<{
    lat: number;
    lng: number;
    pic: Blob | null;
  } | null>(() => {
    if (urlParamsExists) return parseSharedDataFromFragment()!;

    return null;
  });

  const uploadImage = (file: File) => {
    if (!file) return;

    const blob = file;

    setSharedData({
      ...sharedData!,
      pic: blob,
    });

    // const shareUrl = await generateShareUrl(
    //   e.target.files[0],
    //   sharedData!.lat,
    //   sharedData!.lng,
    // );
  };

  const deleteImage = () => {
    setSharedData({
      ...sharedData!,
      pic: null,
    });
  };

  function DetectClick() {
    useMapEvent("click", (e: LeafletEventHandlerFnMap) => {
      console.log(e.latlng);

      setSharedData({
        ...sharedData!,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    });

    return null;
  }

  return (
    <div className="relative flex h-full w-full flex-1">
      <MapContainer
        className="h-full w-full"
        // @ts-expect-error @types/react-leaflet is not up to date
        center={[
          sharedData?.lat ?? DEFAULT_LAT_LNG.lat,
          sharedData?.lng ?? DEFAULT_LAT_LNG.lng,
        ]}
        zoom={13}
      >
        <TileLayer
          // @ts-expect-error @types/react-leaflet is not up to date
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          eventHandlers={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            add: (e: any) => e.target.openPopup(),
          }}
          key="shared-data-marker"
          position={[
            sharedData?.lat ?? DEFAULT_LAT_LNG.lat,
            sharedData?.lng ?? DEFAULT_LAT_LNG.lng,
          ]}
        >
          {/* @ts-expect-error @types/react-leaflet is not up to date */}
          <Popup closeButton={false} autoClose={false} closeOnClick={false}>
            {urlParamsExists ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-center">Coordinates:</span>
                  <span className="font-bold">
                    {sharedData?.lat}, {sharedData?.lng}
                  </span>
                </div>

                {sharedData?.pic ? (
                  <img
                    src={URL.createObjectURL(sharedData.pic)}
                    alt="Image preview"
                  />
                ) : null}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <ImageUploader
                  onFileChange={uploadImage}
                  onDelete={deleteImage}
                />

                {sharedData?.pic ? (
                  <img
                    src={URL.createObjectURL(sharedData.pic)}
                    alt="Image preview"
                  />
                ) : null}

                {sharedData?.lat && sharedData?.lng ? (
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-center">Coordinates:</span>
                    <span className="font-bold">
                      {sharedData?.lat}, {sharedData?.lng}
                    </span>
                  </div>
                ) : null}
              </div>
            )}
          </Popup>
        </Marker>

        <ChangeCenter
          position={[
            sharedData?.lat ?? 51.505,
            sharedData?.lng ?? DEFAULT_LAT_LNG.lng,
          ]}
        />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  map.flyTo(position);

  return null;
}

export default Map;
