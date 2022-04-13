import c from "./styles/Seasons.module.scss";
import cx from "classnames";

import Section from "components/Section";
import SeasonItem from "./SeasonItem";
import Accordion from "components/Accordion";

const Seasons = ({ seasons }) => {
  if (!seasons || seasons?.length === 0) return <></>;

  const cardElements = seasons.map((s) => {
    return (
      <li key={s.id} className={c.card}>
        <SeasonItem season={s} />
      </li>
    );
  });

  return (
    <Section title="seasons">
      <SeasonItem season={seasons.at(-1)} className={c.first} />
      {seasons.length > 1 && (
        <Accordion title="show all">
          <ul>{cardElements}</ul>
        </Accordion>
      )}
    </Section>
  );
};

export default Seasons;
