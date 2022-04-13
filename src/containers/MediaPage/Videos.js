import c from "./styles/Videos.module.scss";

import { useLocation } from "react-router-dom";
import Section from "components/Section";
import VideoCard from "components/VideoCard";
import CardCarousel from "components/CardsCarousel";

const Videos = ({ videos }) => {
  const location = useLocation();

  if (!videos || videos?.results.length === 0) return <></>;

  const elements = videos.results.map((v) => {
    return (
      <VideoCard
        video={v}
        to={`videos/${v.key}`}
        state={{ backgroundLocation: location }}
        key={v.key}
        className={c.video}
      />
    );
  });

  return (
    <Section title="videos" link="videos">
      <CardCarousel>{elements}</CardCarousel>
    </Section>
  );
};

export default Videos;
