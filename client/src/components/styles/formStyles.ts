import { createStyles, Theme } from '@material-ui/core'

export const formStyles = (theme: Theme) =>
  createStyles({
    layout: {
      width: 'auto',
      [theme.breakpoints.up(524)]: {
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    paper: {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column', // prevent all from being on one line
      alignItems: 'center',
      padding: `${theme.spacing(2, 3, 3)}`
    },
    avatar: {
      margin: theme.spacing(1),
      width: 48,
      height: 48,
      backgroundColor: theme.palette.secondary.main
    },
    submit: {
      marginTop: theme.spacing(3)
    }
  })
