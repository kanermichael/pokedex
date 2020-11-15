import { makeStyles, createStyles } from "@material-ui/core/styles";

const useListStyle = makeStyles((theme) =>
  createStyles({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

export default useListStyle
