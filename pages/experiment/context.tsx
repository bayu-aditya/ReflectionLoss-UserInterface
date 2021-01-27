import { 
  createContext, 
  Dispatch, 
  useContext, 
  useReducer } from "react"

import { ExperimentModel } from "@models";

const Experiment = new ExperimentModel()

const initStoreContext = {
  data: Experiment.data
}
type storeContextType = typeof initStoreContext

type Action = 
  | {type: "setDataCalculation", payload: storeContextType["data"]}

const reducerExperiment = (prev: storeContextType, action: Action): storeContextType => {
  switch (action.type) {
    case "setDataCalculation":
      return {...prev, data: action.payload}
    default:
      return prev
  }
}

const ExperimentContext = createContext<[storeContextType, Dispatch<Action>]>(null)
export const useExpriment = () => useContext(ExperimentContext)

export const ExperimentProvider: React.FC = (props) => {
  const [data, dispatch] = useReducer(reducerExperiment, initStoreContext)

  return (
    <ExperimentContext.Provider value={[data, dispatch]}>
      {props.children}
    </ExperimentContext.Provider>    
  )
}