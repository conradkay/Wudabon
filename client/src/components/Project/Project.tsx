import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
  Tooltip,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  TableBody
} from '@material-ui/core'
import { TState } from '../../types/state'
import { selectMemberA, setProjectA } from '../../store/actions/project'
import { CreateColumn } from './CreateColumn'
import { Add, FilterList, Settings, Equalizer } from '@material-ui/icons'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { NoMatch } from '../NoMatch/NoMatch'
import Helmet from 'react-helmet'
import { ProjectSettings } from './ProjectSettings'

import { Mutation, MutationResult } from 'react-apollo'
import {
  EditProjectMutation,
  EditProjectMutationVariables,
  DragTaskMutation,
  DragTaskMutationVariables,
  DeleteListMutation,
  DeleteListMutationVariables
} from '../../graphql/types'
import { openSnackbarA } from '../../store/actions/snackbar'
import { GQL_EDIT_PROJECT } from '../../graphql/mutations/project'
import { id } from '../../utils/utilities'
import { ProjectCell } from './Cell/ProjectCell'
import { cloneDeep } from 'apollo-utilities'
import { GQL_DRAG_TASK } from '../../graphql/mutations/task'
import { useMutation } from '@apollo/react-hooks'
import { EditTaskModal } from './Task/Edit'
import { setListA } from '../../store/actions/list'
import { GQL_DELETE_LIST } from '../../graphql/mutations/list'

/**
 * @todo add a filter menu with color, column, due date, label
 */

type OwnProps = {
  params: {
    id: string
  }
}

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    tooltip: {
      fontSize: 18
    },
    appbar: {},
    input: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      minWidth: '20%',
      fontSize: 18,
      outline: 'none',
      backgroundColor: '#f5f5f5',
      borderRadius: 4,
      width: 'auto',
      padding: 8,
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: 'white'
      },
      '&:focus': {
        borderColor: '#27b6ba'
      }
    }
  })

type TProps = ReturnType<typeof mapState> &
  typeof actionCreators &
  OwnProps &
  WithStyles<typeof styles>

export const getMobile = (window: Window) => {
  return window.innerWidth <= 1000
}

export type TFilterData = {
  dueDate: {
    start: Date
    end: Date
  }
  color?: string // what if we have a multiselect? string is the key of colors object
  points?: number
}

