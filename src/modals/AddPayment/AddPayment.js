import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "./AddPayment.css";
import { useTranslation } from "react-i18next";

const AddPayment = ({ data, handleClose, options }) => {
  const [values, setValues] = useState({
    username: "",
    value: "",
    date: "",
    title: "",
  });
  const { t } = useTranslation();

  useEffect(() => {
    data && setValues(data);
  }, [data]);

  const handleChange = (input) => (event) => {
    setValues({
      ...values,
      [input]: input !== "date" ? event.target.value : event,
    });
  };

  const savePayment = () => {
    if (data.id) {
      axios
        .put(`/tasks/${data.id}`, values)
        .then((res) => {
          handleClose("update");
        })
        .catch((err) => {
          console.error("Error ::: ", err);
        });
    } else {
      axios
        .post(`/tasks`, values)
        .then((res) => {
          handleClose("create");
        })
        .catch((err) => {
          console.error("Error ::: ", err);
        });
    }
  };

  return (
    <section className="modal-body">
      <h3 className="title">{t("global:myPayments:pageTitle")}</h3>
      <Grid container spacing={2} className="informations">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="login-input"
            label={t("global:myPayments:nameLabel")}
            required
            value={values?.name}
            onChange={handleChange("name")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="login-input"
            label={t("global:myPayments:usernameLabel")}
            required
            value={values?.username}
            onChange={handleChange("username")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="login-input"
            label={t("global:myPayments:titleLabel")}
            value={values?.title}
            onChange={handleChange("title")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="value-input">
              {t("global:myPayments:valueLabel")} *
            </InputLabel>
            <OutlinedInput
              id="value-input"
              label={t("global:myPayments:valueLabel")}
              required
              value={values?.value}
              onChange={handleChange("value")}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label={t("global:myPayments:dateLabel")}
              value={values?.date}
              onChange={handleChange("date")}
              renderInput={(params) => (
                <TextField sx={{ width: "100%" }} {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <section className="footer">
        <Button
          variant="contained"
          className="cancel-button"
          onClick={handleClose}
        >
          {t("global:cancelButtonLabel")}
        </Button>
        <Button
          variant="contained"
          className="confirm-button"
          onClick={savePayment}
        >
          {t("global:saveButtonLabel")}
        </Button>
      </section>
    </section>
  );
};

export default AddPayment;
