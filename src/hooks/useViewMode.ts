import { URL_PARAMS_TO_CHECK } from "@/constants";
import checkURLParams from "../helpers/checkURLParams";

const useViewMode = () => {
  const urlParamsExists = checkURLParams(URL_PARAMS_TO_CHECK);

  return {
    viewMode: urlParamsExists,
  };
};

export default useViewMode;
