import { useLocalStorageState } from "ahooks";

const useFirstVisit = () => {
  const [firstVisit, setFirstVisit] = useLocalStorageState<string | undefined>(
    "point-and-pic-first-visit",
    {
      defaultValue: "true",
    },
  );

  const isFirstVisit = firstVisit === "true";

  return { isFirstVisit, setFirstVisit };
};

export default useFirstVisit;
