import { makeStyles, createStyles } from '@material-ui/core/styles';

const useHeaderStyle = makeStyles((theme) =>
  createStyles({
      root: {
        padding: '2em',
        background: '#79C5F7'
      },
  }),

);

export default useHeaderStyle;
