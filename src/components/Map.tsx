import { useLayoutEffect, useState, type ChangeEvent } from "react";

import { URL_PARAMS_TO_CHECK } from "@/constants";
import checkURLParams from "@/helpers/checkURLParams";
import generateShareUrl from "@/helpers/generateShareUrl";
import parseSharedDataFromFragment from "@/helpers/parseSharedDataFromFragment";

const Map = () => {
  const urlParamsExists = checkURLParams(URL_PARAMS_TO_CHECK);

  const [sharedData, setSharedData] = useState<{
    lat: number;
    lng: number;
    pic: Blob;
  }>();

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const shareUrl = await generateShareUrl(
      e.target.files[0],
      48.919945,
      8.463278,
    );

    console.log(shareUrl);
  };

  useLayoutEffect(() => {
    if (urlParamsExists) {
      console.log("urlParamsExists", urlParamsExists);

      const data = parseSharedDataFromFragment();

      if (data) {
        setSharedData(data);
      }
    }
  }, [urlParamsExists]);

  console.log("sharedData", sharedData);

  return (
    <div>
      <input type="file" onChange={uploadImage} />

      {sharedData && (
        <div>
          <img src={URL.createObjectURL(sharedData.pic)} alt="" />
          <p>{sharedData.lat}</p>
          <p>{sharedData.lng}</p>
        </div>
      )}
    </div>
  );
};

export default Map;
