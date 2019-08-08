import * as React from 'react'
import {
  withStyles,
  createStyles,
  Theme,
  SnackbarContent,
  Snackbar,
  IconButton,
  WithStyles
} from '@material-ui/core'

import { connect } from 'react-redux'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'
import { closeSnackbarA } from '../../store/actions/snackbar'
import { TVariant } from '../../types/state'
import { TState } from '../../types/state'
import { Info } from '@material-ui/icons'

/**
 * @description used in snackbarRoot to determine how to display snackbar based on state.snackbar.variant
 * @returns {JSX inline style} whether or not to load an error icon with red or success + green etc.
 */
type Classes = {
  success: string
  warning: string
  error: string
  standard: string
}
const getClassSnackbarVariant = (variant: TVariant, classes: Classes) => {
  if (variant === 'success') {
    return classes.success
  } else if (variant === 'warning') {
    return classes.warning
  } else if (variant === 'error') {
    return classes.error
  } else {
    return classes.standard
  }
}

const FULL_WIDTH_POINT_PX = 960
const AUTO_HIDE_POINT_MS = 3000

const styles = (theme: Theme) =>
  createStyles({
    success: { backgroundColor: '#43A047' }, // what a nice green
    warning: { backgroundColor: '#FFA000' },
    standard: {},
    error: { backgroundColor: theme.palette.error.dark },
    close: { width: 24, height: 24 },
    message: { display: 'flex', alignItems: 'center' },
    icon: { fontSize: 20, marginRight: theme.spacing(1) },
    snackbar: {
      [theme.breakpoints.down(FULL_WIDTH_POINT_PX)]: {
        marginBottom: '0px !important'
      }
    }
  })

type TProps = WithStyles<typeof styles> &
  ReturnType<typeof mapState> &
  typeof actionCreators

const SnackbarComponent = (props: TProps) => {
  // Find what Icon to use for snackbar by variant
  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    standard: Info
  }
  const { classes, open, message, variant, closeSnackbar } = props
  const backgroundClass: string = getClassSnackbarVariant(variant, classes)

  const Icon = variantIcon[variant]
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      style={{ marginBottom: 20 }}
      className={classes.snackbar}
      autoHideDuration={AUTO_HIDE_POINT_MS}
      onClose={closeSnackbar}
    >
      <SnackbarContent
        className={backgroundClass}
        message={
          <span className={classes.message}>
            <Icon className={classes.icon} />
            <span style={{ marginLeft: 15, fontSize: 15 }}>{message}</span>
          </span>
        }
        action={[
          <IconButton
            key="close"
            color="inherit"
            className={classes.icon}
            onClick={closeSnackbar}
          >
            <CloseIcon className={classes.close} />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

const mapState = ({ snackbar }: TState) => ({
  open: snackbar.open,
  message: snackbar.message,
  variant: snackbar.variant
})

const actionCreators = {
  closeSnackbar: closeSnackbarA
}

export const SnackbarRoot = connect(
  mapState,
  actionCreators
)(withStyles(styles)(SnackbarComponent))
