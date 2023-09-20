import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapperComponent from "app/components/page-wrapper";
import NoPage from "app/pages/404";
import { IUser } from "app/types";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CSSBorder, CSSPadding } from "app/styles/constants";
import AdminCellComponent from "./components/admin-cell";
import BlockCellComponent from "./components/block-cell";
import { deleteUser, getUsers } from "./store/slice";
import styles from "app/styles/animations.module.css";

export const AdminPage = () => {
  const isAdmin = useAppSelector((state) => state.core.isAdmin);
  const { loading, users } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAdmin) {
      dispatch(getUsers());
    }
  }, [dispatch, isAdmin]);

  if (loading) return <div className={styles.loading} />;
  if (!isAdmin) return <NoPage />;

  return (
    <PageWrapperComponent>
      <Box padding={CSSPadding.Decent} sx={{ overflow: "auto" }}>
        <Table border={CSSBorder.Tiny}>
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
