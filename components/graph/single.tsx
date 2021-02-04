import React, { useMemo, useReducer } from "react";
import { Line } from "react-chartjs-2";

const dataInit = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "Reflection Loss",
      data: [12, 19, 3, 10, 2, 3],
      fill: false,
      pointRadius: 3,
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
  | {type: "setFreq", payload: Array<string>}
  | {type: "setDataset", payload: GraphProps["dataset"]}

const dataReducer = (prev: dataType, action: dataAction): dataType => {
  switch (action.type) {
    case "setFreq":
      return {...prev, labels: action.payload}
    case "setDataset":
      return {...prev, datasets: [...action.payload.map(el => ({
        label: "label",
        fill: false,
        pointRadius: 3,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 0, 0)',
        ...el
      }))]}
    default:
      return prev
  }
}

export interface GraphProps extends React.HTMLAttributes<HTMLDivElement> {
  frequency: Array<string>
  dataset: Array<{
    data: Array<number>
    label?: string,
    fill?: boolean,
    pointRadius?: number,
    backgroundColor?: string,
    borderColor?: string,
  }>
  ylabel: string
}

export const Graph: React.FC<GraphProps> = (props) => {
  const [data, setData] = useReducer(dataReducer, dataInit)

  useMemo(() => {
    setData({type: "setFreq", payload: props.frequency})
    setData({type: "setDataset", payload: props.dataset})
  }, [props.dataset, props.frequency])

  return (
    <div {...props}>
      <Line 
        data={data}
        options={{
          ...optionsInit,
          scales: {
            ...optionsInit.scales,
            yAxes: [
              ...optionsInit.scales.yAxes.map(el => ({
                ...el,
                scaleLabel: {
                  ...el.scaleLabel,
                  labelString: props.ylabel
                }
              }))
            ]
          }
        }}
      />
    </div>
  )
}