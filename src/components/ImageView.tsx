import { useEffect, useMemo } from "react";

interface IImageViewProps {
  pic?: Blob | null;
  alt?: string;
}

const ImageView = ({ pic, alt = "Image Preview" }: IImageViewProps) => {
  const imageUrl = useMemo(() => {
    return pic ? URL.createObjectURL(pic) : undefined;
  }, [pic]);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  if (!pic) return null;

  return <img src={imageUrl} alt={alt} />;
};

export default ImageView;
