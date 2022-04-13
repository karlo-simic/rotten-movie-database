import c from "./styles/Images.module.scss";
import cx from "classnames";

import Section from "components/Section";
import ImageItem from "./ImageItem";
import ImagesLink from "./ImagesLink";

const Images = ({ images }) => {
  // Skipping the first img because it's already used in the header
  const total = images.backdrops.length - 1;

  if (total <= 0) return <></>;

  // Slice out 1-3 images (2 will be used as regular image, 1 as link to gallery)
  const imagesSlice = images.backdrops.slice(1, total < 4 ? total + 1 : 4);

  const imageElements = imagesSlice.map((img, i, arr) => {
    // Return 3rd image as a link to gallery
    if (i === 2)
      return (
        <ImagesLink
          totalImages={total}
          imgPath={img.file_path}
          key={img.file_path}
        />
      );

    return <ImageItem imgPath={img.file_path} key={img.file_path} />;
  });

  return (
    <Section title="gallery" link="images">
      <ul className={c.grid}>{imageElements}</ul>
    </Section>
  );
};

export default Images;
