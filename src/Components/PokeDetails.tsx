import React from "react";
import axios from "axios";
import useEvolution from "../Hooks/useEvolution";
import useDetailStyle from "../Styles/DetailStyle";
import {
  Container,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ExpandMoreIcon,
  Avatar,
} from "../Styles/BaseStyle";
import { IPokeDetailsTypes } from "../Types/DetailTypes";
import Skeleton from "@material-ui/lab/Skeleton";

type PokeDetailParams = {
  pokename: string;
};

const PokeDetails: React.FC<PokeDetailParams> = ({ pokename }) => {
  const {
    root,
    pokemon,
    details,
    link,
    accordionSection,
    heading,
  } = useDetailStyle();

  const [pokeDetailsState, setPokeDetailsState] = React.useState<
    IPokeDetailsTypes
  >();
  const [EvolutionUrl, setEvolutionUrl] = React.useState("");
  const evolutionData = useEvolution(EvolutionUrl);
  const mountedRef = React.useRef(false) 

  React.useEffect(() => {
    
    mountedRef.current = true
    const getPokemonDetails = async () => {
      try {
        const getDetails = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokename}/`
        );
        const getEvolutionChain = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${getDetails.data.name}/`
        );
        if (mountedRef.current) {
          setEvolutionUrl(getEvolutionChain.data.evolution_chain.url);
          setPokeDetailsState(getDetails);
        }
      } catch (err) {
        throw Error(`fetching data ${err}`);
      }
    };
    getPokemonDetails();

    return () => {
      mountedRef.current = false
    };
  }, [pokename]);

  const { name, order, sprites, abilities, types, stats, moves } =
    pokeDetailsState?.data || {};

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <div className={root}>
          {name ? (
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              {name}
            </Typography>
          ) : (
            <Skeleton variant="rect" width={200} height={20} animation="wave" />
          )}

          <Typography variant="h4" component="h3" align="center" gutterBottom>
            #{order}
          </Typography>
          {sprites ? (
            <img src={sprites?.front_default} alt={name} className={pokemon} />
          ) : (
            <Skeleton
              variant="rect"
              width={210}
              height={118}
              animation="wave"
            />
          )}

          <section className={accordionSection}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="sheader"
              >
                <Typography className={heading}>{name}`s moves</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul className={details}>
                  {moves?.map(({ move }, index) => (
                    <li key={`${move}-${index}`}>
                      <Chip avatar={<Avatar>M</Avatar>} label={move.name} />
                    </li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </section>
          <section className={accordionSection}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={heading}>{name}`s evolutions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul className={details}>
                  {evolutionData &&
                    evolutionData?.map((evolution, index) => (
                      <li key={`${evolution}-${index}`}>
                        <a href={`/pokemon/${evolution.name}`} className={link}>
                          <Typography
                            variant="h6"
                            component="h6"
                            align="center"
                            gutterBottom
                          >
                            {evolution.name}
                          </Typography>
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png`}
                            alt={evolution.name}
                          ></img>
                        </a>
                      </li>
                    ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </section>
          <section>
            <Typography variant="h4" component="h3" align="center" gutterBottom>
              Abilities
            </Typography>
            <ul className={details}>
              {abilities?.map((details, index) => (
                <li key={`${details}-${index}`}>
                  <Chip label={details.ability.name} />
                </li>
              ))}
            </ul>
          </section>
          <section>
            <Typography variant="h4" component="h3" align="center" gutterBottom>
              Types
            </Typography>
            <ul className={details}>
              {types?.map((type, index) => (
                <li key={`${type}-${index}`}>
                  <Chip label={type.type.name} />
                </li>
              ))}
            </ul>
          </section>
          <section>
            <Typography variant="h4" component="h3" align="center" gutterBottom>
              Stats
            </Typography>
            <ul className={details}>
              {stats?.map(({ base_stat, stat }, index) => (
                <li key={`${base_stat}-${index}`}>
                  <Chip label={`${stat.name}:${base_stat}`} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default PokeDetails;
