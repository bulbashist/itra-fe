import { useAppSelector } from "../../../../hooks";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Rating10 } from "../../../../components/rating";
import { Box } from "@mui/material";

export const ReviewsListComponent = () => {
  const reviews = useAppSelector((state) => state.user.data?.reviews);
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
      minWidth: 150,
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
      minWidth: 150,
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
      minWidth: 200,
      flex: 1,
      align: "center",

      renderCell: (params) => (
        <Rating10 value={params.row.avgRating} readOnly />
      ),
    },
  ];

  return (
    <Box sx={{ overflow: "auto" }}>
      <DataGrid
        columns={fields}
        rows={reviews}
        hideFooter
        sx={{ minHeight: 100 }}
      />
    </Box>
  );
};
