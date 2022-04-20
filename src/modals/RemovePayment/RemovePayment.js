import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import moment from "moment";
import "./RemovePayment.css";
import { useTranslation } from "react-i18next";

const RemovePayment = ({ data, handleClose }) => {
  const [values, setValues] = useState({
    user: "",
    value: "",
    date: "",
    title: "",
  });

  const { t } = useTranslation();

  useEffect(() => {
    data &&
      setValues({
        id: data.id,
        user: data.username,
        title: data.title,
        value: data.value,
        date: data.date,
      });
  }, [data]);

  const removePayment = () => {
    axios
      .delete(`/tasks/${values.id}`)
      .then((res) => {
        handleClose("remove");
      })
      .catch((err) => console.error("Delete ERROR ::: ", err));
  };

  return (
    <section className="modal-body">
      <h3 className="title">{t('global:removePaymentPageTitle')}</h3>

      <section className="payment-data">
        <p>{t('global:myPayments:usernameLabel')}: {values.user} </p>
        <p>{t('global:myPayments:dateLabel')}: {moment(values.date).format("DD/MM/yyyy")}</p>
        <p>{t('global:myPayments:valueLabel')}: {values.value}</p>
      </section>

      <section className="footer">
        <Button
          variant="contained"
          className="cancel-button"
          onClick={handleClose}
        >
          {t('global:cancelButtonLabel')}
        </Button>
        <Button
          variant="contained"
          className="confirm-button"
          onClick={removePayment}
        >
         {t('global:saveButtonLabel')}
        </Button>
      </section>
    </section>
  );
};

export default RemovePayment;
