import { TPomodoro } from '../../types/state'
import Dialog from 'sweetalert'

const WORK_DONE_MESSAGE =
  'Take a break! Make some chili! Good job kiddo, really proud of you man <3'
const BREAK_DONE_MESSAGE =
  'You fat, obese, loser, good people do not need breaks, they are more productive than you. I mean, what the heck were you even doing? Watching a dumb movie, a youtube video about how container ships work, come on man.'

export const Swal = (
  pomodoro: TPomodoro,
  stateFunc: (b: boolean) => void,
  toggleWorking: () => void
) => {
  if (pomodoro.currSeconds === 0) {
    const toggleButtonText = `Start ${pomodoro.working ? 'Break' : 'Working'}`
    const title = `${pomodoro.working ? 'Work' : 'Break'} Completed`
    const text = pomodoro.working ? WORK_DONE_MESSAGE : BREAK_DONE_MESSAGE
    const icon = pomodoro.working ? 'success' : 'warning'
    Dialog({
      title,
      text,
      icon,
      // value is passed to .then
      buttons: {
        stop: { text: 'Stop Pomodoro', value: 'stop' },
        toggle: {
          text: toggleButtonText,
          value: 'toggle'
        }
      }
      // .then will return what button they clicked
    }).then((value: 'stop' | 'toggle') => {
      switch (value) {
        case 'stop':
          stateFunc(false)
          break
        case 'toggle':
          toggleWorking()
          break
        default:
          break
      }
    })
  }
}
