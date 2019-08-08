import React from 'react'
import Chart from 'chart.js'

/**
 * Section 1: A chart about a project,
 * Section 2: A list of overdue Tasks, or can be toggled to assigned tasks,
 * Section 3(full-width): A calendar
 */

const randInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max))
}
const genNums = (amount: number) => {
  const result = []

  for (let i = 0; i < amount; i++) {
    result.push(randInt(100))
  }

  return result
}

const backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)'
]

const borderColor = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
]

export const Dashboard = () => {
  const chartRef = React.useRef()

  React.useEffect(() => {
    const myChartRef = (chartRef.current as any).getContext('2d')

    /* tslint:disable-next-line */
    const chart = new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'Nice Graph Courtesy of Conrad Kay',
            data: genNums(7),
            fill: false,
            backgroundColor,
            borderColor,
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: { yAxes: [{ ticks: { beginAtZero: true, max: 100 } }] }
      }
    })

    const interval = setInterval(() => {
      chart.data.datasets![0].data = genNums(7)

      chart!.update()
    }, 2000)

    return () => clearInterval(interval)
  })

  return (
    <>
      <div style={{ maxWidth: '50%', margin: 20 }}>
        <canvas id="myChart" ref={chartRef as any} />
      </div>
    </>
  )
}
