import React from "react";
import Typography from "@material-ui/core/Typography";
import useHeaderStyle from "../Styles/HeaderStyle";

const Header = () => {
  const { root } = useHeaderStyle();
  return (
    <header className={root}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Pokedex
      </Typography>
    </header>
  );
};

export default Header;
