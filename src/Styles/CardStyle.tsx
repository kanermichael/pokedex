import { Theme, makeStyles } from "@material-ui/core/styles";

const useCardStyle = makeStyles((theme: Theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",

  },

  cardContent: {
    flexGrow: 1,
  },
}));

export default useCardStyle
