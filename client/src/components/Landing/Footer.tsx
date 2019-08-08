import React from 'react'

import {
  Grid,
  Typography,
  WithStyles,
  Theme,
  createStyles,
  withStyles
} from '@material-ui/core'

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact me', 'Location']
  },
  {
    title: 'Features',
    description: ['Create Robust Tasks', 'Personal support']
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use']
  }
]

const styles = (theme: Theme) =>
  createStyles({
    footer: {
      marginTop: 64,
      borderTop: `1px solid ${theme.palette.divider}`, // nice little division
      padding: `${theme.spacing(6)}px 0`,
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.up(1200)]: {
        width: 1000 // dont make it always fullWidth(eez to big)
      }
    }
  })

export const AboutFooter = withStyles(styles)(
  ({ classes }: WithStyles<typeof styles>) => (
    <footer className={classes.footer}>
      <Grid
        container
        spacing={1}
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        {footers.map(footer => (
          <Grid item xs key={footer.title}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {footer.title}
            </Typography>
            {footer.description.map(item => (
              <Typography key={item} variant="subtitle1" color="textSecondary">
                {item}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>
    </footer>
  )
)
