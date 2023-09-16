import { useAppSelector } from "../../../../hooks";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Rating } from "@mui/material";

export const ReviewsListComponent = () => {
  const reviews = useAppSelector((state) => state.user?.reviews);
  const { t } = useTranslation();

  if (!reviews) return null;

  const fields: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: t("user_reviews_table_review"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const { id, title } = params.row;
        return <Link to={`/reviews/${id}`}>{title}</Link>;
      },
    },
    {
      field: "name",
      headerAlign: "center",
      headerName: t("user_reviews_table_composition"),
      flex: 1,
      align: "center",
      renderCell: (params) => {
        const { id, name } = params.row.composition;
        return <Link to={`/compositions/${id}`}>{name}</Link>;
      },
    },
    {
      field: "avgRating",
      headerName: t("user_reviews_table_avg_rating"),
      headerAlign: "center",
      flex: 1,
      align: "center",

      renderCell: (params) => (
        <Rating value={params.row.avgRating / 2} precision={0.5} readOnly />
      ),
    },
  ];

  return <DataGrid columns={fields} rows={reviews}></DataGrid>;
};
