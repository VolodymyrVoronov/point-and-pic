import { useState, type ReactNode } from "react";
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
  children?: ReactNode;
}

const GenerateURL = ({ sharedData, file, children }: IGenerateURLProps) => {
  const { lat, lng, pic } = sharedData!;

  const [showCopyToClipboardButton, setShowCopyToClipboardButton] =
    useState(false);
  const [textToCopy, setTextToCopy] = useState("");
  const [copiedText, copy] = useCopyToClipboard();

  const onGenerateClick = async () => {
    const shareUrl = await generateShareUrl(file!, lat, lng);

    if (shareUrl) setTextToCopy(shareUrl);

    setShowCopyToClipboardButton(true);
  };

  const onCopyClick = () => copy(textToCopy);

  return (
    <div className="flex flex-col gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={onGenerateClick}
        className="w-full"
        disabled={!file || !lat || !lng}
      >
        Generate URL
      </Button>

      {sharedData && file && showCopyToClipboardButton && textToCopy ? (
        <Button
          onClick={onCopyClick}
          className="w-full"
          size="sm"
          variant="secondary"
        >
          <span>{copiedText ? "Copied!" : "Copy"}</span>
        </Button>
      ) : null}

      {pic && showCopyToClipboardButton && textToCopy ? children : null}
    </div>
  );
};

export default GenerateURL;
