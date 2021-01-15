import React, { useMemo, useReducer } from "react";
import { Line } from "react-chartjs-2";

const dataInit = {
  labels: [1, 2, 3, 4, 5, 6],
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
        scaleLabel: {
          display: true,
          labelString: 'Frequency (Hz)'
        },
        ticks: {
          maxTicksLimit: 10,
        }
      }
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Reflection Loss (dB)'
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
  | {type: "setFreq", payload: Array<number>}
  | {type: "setData", payload: Array<number>}

const dataReducer = (prev: dataType, action: dataAction): dataType => {
  switch (action.type) {
    case "setFreq":
      return {...prev, labels: action.payload}
    case "setData":
      return {...prev, datasets: [...prev.datasets.map(el => ({...el, data: action.payload}))]}
    default:
      return prev
  }
}

export interface GraphProps {
  frequency: Array<number>
  dataset: Array<{
    data: Array<number>
  }>
}

export const Graph: React.FC<GraphProps> = (props) => {
  const [data, setData] = useReducer(dataReducer, dataInit)

  useMemo(() => {
    setData({type: "setFreq", payload: props.frequency})
    setData({type: "setData", payload: props.dataset[0].data})
  }, [props.dataset, props.frequency])

  return (
    <Line 
      data={data}
      options={optionsInit}
    />
  )
}