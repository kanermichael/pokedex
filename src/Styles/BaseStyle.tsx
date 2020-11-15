import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";


const useBaseStyle = makeStyles((theme) =>
  createStyles({
      root: {
        padding: '2em 0 0',
      },
  }),

);


const useLibrary = () => {
 return {Card, Grid, CardActions, CardContent, CardMedia,Container, Chip, Accordion, AccordionSummary, AccordionDetails, Typography, ExpandMoreIcon, Avatar, Button, ButtonGroup}
}

export {useBaseStyle, useLibrary};