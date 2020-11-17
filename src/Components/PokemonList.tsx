import React from "react";
import PokemonCard from "./PokemonCard";
import Grid from "@material-ui/core/Grid";
import useFetch from "../Hooks/useFetch";
import useListStyle from "../Styles/ListStyle";
import { Container } from "../Styles/BaseStyle";
import Pagination from './Pagination';


const PokemonList: React.FC= () => {
  const { cardGrid } = useListStyle();

  const { offset, setOffset, data, loadNumber, loading } = useFetch();


  return (
    <React.Fragment>
      <Container className={cardGrid} maxWidth="md">
        {loading ? (
          <div>Loading</div>
        ) : (
          <Grid container spacing={4}>
            {data.results?.map(({ name, url }, index) => (
              <PokemonCard key={`${name}-${index}`} name={name} url={url} />
            ))}
          </Grid>
        )}
      </Container>
     <Pagination offset={offset} count={data.count} loadNumber={loadNumber} setOffset={setOffset}/>
    </React.Fragment>
  );
};

export default PokemonList;