const CProject = (props: TProps) => {
  const [editingTaskId, setEditingTaskId] = useState('')
  const [settings, setSettings] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(getMobile(window))
  const [collapsedLists, setCollapsedLists] = useState([] as string[])

  if (isMobile) {
  }

  const [name, setName] = useState(
    props.project ? props.project.name : undefined
  )

  const [deleteListExec] = useMutation<
    DeleteListMutation,
    DeleteListMutationVariables
  >(GQL_DELETE_LIST, {})

  const [dragTaskExec] = useMutation<
    DragTaskMutation,
    DragTaskMutationVariables
  >(GQL_DRAG_TASK, {})

  const draggo = (vars: DragTaskMutationVariables) => {
    dragTaskExec({ variables: vars })
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) {
      return
    }

    const [[fromListId], [toListId, toProgress]] = [
      result.source.droppableId.split('DIVIDER'),
      result.destination.droppableId.split('DIVIDER')
    ]

    const editProject = cloneDeep(props.project)

    const fromList = editProject.lists[id(editProject.lists, fromListId)]

    const toList = editProject.lists[id(editProject.lists, toListId)]

    // react-beautiful-dnd will not give accurate index, because each droppable has only the tasks with the same progress/column
    let actualIndex =
      result.destination.index +
      props.project.tasks.reduce((accum, task) => {
        if (
          task.progress < parseInt(toProgress, 10) &&
          toList.taskIds.includes(task.id)
        ) {
          return accum + 1
        }
        return accum
      }, 0)

    if (
      fromList.id === toList.id &&
      props.project.tasks[id(props.project.tasks, result.draggableId)]
        .progress !== parseInt(toProgress, 10)
    ) {
      const addingLater =
        actualIndex >
        fromList.taskIds.findIndex(taskId => taskId === result.draggableId)

      if (addingLater) {
        actualIndex -= 1
      }
    }

    if (actualIndex < 0) {
      actualIndex = 0
    }

    // remove old taskId instance
    fromList.taskIds = fromList.taskIds.filter(
      taskId => taskId !== result.draggableId
    )

    // add new taskId instance
    toList.taskIds.splice(actualIndex, 0, result.draggableId)

    // change tasks column
    editProject.tasks[
      id(editProject.tasks, result.draggableId)
    ].progress = parseInt(toProgress, 10)

    // mutate store to save changes
    props.setProject({ id: props.project.id, newProj: editProject })

    draggo({
      id: result.draggableId,
      newIndex: actualIndex,
      oldListId: fromListId,
      newListId: toListId,
      newProgress: parseInt(toProgress),
      projectId: props.project.id
    })

    return
  }

  React.useEffect(() => {
    window.addEventListener('resize', () => setIsMobile(getMobile(window)))

    return () =>
      window.removeEventListener('resize', () => setIsMobile(getMobile(window)))
  }, [])

  const { classes, project } = props
  if (project) {
    return (
      <div>
        <Helmet>
          <style type="text/css">{` body { background-color: #1d364c; }`}</style>
          <meta
            name={'description'}
            content={'Projects help you become stronk'}
          />
        </Helmet>
        <AppBar color="default" className={classes.appbar} position="static">
          <Toolbar>
            <Mutation
              onCompleted={({ editProject }: EditProjectMutation) => {
                if (editProject) {
                  props.setProject({
                    id: editProject.id,
                    newProj: {
                      name: editProject.name,
                      id: editProject.id,
                      ...editProject
                    }
                  })
                  setName(editProject.name)
                }
              }}
              mutation={GQL_EDIT_PROJECT}
            >
              {(
                editProject: (obj: {
                  variables: EditProjectMutationVariables
                }) => void,
                result: MutationResult<EditProjectMutation>
              ) => {
                return (
                  <div>
                    <input
                      className={classes.input}
                      value={name}
                      onBlur={() =>
                        editProject({
                          variables: {
                            newProj: { name: name || 'newname' },
                            id: project.id
                          }
                        })
                      }
                      onChange={(e: any) => setName(e.target.value)}
                    />
                  </div>
                )
              }}
            </Mutation>
            <div
              style={{
                display: 'flex',
                marginLeft: 'auto'
              }}
            >
              {/* Object.values(project.users).map((user, i) => {
                return (
                  <Tooltip key={user.id} title={user.username}>
                    <ButtonBase
                      onClick={() => {
                        props.selectMember({
                          id: user.id,
                          projectId: project.id
                        })
                      }}
                      style={{
                        opacity:
                          project.selectingMember === user.id ? 0.5 : undefined,
                        filter:
                          project.selectingMember === user.id
                            ? 'alpha(opacity = 50)'
                            : undefined,
                        height: 48,
                        width: 48,
                        verticalAlign: 'middle',
                        borderRadius: '50%',
                        margin: '0px 8px',
                        userSelect: 'none',
                        backgroundImage: `url(${user.profileImg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '50% 50%',
                        backgroundSize: 'contain'
                      }}
                    />
                  </Tooltip>
                )
              }) */}
            </div>
            <IconButton onClick={() => null}>
              <FilterList />
            </IconButton>
            <IconButton
              onClick={() => setSettings(true)}
              style={{ marginLeft: 8 }}
            >
              <Settings />
            </IconButton>
            <IconButton style={{ marginLeft: 8 }}>
              <Equalizer />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Paper
          style={{
            margin: 20,
            padding: 20,
            paddingBottom: 80,
            minHeight: 'calc(100vh - 328px)'
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <table
              style={{
                tableLayout: 'fixed',
                width: '100%',
                borderCollapse: 'separate'
              }}
            >
              <TableBody>
                <tr style={{ display: 'flex' }}>
                  {[0, 1, 2].map(col => (
                    <td
                      key={col}
                      style={{
                        width: '100%',
                        backgroundColor: '#f2f2f2',
                        borderLeft: col ? 'none' : '1px solid #aebacc',
                        borderRight: '1px solid #aebacc',
                        borderTop: '1px solid #aebacc',
                        textAlign: 'center',
                        padding: 8,
                        fontSize: 20
                      }}
                    >
                      {col === 0
                        ? 'No Progress'
                        : col === 1
                        ? 'In Progress'
                        : 'Complete'}
                    </td>
                  ))}
                </tr>
                {project.lists.map(list => (
                  <tr
                    style={{ verticalAlign: 'top', display: 'flex' }}
                    key={list.id}
                  >
                    {[0, 1, 2].map((progress, i) => (
                      <ProjectCell
                        deleteList={listId => {
                          props.setList({
                            id: listId,
                            projectId: props.project.id,
                            newCol: null
                          })
                          deleteListExec({
                            variables: {
                              projectId: props.project.id,
                              id: list.id
                            }
                          })
                        }}
                        collapseList={listId => {
                          if (collapsedLists.includes(listId)) {
                            setCollapsedLists(
                              collapsedLists.filter(lId => listId !== lId)
                            )
                          } else {
                            setCollapsedLists([...collapsedLists, listId])
                          }
                        }}
                        collapsedLists={collapsedLists}
                        openFunc={(tId: string) => setEditingTaskId(tId)}
                        key={i}
                        progress={progress}
                        list={list}
                        project={project}
                      />
                    ))}
                  </tr>
                ))}
              </TableBody>
            </table>
          </DragDropContext>

          {dialogOpen && (
            <CreateColumn
              onClose={() => setDialogOpen(false)}
              project={project}
            />
          )}
        </Paper>

        <Tooltip
          placement="left"
          classes={{ tooltip: classes.tooltip }}
          title="Add List"
        >
          <Fab
            onClick={() => setDialogOpen(true)}
            color="primary"
            className={classes.fab}
          >
            <Add />
          </Fab>
        </Tooltip>
        {settings && (
          <ProjectSettings
            project={props.project}
            onClose={() => setSettings(false)}
          />
        )}
        {editingTaskId && (
          <EditTaskModal
            taskId={editingTaskId}
            onClose={() => setEditingTaskId('')}
            projectId={props.project.id}
          />
        )}
      </div>
    )
  }
  return <NoMatch />
}

const mapState = (state: TState, ownProps: OwnProps) => {
  return {
    project: state.projects[id(state.projects, ownProps.params.id)]
  }
}

const actionCreators = {
  setProject: setProjectA,
  selectMember: selectMemberA,
  openSnackbar: openSnackbarA,
  setList: setListA
}

export const Project = withStyles(styles)(
  connect(
    mapState,
    actionCreators
  )(CProject)
)
