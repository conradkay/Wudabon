import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core'

import React from 'react'

import { colors } from '../../colors'
import uuidv1 from 'uuid/v1'

type OwnProps = {
  color: string
  hasAllOption?: boolean
  onChange(color: string): void
}

export const ChooseColor = (props: OwnProps) => {
  const { hasAllOption } = props
  const gradientNames = `linear-gradient(to right, ${Object.values(colors)
    .slice(1)
    .join(', ')})`

  return (
    <FormControl fullWidth>
      <Select
        fullWidth
        value={props.color}
        onChange={(e: any) => props.onChange(e.target.value)}
      >
        {hasAllOption && (
          <MenuItem
            value="all"
            selected={false}
            style={{
              background: gradientNames
            }}
          >
            Any
          </MenuItem>
        )}
        {Object.keys(colors).map((key: any, i) => (
          <MenuItem
            selected={false}
            style={{ backgroundColor: (colors as any)[key] || 'white' }}
            key={uuidv1()}
            value={(colors as any)[key]}
          >
            {key}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Color</FormHelperText>
    </FormControl>
  )
}
