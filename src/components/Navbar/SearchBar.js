import c from "./styles/SearchBar.module.scss";
import cx from "classnames";

import { forwardRef, useRef, useImperativeHandle } from "react";
import useSearch from "hooks/use-search";

import { Search } from "react-bootstrap-icons";

const SearchBar = ({ variant, onBlur, className }, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      focus: () => inputRef.current.focus(),
    };
  });

  const { search } = useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = inputRef.current.value;

    if (!query.trim()) return;

    search(query);
    inputRef.current.blur();
  };

  return (
    <form className={cx(c.form, c[variant], className)} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Movies & TV Shows"
        ref={inputRef}
        onBlur={onBlur}
      />
      <button type="submit">
        <Search />
      </button>
    </form>
  );
};

export default forwardRef(SearchBar);
