import c from "./styles/Providers.module.scss";
import cx from "classnames";

import Section from "components/Section";
import ProviderItem from "./ProviderItem";

const Providers = ({ providers }) => {
  // US providers
  const results = providers.results["US"]?.flatrate || null;
  const link = providers.results["US"]?.link || null; // Link to TMDB page (api doesn't provide actual links to providers)

  if (!results) return <></>;

  const elements = results.map((r) => {
    const data = {
      logoPath: r.logo_path,
      providerName: r.provider_name,
    };

    return (
      <li key={r.provider_id} className={c.item}>
        <ProviderItem provider={data} link={link} />
      </li>
    );
  });

  return (
    <Section title="watch on">
      <p className={c.credit}>Data provided by JustWatch</p>
      <ul className={c.list}>{elements}</ul>
    </Section>
  );
};

export default Providers;
