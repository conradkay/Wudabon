/* should greet them well instead of the snackbar */
import React, { useEffect, useState } from 'react'
import { Dialog, IconButton, Button } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { store } from '../../store/store'
import { openSnackbarA } from '../../store/actions/snackbar'

// make them each different backgroundColor to make them pop out

export const WelcomeDialog = () => {
  // need to figure out how to check whether they have been here
  const [open, setOpen] = useState(!localStorage.getItem('hasVisited'))
  // const [index, setIndex] = useState(0)

  useEffect(() => {
    return () => {
      localStorage.setItem('hasVisited', 'yes')
    }
  })

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div style={{ minWidth: 500, minHeight: 200, padding: 25 }}>
        <div style={{ fontSize: 22, fontWeight: 600 }}>
          Welcome to Mantella 🎉
        </div>
        <IconButton
          style={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
          onClick={() => setOpen(false)}
        >
          <Close />
        </IconButton>
        <p
          style={{
            fontSize: 17,
            color: '#191919',
            marginTop: 20
          }}
        >
          {/* put icon between each section man */}
          Greetings, Welcome to Mantella, hello
          <a href="https://github.com/conradkay/Mantella">Github Page</a>
        </p>
      </div>
      <div style={{ margin: 8, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            setOpen(false)
            store.dispatch(openSnackbarA('Wise', 'standard'))
          }}
        >
          Hello Kanban Brawn
        </Button>
      </div>
    </Dialog>
  )
}
