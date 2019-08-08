import React, { useState } from 'react'
import { TList, TProject } from '../../../types/project'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BaseTask } from '../Task/Base'
import {
  Button,
  IconButton,
  Menu as MuiMenu,
  MenuItem
} from '@material-ui/core'
import { id } from '../../../utils/utilities'
import { CreateTask } from '../Task/Create'
import { Menu } from '@material-ui/icons'

type OwnProps = {
  progress: number // 0, 1, or 2
  list: TList
  project: TProject
  collapseList: (id: string) => void
  collapsedLists: string[]
  openFunc: (id: string) => void
  deleteList: (id: string) => void
}
type TProps = OwnProps

export const ProjectCell = (props: TProps) => {
  const tasks = props.list.taskIds
    .map(taskId => props.project.tasks[id(props.project.tasks, taskId)])
    .filter(task => task.progress === props.progress)

  const [creating, setCreating] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null as any)
  const [deletingList, setDeletingList] = useState(null as any)

  return (
    <td
      style={{
        borderRight: `1px ${props.progress !== 2 ? 'dashed' : 'solid'} #aebacc`,
        borderBottom:
          props.project.lists.findIndex(list => props.list.id === list.id) ===
          props.project.lists.length - 1
            ? '1px solid #aebacc'
            : undefined,
        borderTop: '1px solid #aebacc',
        borderLeft:
          props.progress === 0
            ? `1px ${props.progress ? 'dashed' : 'solid'} #aebacc`
            : undefined,
        overflowY: 'scroll',
        width: '100%',
        padding: 8,
        paddingTop: props.progress ? 8 : 0,
        paddingBottom: props.collapsedLists.includes(props.list.id) ? 0 : 8
      }}
    >
      {props.progress === 0 && (
        <div style={{ display: 'flex', margin: 4 }}>
          {props.collapsedLists.includes(props.list.id) && (
            <h2
              style={{
                fontSize: 16,
                margin: 'auto 8px auto 0px',
                color: 'gray'
              }}
            >
              [Collapsed]
            </h2>
          )}
          <h2 style={{ margin: 'auto 0px', fontSize: 18 }}>
            {props.list.name}
          </h2>
          <IconButton
            onClick={e => setAnchorEl(e.currentTarget)}
            style={{ marginLeft: 8 }}
          >
            <Menu />
          </IconButton>
          <MuiMenu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null)
                props.collapseList(props.list.id)
              }}
            >
              Toggle Collapsed
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Edit</MenuItem>
            <MenuItem
              onClick={() => {
                if (deletingList) {
                  setAnchorEl(null)
                  props.deleteList(props.list.id)
                } else {
                  setDeletingList(true)
                  setTimeout(() => setDeletingList(false), 4000) // dont have confirm message forever
                }
              }}
            >
              {/* TODO:  when they click, make text red and say confirm */}
              {deletingList ? (
                <div style={{ color: 'red', fontWeight: 500 }}>Confirm</div>
              ) : (
                'Delete'
              )}
            </MenuItem>
          </MuiMenu>
        </div>
      )}
      <Droppable
        isDropDisabled={props.collapsedLists.includes(props.list.id)}
        droppableId={`${props.list.id}DIVIDER${props.progress}`}
      >
        {(dropProvided, dropSnapshot) => {
          return (
            <div
              style={{
                flexDirection: 'column',
                display: 'flex',
                minHeight: props.collapsedLists.includes(props.list.id)
                  ? 0
                  : 78,
                backgroundColor: dropSnapshot.isDraggingOver
                  ? '#bae3ff'
                  : 'white',
                transition: 'background-color .2s ease'
              }}
              {...dropProvided.droppableProps}
              ref={dropProvided.innerRef}
            >
              {!props.collapsedLists.includes(props.list.id)
                ? tasks.map((task, i) => (
                    <Draggable draggableId={task.id} index={i} key={task.id}>
                      {(dragProvided, dragSnapshot) => (
                        <BaseTask
                          openFunc={() => props.openFunc(task.id)}
                          project={props.project}
                          task={task}
                          provided={dragProvided}
                          snapshot={dragSnapshot}
                        />
                      )}
                    </Draggable>
                  ))
                : null}
              {dropProvided.placeholder}
            </div>
          )
        }}
      </Droppable>
      {props.progress === 0 && !props.collapsedLists.includes(props.list.id) && (
        <Button
          style={{ width: '100%', marginTop: 8 }}
          onClick={() => setCreating(true)}
        >
          Create Task
        </Button>
      )}
      {creating && (
        <CreateTask
          onClose={() => setCreating(false)}
          projectId={props.project.id}
        />
      )}
    </td>
  )
}
