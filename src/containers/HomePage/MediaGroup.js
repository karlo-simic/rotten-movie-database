import c from "./styles/MediaGroup.module.scss";
import cx from "classnames";

import useHttp from "hooks/use-http";
import { useEffect } from "react";
import CardsCarousel from "components/CardsCarousel";
import MediaCard from "components/MediaCard";
import LoadingSpinner from "components/LoadingSpinner";

const MediaGroup = ({ title, url, mediaType, className }) => {
  const { loading, data, error, sendRequest } = useHttp(true);

  useEffect(() => {
    sendRequest({ url });
  }, [url]);

  return (
    <article className={c.group}>
      <h5 className={c.title}>{title}</h5>

      {loading && (
        <div className={c.loading}>
          <LoadingSpinner />
        </div>
      )}

      {!loading && !error && data && (
        <CardsCarousel>
          {data.results.map((m) => (
            <MediaCard
              media={m}
              key={m.id}
              className={c.card}
              mediaType={mediaType}
            />
          ))}
        </CardsCarousel>
      )}
    </article>
  );
};

export default MediaGroup;
