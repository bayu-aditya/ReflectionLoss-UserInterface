import Axios from "axios";
import Cookies from "js-cookie";

import { apiUrl } from "@variables";
import { Downloader } from "@tools";

type responseUploadDatasetType = {
  message: string
  key: string
}

type responseDatasetType = {
  message: string
  data: {
    frequency: {[key: string]: number},
    s11r: {[key: string]: number},
    s11i: {[key: string]: number},
    s12r: {[key: string]: number},
    s12i: {[key: string]: number},
    s21r: {[key: string]: number},
    s21i: {[key: string]: number},
    s22r: {[key: string]: number},
    s22i: {[key: string]: number},
  }
}

export type datasetExperimentType = {
  frequency: Array<number>
  s11: {
    real: Array<number>,
    imag: Array<number>
  },
  s21: {
    real: Array<number>,
    imag: Array<number>
  },
  s12: {
    real: Array<number>,
    imag: Array<number>
  },
  s22: {
    real: Array<number>,
    imag: Array<number>
  },
}

export const initDataset: datasetExperimentType = {
  frequency: [],
  s11: {real: [], imag: []},
  s12: {real: [], imag: []},
  s21: {real: [], imag: []},
  s22: {real: [], imag: []},
}

export type calculateExperimentType = {
  frequency: {
    label: Array<string>,
    value: Array<number>,
  },
  reflectance: {
    real: Array<number>,
    real_filter: Array<number>,
    imag: Array<number>,
    imag_filter: Array<number>,
  },
  transmitance: {
    real: Array<number>,
    real_filter: Array<number>,
    imag: Array<number>,
    imag_filter: Array<number>,
  },
  relative_permeability: {
    real: Array<number>,
    real_filter: Array<number>,
    imag: Array<number>,
    imag_filter: Array<number>,
  },
  relative_permitivity: {
    real: Array<number>,
    real_filter: Array<number>,
    imag: Array<number>,
    imag_filter: Array<number>,
  },
  impedance: {
    real: Array<number>,
    real_filter: Array<number>,
    imag: Array<number>,
    imag_filter: Array<number>,
  },
  reflection_loss: {
    original: Array<number>
    filter: Array<number>
  }
}

export const initCalculateExperiment: calculateExperimentType = {
  frequency: {label: [], value: []},
  reflectance: {real: [], real_filter: [], imag: [], imag_filter: []},
  transmitance: {real: [], real_filter: [], imag: [], imag_filter: []},
  relative_permeability: {real: [], real_filter: [], imag: [], imag_filter: []},
  relative_permitivity: {real: [], real_filter: [], imag: [], imag_filter: []},
  impedance: {real: [], real_filter: [], imag: [], imag_filter: []},
  reflection_loss: {original: [], filter: []}
}

const initExperimentRequest = {
  thickness: 4.731,
  lambda_0: 2.75,
  lambda_C: 3.98,
  option: {
    savgol_filter: {
      window_length: 9,
      polyorder: 2
    }
  }
}

export type experimentRequestType = typeof initExperimentRequest


export class ExperimentModel {
  dataset: datasetExperimentType = initDataset
  request: experimentRequestType = initExperimentRequest

  uploadDataset(file: File, onSuccess?: () => void) {
    let formData = new FormData()
    formData.append("data", file)

    Axios.post<responseUploadDatasetType>(apiUrl.experiment.data, formData)
    .then(resp => {
      Cookies.set("key_experiment", resp.data.key, { expires: 1 })
      onSuccess && onSuccess()
    })
  }

  getDataset(onSuccess?: (data: datasetExperimentType) => void) {
    let key = Cookies.get("key_experiment")

    Axios.get<responseDatasetType>(apiUrl.experiment.data, {
      headers: {"key": key}
    })
    .then(resp => {
      let { data } = resp.data

      let freqs: datasetExperimentType["frequency"] = []
      Object.entries(data.frequency).forEach(([_, val]) => {
        freqs.push(val)
      })

      let s11r: datasetExperimentType["s11"]["real"] = []
      Object.entries(data.s11r).forEach(([_, val]) => {
        s11r.push(val)
      })
      let s11i: datasetExperimentType["s11"]["imag"] = []
      Object.entries(data.s11i).forEach(([_, val]) => {
        s11i.push(val)
      })

      let s12r: datasetExperimentType["s12"]["real"] = []
      Object.entries(data.s12r).forEach(([_, val]) => {
        s12r.push(val)
      })
      let s12i: datasetExperimentType["s12"]["imag"] = []
      Object.entries(data.s12i).forEach(([_, val]) => {
        s12i.push(val)
      })

      let s21r: datasetExperimentType["s21"]["real"] = []
      Object.entries(data.s21r).forEach(([_, val]) => {
        s21r.push(val)
      })
      let s21i: datasetExperimentType["s21"]["imag"] = []
      Object.entries(data.s21i).forEach(([_, val]) => {
        s21i.push(val)
      })

      let s22r: datasetExperimentType["s22"]["real"] = []
      Object.entries(data.s22r).forEach(([_, val]) => {
        s22r.push(val)
      })
      let s22i: datasetExperimentType["s22"]["imag"] = []
      Object.entries(data.s22i).forEach(([_, val]) => {
        s22i.push(val)
      })

      this.dataset.frequency = freqs
      this.dataset.s11.real = s11r
      this.dataset.s11.imag = s11i
      this.dataset.s12.real = s12r
      this.dataset.s12.imag = s12i
      this.dataset.s21.real = s21r
      this.dataset.s21.imag = s21i
      this.dataset.s22.real = s22r
      this.dataset.s22.imag = s22i

      onSuccess && onSuccess(this.dataset)
    })    
  }

  calculate(
    body: experimentRequestType,
    onSuccess?: (data: calculateExperimentType) => void
  ) {
    let key = Cookies.get("key_experiment")
    
    Axios.post<calculateExperimentType>(apiUrl.experiment.calculate, body, {
      headers: {"key": key}
    })
    .then(resp => {
      onSuccess && onSuccess(resp.data)
    })
  }

  downloadResult(
    body: experimentRequestType,
    onSuccess?: () => void
  ) {
    let key = Cookies.get("key_experiment")

    Axios.post(apiUrl.experiment.calculate, body, {
      headers: {
        "key": key,
        "download_result": true
      },
      responseType: 'blob',
    })
    .then(resp => {
      Downloader(resp)
      onSuccess && onSuccess()
    })
  }
}