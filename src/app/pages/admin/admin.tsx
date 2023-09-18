import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { IUser } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteUser, getUsers } from "./store/slice";
import NoPage from "../404";
import PageWrapperComponent from "../../components/page-wrapper";
import { CSSPadding } from "../../styles/constants";
import DeleteForever from "@mui/icons-material/DeleteForever";
import AdminCellComponent from "./components/admin-cell";
import { Link } from "react-router-dom";
import BlockCellComponent from "./components/block-cell";
import { useTranslation } from "react-i18next";

export const AdminPage = () => {
  const isAdmin = useAppSelector((state) => state.core.isAdmin);
  const users = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAdmin) {
      dispatch(getUsers());
    }
  }, [dispatch, isAdmin]);

  if (!isAdmin) return <NoPage />;

  return (
    <PageWrapperComponent>
      <Box padding={CSSPadding.Decent} sx={{ overflow: "auto" }}>
        <Table border={1}>
          <TableHead>
            <th>id</th>
            <th>{t("admin_login")}</th>
            <th>{t("admin_name")}</th>
            <th>{t("admin_block_state")}</th>
            <th>{t("admin_admin_state")}</th>
            <th>{t("admin_delete")}</th>
          </TableHead>
          <TableBody>
            {users.map((user: IUser) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell align="center">
                  <Link to={`/users/${user.id}`}>{user.login}</Link>
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">
                  <BlockCellComponent user={user} />
                </TableCell>
                <TableCell align="center">
                  <AdminCellComponent user={user} />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => dispatch(deleteUser(user.id))}
                  >
                    <DeleteForever />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PageWrapperComponent>
  );
};
