import React, { CSSProperties } from 'react'
import { TProject } from '../../types/project'
import {
  Select,
  MenuItem,
  IconButton,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import { format, addDays, subDays } from 'date-fns'

const mobilePx = 750

const styles = (theme: Theme) =>
  createStyles({
    nav: {
      [theme.breakpoints.up(mobilePx)]: {
        ...boxStyle
      },
      [theme.breakpoints.down(mobilePx)]: {
        marginRight: 'auto'
      }
    }
  })

type OwnProps = {
  projects: TProject[]
  toggleProject: (id: string[]) => void
  currIds: string[]
  startDay: Date
  setDate: (newDay: Date) => void
}

const boxStyle: CSSProperties = {
  alignItems: 'center',
  flex: 1,
  display: 'flex',
  justifyContent: 'center'
}

type TProps = OwnProps & WithStyles<typeof styles>

const CWeekControls = (props: TProps) => {
  const { projects, toggleProject, currIds } = props
  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <Select
        style={{ maxWidth: '30%', ...boxStyle }}
        value={currIds.length === 0 ? ['-1'] : currIds}
        onChange={e => {
          const withoutAllProjects = (e.target.value as any).filter(
            (num: string) => num !== '-1'
          )
          toggleProject(
            // we dont want the array to even be empty, and we dont want both the All projects and anything else to show at the same time.
            ((e as any).target.value.includes('-1') &&
              !currIds.includes('-1')) ||
              withoutAllProjects.length === 0
              ? ['-1']
              : withoutAllProjects
          )
        }}
        multiple
      >
        <MenuItem value={-1}>All Projects</MenuItem>
        {Object.values(projects).map(project => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
      <div className={props.classes.nav}>
        <IconButton onClick={() => props.setDate(subDays(props.startDay, 7))}>
          <NavigateBefore />
        </IconButton>
        <span style={{ margin: '10px' }}>
          {`${format(props.startDay, 'MMM d')} - ${format(
            addDays(props.startDay, 7),
            'MMM d'
          )}`}
        </span>
        <IconButton onClick={() => props.setDate(addDays(props.startDay, 9))}>
          <NavigateNext />
        </IconButton>
      </div>
      {window.innerWidth >= mobilePx && <div style={boxStyle} />}
    </div>
  )
}

export const WeekControls = withStyles(styles)(CWeekControls)
