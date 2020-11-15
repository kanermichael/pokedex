import React, { SyntheticEvent } from "react";
import PokemonCard from "./PokemonCard";
import Grid from "@material-ui/core/Grid";
import useFetch from "../Hooks/useFetch";
import useListStyle from "../Styles/ListStyle";
import { useLibrary } from "../Styles/BaseStyle";

const PokemonList: React.FC = () => {
  const { cardGrid, root } = useListStyle();
  const { Container, Button, ButtonGroup } = useLibrary();

  const { offset, setOffset, data, loadNumber, loading } = useFetch();

  const handleNextPage = (e: SyntheticEvent) => {
    e.preventDefault();

    if (offset + loadNumber <= data.count) {
      setOffset(loadNumber + offset);
    }
  };
  const handlePrevPage = (e: SyntheticEvent) => {
    e.preventDefault();

    if (offset - loadNumber >= 0) {
      setOffset(offset - loadNumber);
    }
  };

  return (
    <React.Fragment>
      <Container className={cardGrid} maxWidth="md">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <Grid container spacing={4}>
            {data.results?.map(({ name, url }, index) => (
              <PokemonCard key={`${name}-${index}`} name={name} url={url} />
            ))}
          </Grid>
        )}
      </Container>
      <div className={root}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={handlePrevPage} disabled={offset - loadNumber < 0}>
            prev page
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={offset + loadNumber >= data.count}
          >
            next page
          </Button>
        </ButtonGroup>
      </div>
    </React.Fragment>
  );
};

export default PokemonList;
