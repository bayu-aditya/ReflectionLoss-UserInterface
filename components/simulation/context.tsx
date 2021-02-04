import { createContext, Dispatch, useContext, useReducer } from "react";
import { SimulationModel } from "@models";

const Simulation = new SimulationModel()

const initStoreContext = {
  data: Simulation.data,
  inputData: Simulation.inputData,
  request: Simulation.request
}
type storeContextType = typeof initStoreContext

type Action = 
  // set data calculation
  | {type: "setDataCalculation", payload: storeContextType["data"]}

  // set input parameter data
  | {type: "setInputData", payload: storeContextType["inputData"]}

  // set request
  | {type: "setThickness", payload: number}
  | {type: "setFreqStart", payload: number}
  | {type: "setFreqEnd", payload: number}
  | {type: "setMrReal", payload: number}
  | {type: "setMrImag", payload: number}
  | {type: "setErReal", payload: number}
  | {type: "setErImag", payload: number}

const reducerSimulation = (prev: storeContextType, action: Action): storeContextType => {
  switch (action.type) {
    case "setDataCalculation":
      return {...prev, data: action.payload}
    case "setInputData":
      return {...prev, inputData: action.payload}
    case "setThickness":
      return {...prev, request: {...prev.request, absorber_thickness: action.payload}}
    case "setFreqStart":
      return {...prev, request: {...prev.request, frequency: {...prev.request.frequency, start: action.payload}}}
    case "setFreqEnd":
      return {...prev, request: {...prev.request, frequency: {...prev.request.frequency, end: action.payload}}}
    case "setMrReal":
      return {...prev, request: {...prev.request, relative_permeability: {...prev.request.relative_permeability, real: action.payload}}}
    case "setMrImag":
      return {...prev, request: {...prev.request, relative_permeability: {...prev.request.relative_permeability, imag: action.payload}}}
    case "setErReal":
      return {...prev, request: {...prev.request, relative_permitivity: {...prev.request.relative_permitivity, real: action.payload}}}
    case "setErImag":
      return {...prev, request: {...prev.request, relative_permitivity: {...prev.request.relative_permitivity, imag: action.payload}}}
    default:
      return prev
  }
}


const SimulationContext = createContext<[storeContextType, Dispatch<Action>]>(null)
export const useSimulation = () => useContext(SimulationContext)


export const SimulationProvider: React.FC = (props) => {
  const [paramSim, dispatch] = useReducer(reducerSimulation, initStoreContext)

  return (
    <SimulationContext.Provider value={[paramSim, dispatch]}>
      {props.children}
    </SimulationContext.Provider>
  )
}