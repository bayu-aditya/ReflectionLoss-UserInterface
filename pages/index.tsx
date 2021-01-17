import { Fragment, useReducer, useState } from "react";
import Head from "next/head";
import { 
  TextField, 
  Button, 
  Card, 
  Typography, 
  TableContainer, 
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody} from "@material-ui/core";

import { Graph } from "@components";
import { SimulationModel, simulationRequestType } from "@models";

import styles from "./index.module.scss";

type Action = 
  | {type: "setThickness", payload: number}
  | {type: "setFreqStart", payload: number}
  | {type: "setFreqEnd", payload: number}
  | {type: "setMrReal", payload: number}
  | {type: "setMrImag", payload: number}
  | {type: "setErReal", payload: number}
  | {type: "setErImag", payload: number}

const reducerSimulation = (prev: simulationRequestType, action: Action): simulationRequestType => {
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

const Simulation = new SimulationModel()

export default function Home() {
  const [paramSim, setParamSim] = useReducer(reducerSimulation, Simulation.request)
  const [data, setData] = useState<{
    freq: Array<string>
    data: Array<number>
  }>({
    freq: ["1", "2", "3", "4", "5", "6"],
    data: [12, 19, 3, 10, 2, 3]
  })

  const handleCalculateSimulation = () => {
    let body = {
      ...paramSim
    }

    Simulation.calculate(body, data => setData({
      freq: data.frequency.label,
      data: data.reflection_loss
    }))
  }

  return (
    <Fragment>
      <Head>
        <title>Reflection Loss Simulation</title>
      </Head>

      <div className={styles.root}>
        <div className={styles.body}>
          <Card className={styles.graph}>
            <Graph 
              frequency={data.freq}
              dataset={[
                {
                  data: data.data
                }
              ]}
            />
          </Card>

          <Card className={styles.input}>
            <Typography>Frekuensi (Hz)</Typography>
            <div className={styles.twocolumn}>
              <TextField 
                className={styles.textfield}
                label="Start"
                placeholder="contoh: 0.1"
                type="number"
                defaultValue={paramSim.frequency.start}
                onBlur={e => setParamSim({type: "setFreqStart", payload: parseFloat(e.target.value)})}
                fullWidth
                required
              />
              <TextField 
                className={styles.textfield}
                label="Stop"
                placeholder="contoh: 0.1"
                type="number"
                defaultValue={paramSim.frequency.end}
                onBlur={e => setParamSim({type: "setFreqEnd", payload: parseFloat(e.target.value)})}
                fullWidth
                required
              />
            </div>

            <TextField 
              className={styles.textfield}
              label="Tebal Spesimen (cm)"
              placeholder="contoh: 0.4 untuk 0.4 cm"
              type="number"
              defaultValue={paramSim.absorber_thickness}
              onBlur={e => setParamSim({type: "setThickness", payload: parseFloat(e.target.value)})}
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
                defaultValue={paramSim.relative_permeability.real}
                onBlur={e => setParamSim({type: "setMrReal", payload: parseFloat(e.target.value)})}
                fullWidth
                required
              />
              <TextField 
                className={styles.textfield}
                label="Imaginary"
                placeholder="contoh: 0.1"
                type="number"
                defaultValue={paramSim.relative_permeability.imag}
                onBlur={e => setParamSim({type: "setMrImag", payload: parseFloat(e.target.value)})}
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
                defaultValue={paramSim.relative_permitivity.real}
                onBlur={e => setParamSim({type: "setErReal", payload: parseFloat(e.target.value)})}
                fullWidth
                required
              />
              <TextField 
                className={styles.textfield}
                label="Imaginary"
                placeholder="contoh: 0.1"
                type="number"
                defaultValue={paramSim.relative_permitivity.imag}
                onBlur={e => setParamSim({type: "setErImag", payload: parseFloat(e.target.value)})}
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

        <Card>
          <TableContainer style={{height: '300px'}}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Frekuensi (Hz)</TableCell>
                  <TableCell>Impedance Real</TableCell>
                  <TableCell>Impedance Imag</TableCell>
                  <TableCell>Reflection Loss (dB)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Simulation.data.frequency.value.map((el, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{el}</TableCell>
                    <TableCell>{Simulation.data.impedance.real[idx]}</TableCell>
                    <TableCell>{Simulation.data.impedance.imag[idx]}</TableCell>
                    <TableCell>{Simulation.data.reflection_loss[idx]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </Fragment>
  )
}
