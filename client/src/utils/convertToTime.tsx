export const toDaysHHMMSS = (s: number, verbose?: true): string => {
  let result = ''

  const days = Math.floor(s / 86400)
  s -= days * 86400
  if (days) {
    result += `${days} Day${days !== 1 ? 's ' : ' '}`
  }

  if (verbose) {
    const hours = Math.floor(s / 3600)
    s -= hours * 3600
    if (hours > 0) {
      result += `${hours} Hour${hours !== 1 ? 's ' : ' '}`
    }
    const minutes = Math.floor(s / 60)
    s -= minutes * 60
    if (minutes > 0) {
      result += `${minutes} Minute${minutes !== 1 ? 's ' : ' '}`
    }
    if (hours < 1 && s > 0) {
      result += `${s} second${s !== 1 ? 's' : ''}`
    }
  } else {
    const measuredTime = new Date(null as any)
    measuredTime.setSeconds(s)

    result += measuredTime.toISOString().slice(11, 19) // 8:43:32
    if (result.slice(0, 2) === '00') {
      result = result.slice(3)
    } else if (result.slice(0, 1) === '0') {
      result = result.slice(1)
    }
  }
  return result // 2 days, 8:43:32
}
