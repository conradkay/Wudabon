/*
const styles = (theme: Theme) =>
  createStyles({
    appBarShift: {},
    menuButton: {
      marginLeft: 12,
      marginRight: 20
    },
    drawer: {},
    drawerPaper: {},
    toolbar: theme.mixins.toolbar
  })

type TProps = {
  open: boolean
  setFilterData: (newTasks: TTask[]) => void
  handleClose: () => void
  project: TProject
} & WithStyles<typeof styles>

const CFilterTasks = (props: TProps) => {
  const [custom, setCustom] = useState(false)

  const { open, classes, handleClose, project, setTasks } = props
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="right"
        open={open}
        onClose={() => handleClose()}
      >
        <List style={{ minWidth: 250, maxWidth: 350 }}>
          <ListItem>
            <ChooseColor
              hasAllOption
              color={props.filterData.color}
              onChange={(color: string) =>
                changeFilter({ ...filterData, color })
              }
            />
          </ListItem>

          <FormControlLabel
            style={{ margin: '0px auto' }}
            control={
              <Switch
                disableRipple
                disableTouchRipple
                checked={custom}
                onChange={() => {
                  if (custom) {
                    changeFilter({ ...filterData, dueDate: 'all' })
                  } else {
                    changeFilter({
                      ...filterData,
                      dueDate: [new Date(), addDays(new Date(), 1)]
                    })
                  }
                  setCustom(!custom)
                }}
                color="primary"
              />
            }
            label="Custom"
          />
          <ListItem>
            {!custom ? (
              <FormControl fullWidth>
                <InputLabel>Due Date</InputLabel>
                <Select
                  fullWidth
                  value={filterData.dueDate}
                  onChange={e =>
                    props.changeFilter({
                      ...filterData,
                      dueDate: e.target.value as any
                    })
                  }
                >
                  {[
                    ['all', 'All'],
                    ['has', 'Has Due Date'],
                    ['none', 'No Due Date'],
                    ['today', 'Today'],
                    ['tomorrow', 'Tomorrow']
                  ].map((set, i) => {
                    return (
                      <MenuItem key={i} value={set[0]}>
                        {set[1]}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            ) : (
              <div style={{ display: 'block' }}>
                <div></div>
                <div style={{ marginTop: 5 }}>
                  {/*
                  <DatePicker
                    fullWidth
                    leftArrowIcon={<KeyboardArrowLeft />}
                    rightArrowIcon={<KeyboardArrowRight />}
                    disablePast
                    label="End Date"
                    value={filterData.dueDate[1]}
                    onChange={(date: Date) => {
                      if (
                        isAfter(
                          date,
                          (filterData as any).dueDate[0] || new Date()
                        )
                      ) {
                        changeFilter({
                          ...filterData,
                          dueDate: [
                            isDate(filterData.dueDate[0])
                              ? (filterData.dueDate[0] as Date)
                              : subDays(new Date(), 1),
                            date
                          ]
                        })
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

export const FilterTasks = withStyles(styles)(CFilterTasks)
*/

export default ''
