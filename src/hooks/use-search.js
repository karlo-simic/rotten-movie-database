import { useDebugValue } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

/* 

useSearch

Logic for changing URL parameters which 'SearchPage' then reads and
sends requests accordingly. 

Available parameters:
'query'
'page'
'type'             - type of media ('movie' or 'tv')

Available methods:
'search'           - search for new query, will keep the same type
                     parameter but page will reset to 1
'changeType'       - change to different mediaType ('media' or 'tv')
'changePage'       - change to a specific page
'nextPage'         - change to next page
'prevPage'         - change to previous page

*/

const useSearch = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");

  const page = searchParams.get("page");

  const type = searchParams.get("type");

  useDebugValue([query, type, page]);

  const setParams = (query, type, page) => {
    setSearchParams({
      ...(query && { query }),
      ...(type && { type }),
      ...(page && { page }),
    });
  };

  const search = (newQuery) => {
    if (!newQuery.trim()) return;
    navigate(`search/?query=${newQuery}${type ? `&type=${type}` : ""}`);
  };

  const changeType = (newType) => {
    setParams(query, newType, null);
  };

  const nextPage = () => {
    const newPage = page ? +page + 1 : 2;
    setParams(query, type, newPage);
  };

  const prevPage = () => {
    if (page <= 1) return;
    const newPage = page - 1;
    setParams(query, type, newPage);
  };

  const changePage = (newPage) => {
    setParams(query, type, newPage);
  };

  return {
    query,
    page,
    type,
    search,
    changeType,
    changePage,
    nextPage,
    prevPage,
  };
};

export default useSearch;
