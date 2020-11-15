import React from "react";
import { Link } from "react-router-dom";
import useCardStyle from "../Styles/CardStyle";
import { useLibrary } from "../Styles/BaseStyle";

interface Props {
  name: string;
  url: string;
}

const PokemonCard: React.FC<Props> = ({ name, url }) => {

  const { cardMedia, card, cardContent } = useCardStyle();
  const { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions} = useLibrary();

  const regex: RegExp = /\/\d+(?=\/)/;
  const pokeID = url.match(regex) ?? ""[0].replace("/", "");

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={card}>
          <CardMedia
            className={cardMedia}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${pokeID}.png`}
            title="Image title"
          />
          <CardContent className={cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/pokemon/${name}`}>
              <Button size="small" color="primary">
                View details
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default PokemonCard;
