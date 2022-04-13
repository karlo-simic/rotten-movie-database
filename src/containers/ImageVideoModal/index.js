import c from "./styles/styles.module.scss";
import cx from "classnames";

import ReactDOM from "react-dom";
import { useEffect } from "react";
import { BACKDROP_ORIGINAL } from "utils/api-config";
import { useParams, useNavigate } from "react-router-dom";

import YouTube from "components/YouTube";
import { XLg } from "react-bootstrap-icons";

/* 

ImageVideoModal

This modal is shown when the user clicks on an image or a video, it
uses URL to get image file path or video key.
But in case that the same URL is accessed via link 'ImageVideoPage'
component is rendered instead of a modal.

*/

const ImageVideoModal = ({ type = "image" }) => {
  const { filePath } = useParams();

  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleEsc = (e) => {
    if (e.key === "Escape") handleClose();
  };

  useEffect(() => {
    // On component load...
    document.body.classList.add("disable-scroll"); // Disable scroll on body
    document.addEventListener("keydown", handleEsc); // Make esc key a back button
    return () => {
      // On component unload remove changes
      document.body.classList.remove("disable-scroll");
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={c.modal}>
      {type === "image" && (
        <img
          src={`${BACKDROP_ORIGINAL}/${filePath}`}
          alt="Movie image"
          className={c.image}
        />
      )}
      {type === "video" && <YouTube embedId={filePath} className={c.video} />}
      <button type="button" className={c.closeBtn} onClick={handleClose}>
        <XLg />
      </button>
      <div className={c.overlay} onClick={handleClose} />
    </div>,
    document.body
  );
};

export default ImageVideoModal;
