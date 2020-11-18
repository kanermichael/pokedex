import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useDetailStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: "3em",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
    },

    accordionSection: {
      width: "100%",
    },

    link: {
      textDecoration: "none",
      color: "#569AB0",
    },

    details: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "space-around",
      listStyle: "none",
      alignItems: "center",
      paddingLeft: "0",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    pokemon: {
      width: "30%",
    },
  })
);

export default useDetailStyle;
