interface IImageViewProps {
  pic?: Blob | null;
  alt?: string;
}

const ImageView = ({ pic, alt = "Image Preview" }: IImageViewProps) => {
  if (!pic) return null;

  return <img src={URL.createObjectURL(pic)} alt={alt} />;
};

export default ImageView;
