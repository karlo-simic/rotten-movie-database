import c from "./styles/Cast.module.scss";
import cx from "classnames";

import Section from "components/Section";
import PersonCard from "components/PersonCard";

const Cast = ({ cast }) => {
  const castSlice = cast.cast.slice(0, 6);

  if (castSlice.length === 0) return <></>;

  const elements = castSlice.map((person) => {
    return (
      <li key={person.id}>
        <PersonCard person={person} />
      </li>
    );
  });

  return (
    <Section title="cast" link="cast">
      <ul className={c.list}>{elements}</ul>
    </Section>
  );
};

export default Cast;
