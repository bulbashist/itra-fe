import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { compositionsURL } from "app/constants/urls";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  compId: number | null;
  setCompId: Function;
  setModal: Function;
};

export const AdminPanel = ({ compId, setCompId, setModal }: Props) => {
  const { t } = useTranslation();
  const [hints, setHints] = useState([]);

  useEffect(() => {
    axios
      .get(compositionsURL + "hints")
      .then((resp) => setHints(resp.data))
      .catch(console.error);
  });

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item xs={12} md={8}>
          <Autocomplete
            sx={{ minWidth: "250px" }}
            options={hints.map((hint: any) => ({
              label: hint.name,
              value: hint.id,
            }))}
            renderInput={(params) => (
              //@ts-ignore
              <TextField {...params} />
            )}
            onChange={(_, option) => setCompId(option?.value)}
            isOptionEqualToValue={(opt1, opt2) => opt1?.value === opt2?.value}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button onClick={() => setModal(true)} disabled={!compId}>
            {t("user_create_review")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
