import React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import useEvolution from "../Hooks/useEvolution";
import { Link } from "react-router-dom";
import useDetailStyle from "../Styles/DetailStyle";
import { useLibrary } from "../Styles/BaseStyle";
import { IPokeDetailsTypes } from '../Types/DetailTypes';

type PokeDetailParams = {
  name: string;
};
type PokeDetailProps = RouteComponentProps<PokeDetailParams>;


const PokeDetails: React.FC<PokeDetailProps> = ({ match }) => {
  const {
    root,
    pokemon,
    details,
    accordionSection,
    heading,
  } = useDetailStyle();
  const {
    Container,
    Chip,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    ExpandMoreIcon,
    Avatar,
  } = useLibrary();

  const [pokeDetailsState, setPokeDetailsState] = React.useState<
    IPokeDetailsTypes
  >();
  const [EvolutionUrl, setEvolutionUrl] = React.useState("");
  const evolutionData = useEvolution(EvolutionUrl);

  React.useEffect(() => {
    let ignore = false;
    const getPokemonDetails = async () => {
      try {
        const getDetails = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${match.params.name}/`
        );
        const getEvolutionChain = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${getDetails.data.name}/`
        );

        setEvolutionUrl(getEvolutionChain.data.evolution_chain.url);

        if (!ignore) {
          setPokeDetailsState(getDetails);
        }
      } catch (err) {
        throw Error("fetching data not succeded");
      }
    };
    getPokemonDetails();

    return () => {
      ignore = true;
    };
  }, []);

  const { name, order, sprites, abilities, types, stats, moves } =
    pokeDetailsState?.data || {};

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <div className={root}>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            {name}
          </Typography>
          <Typography variant="h4" component="h3" align="center" gutterBottom>
            #{order}
          </Typography>
          <img src={sprites?.front_default} alt={name} className={pokemon} />
         
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
                    <li key={`${index}`}>
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
                        <Link to={`/pokemon/${evolution.name}`}>
                        <Typography variant="h4" component="h4" align="center" gutterBottom>
                        {evolution.name}
                        </Typography>
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution.id}.png`}
                          ></img>
                        </Link>
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
                <li key={`${index}`}>
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
                <li key={`${index}`}>
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
                <li key={`${index}`}>
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
