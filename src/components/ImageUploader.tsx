import { ImageIcon } from "lucide-react";

import { useEffect } from "react";

import { useFileUpload } from "@/hooks/useFileUpload";

import { Button } from "./ui/button";

interface ImageUploaderProps {
  fileChangeHandler: (files: File) => void;
  deleteHandler?: () => void;
}

const ImageUploader = ({
  fileChangeHandler,
  deleteHandler,
}: ImageUploaderProps) => {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  useEffect(() => {
    if (files.length > 0) {
      fileChangeHandler(files[0].file as File);
    }
  }, [files, openFileDialog]);

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <div className="inline-flex items-center gap-2 align-top">
        <div
          className="border-input relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border"
          aria-label={
            previewUrl ? "Preview of uploaded image" : "Default image preview"
          }
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={100}
              height={100}
            />
          ) : (
            <div aria-hidden="true">
              <ImageIcon className="opacity-60" size={16} />
            </div>
          )}
        </div>

        <div className="relative inline-block">
          <Button onClick={openFileDialog} aria-haspopup="dialog">
            {fileName ? "Change image" : "Upload image"}
          </Button>
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
            tabIndex={-1}
          />
        </div>
      </div>

      {fileName && (
        <div className="inline-flex gap-2 text-xs">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              removeFile(files[0]?.id);
              deleteHandler?.();
            }}
            className="font-medium"
            aria-label={`Remove ${fileName}`}
            variant="destructive"
            size="sm"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
