import React, { useMemo, useReducer } from "react";
import { Line } from "react-chartjs-2";

const dataInit = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: "Reflection Loss",
      data: [12, 19, 3, 10, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 0, 0)',
    },
  ],
}

const optionsInit = {
  scales: {
    xAxes: [
      {
        ticks: {
          max: 50,
          min: 0,
          stepSize: 0.5
        }
      }
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Reflection Loss'
        },
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

type dataType = typeof dataInit
type dataAction = 
  | {type: "setData", payload: Array<number>}

const dataReducer = (prev: dataType, action: dataAction): dataType => {
  switch (action.type) {
    case "setData":
      return {...prev, datasets: [...prev.datasets.map(el => ({...el, data: action.payload}))]}
    default:
      return prev
  }
}

export interface GraphProps {
  dataset: Array<{
    data: Array<number>
  }>
}

export const Graph: React.FC<GraphProps> = (props) => {
  const [data, setData] = useReducer(dataReducer, dataInit)

  useMemo(() => {
    setData({type: "setData", payload: props.dataset[0].data})
  }, [props.dataset])

  return (
    <Line 
      data={data}
      options={optionsInit}
    />
  )
}