import { apiUrl } from "@variables";
import Axios from "axios";

type simulationDataType = {
  frequency: {
    label: Array<string>,
    value: Array<number>
  },
  impedance: {
    real: Array<number>,
    imag: Array<number>
  },
  reflection_loss: Array<number>
}

const initSimulationData: simulationDataType= {
  frequency: {
    label: [],
    value: []
  },
  impedance: {
    real: [],
    imag: []
  },
  reflection_loss: []
}

const initSimulationRequest = {
  absorber_thickness: 4.74,
  frequency: {
    start: 0.0,
    end: 1.0e8,
    num_data: 100
  },
  relative_permeability: {
    real: 0.7,
    imag: -0.1
  },
  relative_permitivity: {
    real: 2.0,
    imag: 0.9
  },
  option: {
    show: {
      impedance: true,
      absorption: true
    }
  }
}

export type simulationRequestType = typeof initSimulationRequest


export class SimulationModel {
  data: simulationDataType = initSimulationData
  request: simulationRequestType = initSimulationRequest

  calculate(
    body: simulationRequestType, 
    onSuccess: (data: simulationDataType) => void
  ) {
    Axios.post<simulationDataType>(apiUrl.simulation.calculate, body)
    .then(resp => {
      this.data = resp.data
      onSuccess(resp.data)
    })
  }

  // downloadCSV() {}
}