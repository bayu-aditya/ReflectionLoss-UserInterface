import Axios from "axios";
import Cookies from "js-cookie"

import { apiUrl } from "@variables";
import { OutlinedFlagOutlined } from "@material-ui/icons";

type responseUploadInputDatasetType = {
  message: string
  key: string
}

type responseInputDatasetType = {
  message: string
  data: {
    frequency: {[key: string]: number},
    mr_r: {[key: string]: number},
    mr_i: {[key: string]: number},
    er_r: {[key: string]: number},
    er_i: {[key: string]: number},
  }
}

export type datasetInputType = {
  frequency: Array<number>
  mr: {
    real: Array<number>
    imag: Array<number>
  }
  er: {
    real: Array<number>
    imag: Array<number>
  }
}

const initInputDataset: datasetInputType = {
  frequency: [],
  mr: {real: [], imag: []},
  er: {real: [], imag: []},
}

type simulationResponseType = {
  frequency: {
    label: Array<string>,
    value: Array<number>
  },
  impedance: {
    real: Array<number>
    real_filter: Array<number>
    imag: Array<number>
    imag_filter: Array<number>
  },
  reflection_loss: {
    original: Array<number>
    filter: Array<number>
  }
}

const initSimulationData: simulationResponseType= {
  frequency: {
    label: [],
    value: []
  },
  impedance: {
    real: [],
    real_filter: [],
    imag: [],
    imag_filter: []
  },
  reflection_loss: {
    original: [],
    filter: []
  }
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
    },
    savgol_filter: {
      window_length: 5,
      polyorder: 2
    }
  }
}

export type simulationRequestType = typeof initSimulationRequest

const initSimulationWithDataRequest = {
  absorber_thickness: 4.74,
  option: {
    show: {
      impedance: true,
      absorption: true,
    },
    savgol_filter: {
      window_length: 5,
      polyorder: 2
    }
  }
}

export type simulationWithDataRequestType = typeof initSimulationWithDataRequest


export class SimulationModel {
  data: simulationResponseType = initSimulationData
  inputData: datasetInputType = initInputDataset
  request: simulationRequestType = initSimulationRequest

  calculate(
    body: simulationRequestType, 
    onSuccess: (data: simulationResponseType) => void
  ) {
    Axios.post<simulationResponseType>(apiUrl.simulation.calculate, body)
    .then(resp => {
      this.data = resp.data
      onSuccess(resp.data)
    })
  }

  uploadInputData(
    file: File,
    onSuccess?: (key: string) => void
  ) {
    let formData = new FormData()
    formData.append("data", file)

    Axios.post<responseUploadInputDatasetType>(apiUrl.simulation.data, formData)
    .then(resp => {
      Cookies.set("key_simulation", resp.data.key, { expires: 1 })
      onSuccess && onSuccess(resp.data.key)
    })
  }

  getInputData(
    onSuccess?: (data: datasetInputType) => void,
    onFailed?: () => void
  ) {
    let key = Cookies.get("key_simulation")
    if (key === undefined) { 
      onFailed && onFailed()
      return 
    }

    Axios.get<responseInputDatasetType>(apiUrl.simulation.data, {
      headers: {"key": key}
    })
    .then(resp => {
      let { data } = resp.data

      let freqs: datasetInputType["frequency"] = []
      Object.entries(data.frequency).forEach(([_, val]) => {
        freqs.push(val)
      })

      let mr_r: datasetInputType["mr"]["real"] = []
      Object.entries(data.mr_r).forEach(([_, val]) => {
        mr_r.push(val)
      })
      let mr_i: datasetInputType["mr"]["imag"] = []
      Object.entries(data.mr_i).forEach(([_, val]) => {
        mr_i.push(val)
      })

      let er_r: datasetInputType["er"]["real"] = []
      Object.entries(data.er_r).forEach(([_, val]) => {
        er_r.push(val)
      })
      let er_i: datasetInputType["er"]["imag"] = []
      Object.entries(data.er_i).forEach(([_, val]) => {
        er_i.push(val)
      })

      this.inputData.frequency = freqs
      this.inputData.mr.real = mr_r
      this.inputData.mr.imag = mr_i
      this.inputData.er.real = er_r
      this.inputData.er.imag = er_i

      onSuccess && onSuccess(this.inputData)
    })
  }

  calculateWithData(
    body: simulationWithDataRequestType,
    onSuccess: (data: simulationResponseType) => void
  ) {
    let key = Cookies.get("key_simulation")

    if (key === undefined) {
      alert("input dataset not found")
      return
    }

    Axios.post<simulationResponseType>(apiUrl.simulation.calculateWithData, body, {
      headers: {"key": key}
    })
    .then(resp => {
      this.data = resp.data
      onSuccess(resp.data)
    })
  }

  // downloadCSV() {}
}