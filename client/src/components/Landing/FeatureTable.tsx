import React from 'react'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import { Check, Close, Traffic } from '@material-ui/icons'

const tableHeadData: string[] = ['Feature', 'Mantella', 'Trello', 'KanbanFlow']

const features = [
  // first in array is feature name, second is for Mantella, third is trello, fourth is kanbanFlow
  ['Subtasks', 'CHECK', 'CHECK', 'CHECK'],
  ['EPIC DESIGN', 'Material', 'Minimal', 'Nice'],
  ['Multiple Projects', 'CHECK', 'CHECK', 'CHECK'],
  ['Filtering', 'CHECK', 'CHECK', 'CHECK'],
  ['Recurring Tasks', 'CHECK', 'CHECK', 'CHECK'],
  ['Collapse Columns', 'CHECK', 'CHECK', 'NO'],
  ['Mobile Friendly', 'WIP', 'CHECK', 'CHECK'],
  ['Attach Photos', 'NO', 'PRO', 'CHECK'],
  ['Comments', 'CHECK', 'NO', 'CHECK'],
  ['Links', 'NO', 'NO', 'CHECK'],
  ['Export as JSON', 'CHECK', 'NO', 'NO']
]

const styles = {
  paper: {
    maxWidth: 1000,
    margin: '20px 0',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 16,
    paddingBottom: 48
  } as React.CSSProperties
}

export const FeatureTable = () => (
  <Paper style={styles.paper}>
    <Table>
      <TableHead>
        <TableRow>
          {tableHeadData.map((val, i) => (
            <TableCell key={i}>{val}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {features.map((feature, i) => (
          <TableRow key={i}>
            {feature.map((val, e) => (
              <TableCell key={e}>
                {val === 'CHECK' ? (
                  <Check style={{ color: '#00CC00' }} />
                ) : val === 'NO' ? (
                  <Close style={{ color: '#cc0000' }} />
                ) : val === 'WIP' ? (
                  <Traffic style={{ color: 'orange' }} />
                ) : val === 'PRO' ? (
                  'Premium'
                ) : (
                  val
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
)
