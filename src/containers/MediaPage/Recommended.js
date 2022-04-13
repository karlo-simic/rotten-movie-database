import c from "./styles/Recommended.module.scss";
import cx from "classnames";
import Section from "components/Section";
import MediaCard from "components/MediaCard";
import CardCarousel from "components/CardsCarousel";

const Recommended = ({ recommended, mediaType }) => {
  if (recommended.total_results === 0) return <></>;

  const results = recommended.results;

  const cardElements = results.map((r) => {
    return (
      <MediaCard
        media={r}
        mediaType={mediaType}
        hideTitle
        key={r.id}
        className={c.card}
      />
    );
  });

  return (
    <Section title="recommended">
      <CardCarousel>{cardElements}</CardCarousel>
    </Section>
  );
};

export default Recommended;
