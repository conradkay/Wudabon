import React, { useState } from 'react'
import {
  TextField,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Button,
  Typography
} from '@material-ui/core'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { formalize } from '../../utils/utilities'
import { TState } from '../../types/state'

const styles = (theme: Theme) =>
  createStyles({
    list: {
      backgroundColor: '#FAFAFA',
      margin: '25px auto 0px auto',
      borderRadius: 0,
      width: '100%'
    }
  })

type OwnProps = {
  variant?: 'menu'
  noButton?: true
  onClick?(): void
}

type TProps = ReturnType<typeof mapState> &
  WithStyles<typeof styles> &
  OwnProps &
  RouteComponentProps

const CProjectSearch = (props: TProps) => {
  const [search, setSearch] = useState('')

  const { classes } = props

  let projects = [...Object.values(props.projects)]

  projects = projects.filter(project => {
    const myString: string = formalize(project.name)
    const searchInput = formalize(search)

    return myString.indexOf(searchInput) > -1
  })

  return (
    <div style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto' }}>
      {props.variant !== 'menu' && (
        <Typography align="center" style={{ marginBottom: 10 }} variant="h4">
          Projects
        </Typography>
      )}
      <TextField
        autoFocus={props.variant === 'menu' ? true : undefined}
        style={{ borderRadius: '0%' }}
        fullWidth
        label="Filter by Name or Category"
        variant={props.variant === 'menu' ? ('standard' as any) : 'outlined'}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <List
        className={classes.list}
        subheader={<ListSubheader component="div">Projects</ListSubheader>}
      >
        {projects.map((project, i) => {
          const isLink = project.id === ('create-project' as any)
          const urlPrefix = isLink ? '' : '/project/'
          return (
            <div key={project.id} style={{ whiteSpace: 'nowrap' }}>
              <ListItem
                button
                disabled={
                  props.location.pathname.split('/project/')[1] === project.id
                }
                to={urlPrefix + project.id.toString()}
                onClick={props.onClick}
                component={Link}
              >
                <ListItemText primary={project.name} />
              </ListItem>
            </div>
          )
        })}
      </List>
      <div style={{ marginTop: 20 }}>
        {!props.noButton && (
          <Button
            variant="outlined"
            color="primary"
            to="/create-project"
            component={Link}
            fullWidth
          >
            Create Project
          </Button>
        )}
      </div>
    </div>
  )
}

const mapState = (state: TState) => {
  return {
    projects: state.projects
  }
}

export const ProjectFinder = withRouter(
  connect(mapState)(withStyles(styles)(CProjectSearch))
)
