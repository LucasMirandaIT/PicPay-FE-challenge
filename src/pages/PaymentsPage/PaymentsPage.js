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
  TableSortLabel,
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
import TablePagination from "../../components/TablePagination/TablePagination";
import FilterBar from "../../components/FilterBar/FilterBar";
import { toast } from "react-toastify";

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
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);

  const [itemsLimit, setItemsLimit] = useState(10);

  const [filtersActive, setFiltersActive] = useState({});

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");

  const [modalOptions, setModalOptions] = useState({
    visible: false,
    data: {},
    options: {},
  });

  const { t } = useTranslation();

  const paymentsTableHeader = [
    {
      id: "username",
      title: t("global:myPayments:usernameLabel"),
      sortable: true,
      align: "left",
    },
    {
      id: "title",
      title: t("global:myPayments:titleLabel"),
      sortable: true,
      align: "right",
    },
    {
      id: "date",
      title: t("global:myPayments:dateLabel"),
      sortable: true,
      align: "right",
    },
    {
      id: "value",
      title: t("global:myPayments:valueLabel"),
      sortable: true,
      align: "right",
    },
    {
      id: "paid",
      title: t("global:myPayments:paidLabel"),
      sortable: false,
      align: "right",
    },
    {
      id: "actions",
      title: t("global:myPayments:actionsLabel"),
      sortable: false,
      align: "right",
    },
  ];

  const fetchPayments = (currentPage) => {
    axios
      .get(
        `/tasks?_page=${currentPage}&_limit=${itemsLimit}${
          filtersActive ? filtersActive : ""
        }&_sort=${orderBy}&_order=${order}`
      )
      .then(({ data, headers }) => {
        setPayments(data);
        setTotalCount(headers["x-total-count"]);
      })
      .catch((err) => {
        toast(err);
      });
  };

  useEffect(() => {
    fetchPayments(page);
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
          toast(err);
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

  const handleSearchFilter = (event) => {
    let filtersQuery =
      "&" +
      Object.entries(event)
        .map((item) => item.join("="))
        .join("&");
    setFiltersActive(filtersQuery);
    fetchPayments(1);
  };

  const handlePageChange = (evento) => {
    if (
      evento > 0 &&
      evento <= Math.ceil(totalCount / itemsLimit) &&
      evento !== page
    ) {
      setPage(evento);
      fetchPayments(evento);
    }
  };

  const sortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    order && orderBy && fetchPayments(1);
  }, [order, orderBy]);

  return (
    <PageBody
      title={t("global:myPayments:pageTitle")}
      action={renderActionButton()}
    >
      <Box className="pageContent">
        <FilterBar handleFilters={handleSearchFilter} />
        <TableContainer>
          <Table
            className="payments-table"
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {paymentsTableHeader.map((header, i) => (
                  <TableCell
                    key={i}
                    sortDirection={orderBy === header.id ? order : false}
                    align={header.align}
                  >
                    {header.sortable && (
                      <TableSortLabel
                        active={orderBy === header.id}
                        direction={orderBy === header.id ? order : "asc"}
                        onClick={sortHandler(header.id)}
                      >
                        {header.title}
                      </TableSortLabel>
                    )}
                    {!header.sortable && header.title}
                  </TableCell>
                ))}
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
          <TablePagination
            className="pagination-bar"
            totalCount={totalCount}
            currentPage={page}
            pageSize={itemsLimit}
            onPageChange={handlePageChange}
          />
        </TableContainer>
      </Box>

      <Modal open={modalOptions?.visible} onClose={handleCloseModal}>
        <Box sx={style}>{modalOptions?.renderElement?.()}</Box>
      </Modal>
    </PageBody>
  );
};

export default PaymentsPage;
