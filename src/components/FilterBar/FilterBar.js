import { Tune } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import "./FilterBar.css";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { useTranslation } from "react-i18next";
import moment from "moment";

const FilterBar = ({ handleFilters }) => {
  const [filters, setFilters] = useState({
    username: "",
    title: "",
    value_lte: "",
    value_gte: "",
    isPaid: [true, false],
    date_gte: null,
    date_lte: null,
  });

  const [isCollapsedFilterbar, setIsCollapsedFilterbar] = useState(true);

  const { t } = useTranslation();

  const toggleCollapseFilterbar = () => {
    setIsCollapsedFilterbar(!isCollapsedFilterbar);
  };

  const handleChange = (type) => (event) => {
    const value = type.toLowerCase().includes("date")
      ? moment(event).format("yyyy-MM-DD")
      : event.target.value;
    setFilters({ ...filters, [type]: value });
  };

  function isEmpty(obj) {
    return obj === "" || obj === null || obj === undefined || obj === {};
  }

  const clearFilters = () => {
    handleFilters({});
    toggleCollapseFilterbar();
  };

  const sendFilters = () => {
    let filteredFilters = Object.assign({}, filters);
    for (const key in filteredFilters) {
      if (
        isEmpty(filteredFilters[key]) ||
        (key == "isPaid" && filteredFilters[key].length === 2)
      )
        delete filteredFilters[key];
      //   if(filteredFilters[key])
    }

    handleFilters(filteredFilters);
  };

  return (
    <div
      className={`filterbar-container ${
        isCollapsedFilterbar ? "collapsed" : ""
      }`}
    >
      {isCollapsedFilterbar && (
        <Button variant="contained" onClick={toggleCollapseFilterbar}>
          <Tune className="tune-icon" />
          Filtrar
        </Button>
      )}
      {!isCollapsedFilterbar && (
        <section className="filters-box">
          <FormControl className="filter-container" variant="outlined">
            <InputLabel htmlFor="pageHeader-search-input">Usuários</InputLabel>
            <OutlinedInput
              id="pageHeader-search-input"
              type="text"
              value={filters.username}
              onChange={handleChange("username")}
            />
          </FormControl>
          <FormControl className="filter-container" variant="outlined">
            <InputLabel htmlFor="pageHeader-search-input">Título</InputLabel>
            <OutlinedInput
              id="pageHeader-search-input"
              type="text"
              value={filters.title}
              onChange={handleChange("title")}
            />
          </FormControl>

          <FormControl className="filter-container">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={t("global:filters:startDateLabel")}
                value={filters.date_gte}
                onChange={handleChange("date_gte")}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl className="filter-container">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={t("global:filters:endDateLabel")}
                value={filters.date_lte}
                onChange={handleChange("date_lte")}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl className="filter-container" variant="outlined">
            <InputLabel htmlFor="pageHeader-minValue-input">
              Valor Mínimo
            </InputLabel>
            <OutlinedInput
              id="pageHeader-minValue-input"
              type="text"
              value={filters.value_gte}
              onChange={handleChange("value_gte")}
            />
          </FormControl>

          <FormControl className="filter-container" variant="outlined">
            <InputLabel htmlFor="pageHeader-maxValue-input">
              Valor Máximo
            </InputLabel>
            <OutlinedInput
              id="pageHeader-maxValue-input"
              type="text"
              value={filters.value_lte}
              onChange={handleChange("value_lte")}
            />
          </FormControl>
          <FormControl className="filter-container">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              multiple
              value={filters.isPaid}
              label="Status"
              onChange={handleChange("isPaid")}
            >
              <MenuItem value={true}>Paid</MenuItem>
              <MenuItem value={false}>Not Paid</MenuItem>
            </Select>
          </FormControl>
          <div className="buttons-container">
            <Button
              variant="outlined"
              onClick={clearFilters}
              sx={{ marginRight: "15px" }}
            >
              Limpar
            </Button>
            <Button variant="contained" onClick={sendFilters}>
              Filtrar
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default FilterBar;
