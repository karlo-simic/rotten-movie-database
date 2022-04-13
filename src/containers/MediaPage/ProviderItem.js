import c from "./styles/ProviderItem.module.scss";
import cx from "classnames";

import { LOGO } from "utils/api-config";

const ProviderItem = ({ provider, link, className }) => {
  const { logoPath, providerName } = provider;

  const imgUrl = `${LOGO}${logoPath}`;

  return (
    <a href={link} target="_blank" className={cx(c.provider, className)}>
      <img src={imgUrl} alt={providerName} />
    </a>
  );
};

export default ProviderItem;
