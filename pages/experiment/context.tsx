import { 
  createContext, 
  Dispatch, 
  useContext, 
  useReducer } from "react"

import { ExperimentModel } from "@models";

const Experiment = new ExperimentModel()

const initStoreContext = {
  data: Experiment.data,
  request: Experiment.request
}
type storeContextType = typeof initStoreContext

type Action = 
  | {type: "setDataCalculation", payload: storeContextType["data"]}
  | {type: "setThickness", payload: number}
  | {type: "setLambda0", payload: number}
  | {type: "setLambdaC", payload: number}
  | {type: "setSavgolWindow", payload: number}

const reducerExperiment = (prev: storeContextType, action: Action): storeContextType => {
  switch (action.type) {
    case "setDataCalculation":
      return {...prev, data: action.payload}
    case "setThickness": 
      return {...prev, request: {...prev.request, thickness: action.payload}}
    case "setLambda0":
      return {...prev, request: {...prev.request, lambda_0: action.payload}}
    case "setLambdaC":
      return {...prev, request: {...prev.request, lambda_C: action.payload}}
    case "setSavgolWindow":
      return {...prev, request: {...prev.request, option: {...prev.request.option, savgol_filter: {...prev.request.option.savgol_filter, window_length: action.payload}}}}
    default:
      return prev
  }
}

const ExperimentContext = createContext<[storeContextType, Dispatch<Action>]>(null)
export const useExperiment = () => useContext(ExperimentContext)

export const ExperimentProvider: React.FC = (props) => {
  const [data, dispatch] = useReducer(reducerExperiment, initStoreContext)

  return (
    <ExperimentContext.Provider value={[data, dispatch]}>
      {props.children}
    </ExperimentContext.Provider>    
  )
}