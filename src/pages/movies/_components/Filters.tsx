import type { FC, ChangeEvent } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";

import variables from "@/styles/_exports.module.scss";
import Dropdown from "@/_components/form/Dropdown";
import Input from "@/_components/form/Input";
import { type AppDispatch } from "@/store";
import { setSearchFilter, setSortingFilter } from "@/store/movies/slice";
import type { SORTING_KEYS } from "@/store/movies/types";
import {
  selectMovieFilterSearch,
  selectMovieFilterSorting,
} from "@/store/movies/selectors";

const Filters: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sortBy = useSelector(selectMovieFilterSorting);
  const searchQuery = useSelector(selectMovieFilterSearch);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SORTING_KEYS;
    dispatch(setSortingFilter(value));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch(setSearchFilter(value));
  };

  return (
    <Container>
      <Dropdown
        value={sortBy}
        onChange={handleSortChange}
        options={[
          { value: "year", name: "Year" },
          { value: "episode", name: "Episode" },
          { value: "totalRating", name: "Total Rating" },
        ]}
      />

      <div className="search-bar-container">
        <Input
          placeholder="Type to filter"
          value={searchQuery}
          width="100%"
          onChange={handleSearchChange}
        />
      </div>
    </Container>
  );
};

export default Filters;

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${variables.size8};
  background-color: ${variables["bg-light"]};
  padding: ${variables.size8} ${variables.size8};
  border-radius: 5px;
  align-items: center;
  margin-block: ${variables.size16} 0;

  .search-bar-container {
    flex: 1;
  }
`;
