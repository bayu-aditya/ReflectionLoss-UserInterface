import { Fragment, useReducer, useState } from "react";
import Head from "next/head";
import Axios, { AxiosResponse } from "axios";
import { TextField, Button, Card, Typography } from "@material-ui/core";

import { Graph } from "@components";
import { apiUrl } from "@variables";

import styles from "./index.module.scss";


const initSimulation = {
  absorber_thickness: 4.74,
  frequency: {
    start: 1.2,
    end: 18.8,
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
      impedance: false,
      absorption: true
    }
  }
}

type InitSimType = typeof initSimulation
type Action = 
  | {type: "setThickness", payload: number}
  | {type: "setFreqStart", payload: number}
  | {type: "setFreqEnd", payload: number}
  | {type: "setMrReal", payload: number}
  | {type: "setMrImag", payload: number}
  | {type: "setErReal", payload: number}
  | {type: "setErImag", payload: number}

const reducerSimulation = (prev: InitSimType, action: Action): InitSimType => {
  switch (action.type) {
    case "setThickness":
      return {...prev, absorber_thickness: action.payload}
    case "setFreqStart":
      return {...prev, frequency: {...prev.frequency, start: action.payload}}
    case "setFreqEnd":
      return {...prev, frequency: {...prev.frequency, end: action.payload}}
    case "setMrReal":
      return {...prev, relative_permeability: {...prev.relative_permeability, real: action.payload}}
    case "setMrImag":
      return {...prev, relative_permeability: {...prev.relative_permeability, imag: action.payload}}
    case "setErReal":
      return {...prev, relative_permitivity: {...prev.relative_permitivity, real: action.payload}}
    case "setErImag":
      return {...prev, relative_permitivity: {...prev.relative_permitivity, imag: action.payload}}
    default:
      return prev
  }
}

type calcResponse = {
  absorption: Array<number>
}

export default function Home() {
  const [paramSim, setParamSim] = useReducer(reducerSimulation, initSimulation)
  const [data, setData] = useState<Array<number>>([12, 19, 3, 10, 2, 3])

  const handleCalculateSimulation = () => {
    let body = {
      ...paramSim
    }

    Axios.post<calcResponse>(apiUrl.calculate, body)
    .then(resp => {
      console.log(resp.data)
      setData(resp.data.absorption)
    })
  }

  return (
    <Fragment>
      <Head>
        <title>Reflection Loss Simulation</title>
      </Head>

      <div className={styles.root}>
        <div className={styles.body}>
          <div className={styles.graph}>
            <Graph 
              dataset={[
                {
                  data: data
                }
              ]}
            />
          </div>

          <Card className={styles.input}>
            <Typography>Frekuensi (Hz)</Typography>
            <div className={styles.twocolumn}>
              <TextField 
                className={styles.textfield}
                label="Start"
                placeholder="contoh: 0.1"
                type="number"
                value={paramSim.frequency.start || ""}
                onChange={e => setParamSim({type: "setFreqStart", payload: parseFloat(e.target.value)})}
                fullWidth
                required
              />
              <TextField 
                className={styles.textfield}
                label="Stop"
                placeholder="contoh: 0.1"
                type="number"
                value={paramSim.frequency.end || ""}
                onChange={e => setParamSim({type: "setFreqEnd", payload: parseFloat(e.target.value)})}
                fullWidth
                required
              />
            </div>

            <TextField 
              className={styles.textfield}
              label="Tebal Spesimen (cm)"
              placeholder="contoh: 0.4 untuk 0.4 cm"
              type="number"
              value={paramSim.absorber_thickness || ""}
              onChange={e => setParamSim({type: "setThickness", payload: parseFloat(e.target.value)})}
              fullWidth
              required
            />
            
            <Typography>Panjang Gelombang</Typography>
            <div className={styles.twocolumn}>
              <TextField 
                className={styles.textfield}
                label="Ruang Hampa (m)"
                placeholder="contoh: 0.4 untuk 0.4 m"
                type="number"
                value={"2.75"}
                fullWidth
                required
                disabled
              />
              <TextField 
                className={styles.textfield}
                label="Cutoff (m)"
                placeholder="contoh: 0.4 untuk 0.4 m"
                type="number"
                value={"3.98"}
                fullWidth
                required
                disabled
              />
            </div>

            <Typography>Permeabilitas Relatif</Typography>
            <div className={styles.twocolumn}>
              <TextField 
                className={styles.textfield}
                label="Real"
                placeholder="contoh: 0.1"
                type="number"
                value={paramSim.relative_permeability.real || ""}
                onChange={e => setParamSim({type: "setMrReal", payload: parseFloat(e.target.value)})}
                fullWidth
                required
              />
              <TextField 
                className={styles.textfield}
                label="Imaginary"
                placeholder="contoh: 0.1"
                type="number"
                value={paramSim.relative_permeability.imag || ""}
                onChange={e => setParamSim({type: "setMrImag", payload: parseFloat(e.target.value)})}
                fullWidth
                required
              />
            </div>

            <Typography>Permitivitas Relatif</Typography>
            <div className={styles.twocolumn}>
              <TextField 
                className={styles.textfield}
                label="Real"
                placeholder="contoh: 0.1"
                type="number"
                value={paramSim.relative_permitivity.real || ""}
                onChange={e => setParamSim({type: "setErReal", payload: parseFloat(e.target.value)})}
                fullWidth
                required
              />
              <TextField 
                className={styles.textfield}
                label="Imaginary"
                placeholder="contoh: 0.1"
                type="number"
                value={paramSim.relative_permitivity.imag || ""}
                onChange={e => setParamSim({type: "setErImag", payload: parseFloat(e.target.value)})}
                fullWidth
                required
              />
            </div>

            <Button
              className={styles.button}
              variant="outlined"
              onClick={handleCalculateSimulation}
              fullWidth
            >
              Hitung
            </Button>

            {/* <Button
              className={styles.button}
              component="label"
              variant="outlined"
              fullWidth
            >
              Unggah Data
              <input 
                id="file-unggah"
                type="file"
                style={{display: "none"}}
              />
            </Button> */}
          </Card>
        </div>

        <div>
          <Button>Unduh</Button>
        </div>
      </div>
    </Fragment>
  )
}
