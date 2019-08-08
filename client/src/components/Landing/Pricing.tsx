import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from '@material-ui/core'

import React from 'react'

import { Link } from 'react-router-dom'
import { ButtonProps } from '@material-ui/core/Button'

const tiers: Array<{
  title: string
  price: string
  description: string[]
  buttonText: string
  buttonVariant: ButtonProps['variant']
  subheader?: string
}> = [
  {
    title: 'Free',
    price: '0',
    description: ['Acess to all features', 'Pomodoro and Stopwatch'],
    buttonText: 'Register',
    buttonVariant: 'outlined'
  },
  {
    title: 'Premium',
    subheader: 'Most popular',
    price: '0',
    description: ['First class suport by me', '#1 Customer support'],
    buttonText: 'Register',
    buttonVariant: 'contained'
  },
  {
    title: 'Enterprise',
    price: '0',
    description: [
      'export as JSON so you can store across other computers.',
      'Free and open source!'
    ],
    buttonText: 'Register',
    buttonVariant: 'outlined'
  }
]

const styles = (theme: Theme) =>
  createStyles({
    cardHeader: {
      backgroundColor: theme.palette.grey[200]
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2)
    },
    cardActions: {}
  })

export const Pricing = withStyles(styles)(
  ({ classes }: WithStyles<typeof styles>) => (
    <Grid
      container
      alignItems="center"
      spacing={1}
      style={{ maxWidth: 1400, marginLeft: 'auto', marginRight: 'auto' }}
    >
      {tiers.map(tier => (
        <Grid
          item
          key={tier.title}
          xs={12}
          sm={tier.title === 'Also Free' ? 12 : 6}
          md={4}
        >
          <Card>
            <CardHeader
              title={tier.title}
              subheader={tier.subheader}
              titleTypographyProps={{ align: 'center' }}
              subheaderTypographyProps={{ align: 'center' }}
              className={classes.cardHeader}
            />
            <CardContent>
              <div className={classes.cardPricing}>
                <Typography component="h2" variant="h3" color="textPrimary">
                  ${tier.price}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  /mo
                </Typography>
              </div>
              {tier.description.map(line => (
                <Typography variant="subtitle1" align="center" key={line}>
                  {line}
                </Typography>
              ))}
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button
                to="/register"
                style={{ marginLeft: 'auto' }}
                component={Link}
                variant={tier.buttonVariant}
                color="primary"
              >
                {tier.buttonText}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
)
