import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import PageBody from "../../components/PageBody/PageBody";

import moment from "moment";

import "./PaymentsPage.css";
import AddPayment from "../../modals/AddPayment/AddPayment";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import RemovePayment from "../../modals/RemovePayment/RemovePayment";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  maxWidth: "550px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);

  const [modalOptions, setModalOptions] = useState({
    visible: false,
    data: {},
    options: {},
  });

  const { t } = useTranslation();

  const fetchPayments = () => {
    axios.get("/tasks").then(({ data }) => {
      setPayments(data);
    });
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleAddModal = (data = {}) => {
    setModalOptions({
      ...modalOptions,
      data: data,
      visible: true,
      renderElement: () => (
        <AddPayment
          data={data}
          handleClose={handleCloseModal}
          options={modalOptions?.options}
        />
      ),
    });
  };

  const handleRemoveModal = (data = {}) => {
    setModalOptions({
      ...modalOptions,
      data: data,
      visible: true,
      renderElement: () => (
        <RemovePayment
          data={data}
          handleClose={handleCloseModal}
          options={modalOptions?.options}
        />
      ),
    });
  };

  const handleCloseModal = (action) => {
    setModalOptions({ ...modalOptions, visible: false });
    if (action) {
      fetchPayments();
    }
  };

  const renderActionButton = () => {
    return (
      <Button
        variant="contained"
        className="add-button"
        onClick={handleAddModal}
      >
        {t("global:myPayments:addButtonLabel")}
      </Button>
    );
  };

  const changeCheckbox =
    ({ id, ...rest }) =>
    (event) => {
      axios
        .put(`/tasks/${id}`, { id, ...rest, isPaid: event.target.checked })
        .then((res) => {
          fetchPayments();
        })
        .catch((err) => {
          console.error("err ::: ", err);
        });
    };

  const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
    return formattedValue;
  };

  const dateColumn = useCallback(
    (value) => (
      <>
        {moment(value).format("DD MMM YYYY")}
        <br />
        {moment(value).format("LT")}
      </>
    ),
    []
  );

  return (
    <PageBody
      title={t("global:myPayments:pageTitle")}
      action={renderActionButton()}
    >
      <Box className="pageContent">
        <TableContainer>
          <Table
            className="payments-table"
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>{t("myPayments:usernameLabel")}</TableCell>
                <TableCell align="right">
                  {t("global:myPayments:titleLabel")}
                </TableCell>
                <TableCell align="right">
                  {t("global:myPayments:dateLabel")}
                </TableCell>
                <TableCell align="right">
                  {t("global:myPayments:valueLabel")}
                </TableCell>
                <TableCell align="right">
                  {t("global:myPayments:paidLabel")}
                </TableCell>
                <TableCell align="right">
                  {t("global:myPayments:actionsLabel")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((row) => (
                <TableRow key={row.id}>
                  <TableCell scope="row">
                    <p>{row.name}</p>
                    <p>@{row.username}</p>
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{dateColumn(row.date)}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(row.value)}
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox
                      color="primary"
                      checked={row.isPaid}
                      onChange={changeCheckbox(row)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleAddModal(row)}>
                      <EditOutlined />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveModal(row)}>
                      <DeleteOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal open={modalOptions?.visible} onClose={handleCloseModal}>
        <Box sx={style}>{modalOptions?.renderElement?.()}</Box>
      </Modal>
    </PageBody>
  );
};

export default PaymentsPage;
