import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { TState } from '../../types/state'
import { connect } from 'react-redux'

const mapState = (state: TState) => ({
  user: state.user
})

type TProps = ReturnType<typeof mapState>

export const NoMatch = connect(mapState)((props: TProps) => (
  <div className="all">
    <section className="error-container">
      <span className="four">
        <span className="screen-reader-text">4</span>
      </span>
      <span className="zero">
        <span className="screen-reader-text">0</span>
      </span>
      <span className="four">
        <span className="screen-reader-text">4</span>
      </span>
      <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <Button
          color="secondary"
          style={{ width: 250 }}
          to={props.user ? '/dashboard' : '/'}
          component={Link}
          variant="contained"
        >
          Home
        </Button>
      </div>
    </section>
  </div>
))
