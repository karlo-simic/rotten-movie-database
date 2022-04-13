import c from "./styles/About.module.scss";

import {
  formatDate,
  formatCurrency,
  formatArrToStr,
  formatRuntime,
} from "utils/helpers";
import Section from "components/Section";

/* 

About

About component takes object with data received from 'MediaPage' and 
first transforms it's key-value pairs into user friendly strings and 
renders them to the DOM

*/

const About = ({ data }) => {
  const transformedData = {
    tagline: data.tagline,
    rating: data.certificate,
    genres: formatArrToStr(data.genres, "name"),
    releaseDate: formatDate(data.releaseDate),
    firstAirDate: formatDate(data.firstAirDate),
    lastAirDate: formatDate(data.lastAirDate),

    originalTitle:
      data.originalTitle === data.title ? null : data.originalTitle,
    originalName: data.originalName === data.name ? null : data.originalName,

    episodes: data.numberOfEpisodes,
    seasons: data.numberOfSeasons,
    createdBy: formatArrToStr(data.createdBy, "name"),
    budget: formatCurrency(data.budget),
    revenue: formatCurrency(data.revenue),
    runtime: formatRuntime(data.runtime),
    episodeRuntime: formatRuntime(data.episodeRuntime?.[0]),
    languages: formatArrToStr(data.spokenLanguages, "english_name"),
    productionCompanies: formatArrToStr(data.productionCompanies, "name"),
    productionCountries: formatArrToStr(data.productionCountries, "name"),
  };

  const { overview } = data;

  const elements = Object.entries(transformedData).map((e) => {
    if (!e[1]) return;

    const regex = /(^[a-z]*|[A-Z][a-z|0-9]*)/g; // Matches words from camelCaseFormat
    const name = e[0].match(regex).join(" ") + ":";
    const value = e[1];

    return (
      <li key={e[0]} className={c.info}>
        <span className={c.name}>{name}</span>
        <span>{value}</span>
      </li>
    );
  });

  return (
    <Section title="about">
      <p className={c.overview}>{overview}</p>
      <ul className={c.list}>{elements}</ul>
    </Section>
  );
};

export default About;
