import { Copy, Link } from "lucide-react";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

import generateShareUrl from "@/helpers/generateShareUrl";

import { Button } from "./ui/button";

interface IGenerateURLProps {
  sharedData: {
    lat: number;
    lng: number;
    pic?: Blob | null;
  };
  file: File | null;
}

const GenerateURL = ({ sharedData, file }: IGenerateURLProps) => {
  const { lat, lng } = sharedData!;

  const [showCopyToClipboardButton, setShowCopyToClipboardButton] =
    useState(false);
  const [textToCopy, setTextToCopy] = useState("");
  const [, copy] = useCopyToClipboard();
  const [copying, setCopying] = useState(false);

  const onGenerateClick = async () => {
    copy("");
    setTextToCopy("");

    const shareUrl = await generateShareUrl(file!, lat, lng);

    if (shareUrl) setTextToCopy(shareUrl);

    setShowCopyToClipboardButton(true);
  };

  const onCopyClick = () => {
    setCopying(true);

    if (textToCopy) copy(textToCopy);

    const timeId = setTimeout(() => {
      setCopying(false);
      setTextToCopy("");

      clearTimeout(timeId);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={onGenerateClick}
        className="w-full"
        disabled={!file || !lat || !lng}
      >
        Generate URL <Link className="size-3.5" />
      </Button>

      {sharedData && file && showCopyToClipboardButton && textToCopy ? (
        <Button onClick={onCopyClick} className="w-full" size="sm">
          <span>{copying ? "Copied!" : "Copy"}</span>
          <Copy className="size-3.5" />
        </Button>
      ) : null}
    </div>
  );
};

export default GenerateURL;
