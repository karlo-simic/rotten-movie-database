import c from "./styles/styles.module.scss";
import cx from "classnames";

import { useParams } from "react-router-dom";
import { BACKDROP_ORIGINAL } from "utils/api-config";

import Container from "components/Container";
import YouTube from "components/YouTube";

/* 

ImageVideoPage

Shown when an image or video URL is accessed via link and it 
shows only that file.
Alternately when the user accesses an image or video by clicking
on a link in a gallery, the 'ImageVideoModal' will be shown instead

*/

const ImageVideoPage = ({ type = "image" }) => {
  const { filePath } = useParams(); // Image path on TMDB server OR Youtube embed ID

  return (
    <Container>
      {type === "image" && (
        <img
          src={`${BACKDROP_ORIGINAL}${filePath}`}
          alt="Movie image"
          className={c.image}
        />
      )}
      {type === "video" && <YouTube embedId={filePath} className={c.video} />}
    </Container>
  );
};

export default ImageVideoPage;
