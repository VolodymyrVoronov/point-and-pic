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

import { URL_PARAMS_TO_CHECK } from "@/constants";
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

  console.log(sharedData);

  return (
    <div className="relative flex h-full w-full flex-1">
      <MapContainer
        className="h-full w-full"
        // @ts-expect-error @types/react-leaflet is not up to date
        center={[sharedData?.lat ?? 51.505, sharedData?.lng ?? -0.09]}
        zoom={13}
      >
        <TileLayer
          // @ts-expect-error @types/react-leaflet is not up to date
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          key={"test"}
          position={[sharedData?.lat ?? 51.505, sharedData?.lng ?? -0.09]}
        >
          <Popup>
            {urlParamsExists ? (
              <>Test</>
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
          position={[sharedData?.lat ?? 51.505, sharedData?.lng ?? -0.09]}
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
