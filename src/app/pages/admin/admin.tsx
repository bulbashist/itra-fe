import { Slider, Table } from "@mui/material";
import axios from "axios";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IUser } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeUser, getUsers } from "./store/slice";
import NoPage from "../404";
import PageWrapperComponent from "../../components/page-wrapper";
import { CSSMargin } from "../../styles/constants";

const columns: GridColDef<never>[] = [
  { field: "id" },
  { field: "name" },
  { field: "login" },
];

export const AdminPage = () => {
  const isAdmin = useAppSelector((state) => state.core.isAdmin);
  const users = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAdmin) {
      dispatch(getUsers());
    }
  }, [dispatch, isAdmin]);

  if (!isAdmin) return <NoPage />;

  return (
    <PageWrapperComponent>
      <Table border={1}>
        <thead>
          <th>id</th>
          <th>login</th>
          <th>name</th>
          <th>block</th>
          <th>admin</th>
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.login}</td>
              <td>{user.name}</td>

              <td>
                <Slider
                  min={0}
                  max={1}
                  value={Number(user.isBlocked)}
                  onChange={(_, value) => {
                    dispatch(
                      changeUser({
                        id: user.id,
                        dto: {
                          isBlocked: Boolean(value),
                        },
                      })
                    );
                  }}
                />
              </td>
              <td>
                <Slider
                  min={0}
                  max={1}
                  value={Number(user.isAdmin)}
                  onChange={(_, value) => {
                    dispatch(
                      changeUser({
                        id: user.id,
                        dto: { isAdmin: Boolean(value) },
                      })
                    );
                  }}
                />
                {/* dispatch to server */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PageWrapperComponent>
  );
};

/*

список каждый юзер нажимается выпадает список его обзоров
удалить заблокировать просмотр назначить админом
*/
