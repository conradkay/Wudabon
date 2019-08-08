import React from 'react'
import { Icon, Paper } from '@material-ui/core'

const galeryOptions = [
  {
    name: 'Dividers',
    description:
      'divide tasks in different task lists or swimlanes for maximum efficiency',
    icon: 'view_quilt'
  },
  {
    name: 'Private tasks',
    description:
      'Not everyone needs access to a task, assign tasks to teams or specific members',
    icon: 'lock'
  },
  {
    name: 'Time tracking',
    description: 'Get detailed statistics of what has been done',
    icon: 'timer'
  },
  {
    name: 'Board settings',
    description: 'Manage members and admins, customize the app',
    icon: 'settings'
  },
  {
    name: 'Targets',
    description:
      'Set goals for certain members, teams, or for the entire project',
    icon: 'check_box'
  },
  {
    name: 'Calendar',
    description:
      'Get an overview of due dates and manage your time accordingly',
    icon: 'calendar_today'
  },
  {
    name: 'Task Board',
    description: 'Get an overview of what has to be done',
    icon: 'view_list'
  },
  {
    name: 'Issue Tracking',
    icon: 'bug_report',
    description: 'Assign importance to tasks and assign bugs to teams'
  },
  {
    name: 'Recurring Tasks',
    icon: 'repeat',
    description: 'Get reminders for tasks that must be done on a routine basis'
  }
]

export const FeatureGallery = () => {
  return (
    <Paper style={{ padding: 16, maxWidth: 1000, margin: '12px auto' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        {galeryOptions.map((galeryOption, i) => (
          <div key={i} style={{ flex: 1, display: 'flex' }}>
            <div
              style={{
                margin: 8,
                minWidth: 250,
                flex: 1,
                borderRadius: 4,
                padding: 8,
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'start'
              }}
            >
              <div
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Icon
                  style={{ fontSize: 36, marginRight: 4, color: '#224885' }}
                >
                  {galeryOption.icon}
                </Icon>
                <p style={{ fontWeight: 700, fontSize: 22, color: '#224885' }}>
                  {galeryOption.name}
                </p>
              </div>
              <div style={{ marginTop: 8 }}>{galeryOption.description}</div>
            </div>
          </div>
        ))}
      </div>
    </Paper>
  )
}
