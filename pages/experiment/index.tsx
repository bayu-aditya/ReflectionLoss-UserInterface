import { useState } from "react";
import Head from "next/head";
import { 
  Button, 
  Card, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead,
  TableRow} from "@material-ui/core";

import { 
  ExperimentModel, 
  datasetExperimentType, 
  initDataset, 
  calculateExperimentType,
  initCalculateExperiment } from "@models";
import { MultiGraph } from "@components";

import styles from "./index.module.scss";

const Experiment = new ExperimentModel()

export default function ExperimentPage() { 
  const [dataset, setDataset] = useState<datasetExperimentType>(initDataset)
  const [dataCalc, setDataCalc] = useState<calculateExperimentType>(initCalculateExperiment)
  
  const handleUploadFile = (file: File | undefined) => {
    if (file === undefined) { return }
    Experiment.uploadDataset(file)
  }

  const handleGetDataset = () => {
    Experiment.getDataset(data => setDataset({...data}))
  }

  const handleCalculate = () => {
    Experiment.calculate(data => setDataCalc({...data}))
  }

  return (
    <div className={styles.root}>
      <Head>
        <title>Reflection Loss: Experiment</title>
      </Head>

      <div>
        <Button
          component="label"
          variant="outlined"
          fullWidth
          htmlFor="file-unggah"
        >
          Unggah Data
          <input 
            id="file-unggah"
            type="file"
            accept=".csv"
            style={{display: "none"}}
            onChange={e => handleUploadFile(e.target.files[0])}
          />
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleGetDataset}
        >
          Data
        </Button>

        <Card>
          <TableContainer style={{height: '300px'}}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{whiteSpace: "pre"}}>Frekuensi (Hz)</TableCell>
                  <TableCell>S11 Real</TableCell>
                  <TableCell>S11 Imag</TableCell>
                  <TableCell>S12 Real</TableCell>
                  <TableCell>S12 Imag</TableCell>
                  <TableCell>S21 Real</TableCell>
                  <TableCell>S21 Imag</TableCell>
                  <TableCell>S22 Real</TableCell>
                  <TableCell>S22 Imag</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataset.frequency.map((el, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{el}</TableCell>
                    <TableCell>{dataset.s11.real[idx]}</TableCell>
                    <TableCell>{dataset.s11.imag[idx]}</TableCell>
                    <TableCell>{dataset.s12.real[idx]}</TableCell>
                    <TableCell>{dataset.s12.imag[idx]}</TableCell>
                    <TableCell>{dataset.s21.real[idx]}</TableCell>
                    <TableCell>{dataset.s21.imag[idx]}</TableCell>
                    <TableCell>{dataset.s22.real[idx]}</TableCell>
                    <TableCell>{dataset.s22.imag[idx]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>

      <div className={styles.body}>
        <Card>
          <MultiGraph 
            className={styles.graphs}
            configs={[
              {
                className: styles.graph,
                frequency: dataCalc.frequency.label,
                dataset: [
                  {
                    data: dataCalc.reflection_loss,
                    label: "Reflection Loss"
                  }
                ]
              },
              {
                className: styles.graph,
                frequency: dataCalc.frequency.label,
                dataset: [
                  {
                    data: dataCalc.impedance.real,
                    label: "Impedance Real",
                    borderColor: 'rgb(255, 0, 0)',
                  },
                  {
                    data: dataCalc.impedance.imag,
                    label: "Impedance Imag",
                    backgroundColor: 'rgb(100, 100, 250)',
                    borderColor: 'rgb(100, 100, 250)',
                  }
                ]
              },
              {
                className: styles.graph,
                frequency: dataCalc.frequency.label,
                dataset: [
                  {
                    data: dataCalc.relative_permitivity.real,
                    label: "Relative Permitivity Real",
                    borderColor: 'rgb(255, 0, 0)',
                  },
                  {
                    data: dataCalc.relative_permitivity.imag,
                    label: "Relative Permitivity Imag",
                    backgroundColor: 'rgb(100, 100, 250)',
                    borderColor: 'rgb(100, 100, 250)',
                  }
                ]
              },
              {
                className: styles.graph,
                frequency: dataCalc.frequency.label,
                dataset: [
                  {
                    data: dataCalc.relative_permeability.real,
                    label: "Relative Permeability Real",
                    borderColor: 'rgb(255, 0, 0)',
                  },
                  {
                    data: dataCalc.relative_permeability.imag,
                    label: "Relative Permeability Imag",
                    backgroundColor: 'rgb(100, 100, 250)',
                    borderColor: 'rgb(100, 100, 250)',
                  }
                ]
              },
              {
                className: styles.graph,
                frequency: dataCalc.frequency.label,
                dataset: [
                  {
                    data: dataCalc.transmitance.real,
                    label: "Transmitance Real",
                    borderColor: 'rgb(255, 0, 0)',
                  },
                  {
                    data: dataCalc.transmitance.imag,
                    label: "Transmitance Imag",
                    backgroundColor: 'rgb(100, 100, 250)',
                    borderColor: 'rgb(100, 100, 250)',
                  }
                ]
              },
              {
                className: styles.graph,
                frequency: dataCalc.frequency.label,
                dataset: [
                  {
                    data: dataCalc.reflectance.real,
                    label: "Reflectance Real",
                    borderColor: 'rgb(255, 0, 0)',
                  },
                  {
                    data: dataCalc.reflectance.imag,
                    label: "Reflectance Imag",
                    backgroundColor: 'rgb(100, 100, 250)',
                    borderColor: 'rgb(100, 100, 250)',
                  }
                ]
              }
            ]}
          />
        </Card>

        <Card className={styles.panel}>
          <Button
            variant="outlined"
            fullWidth
            // onClick={handleCalculate}
          >
            Dataset
          </Button>
          
          <Button
            variant="outlined"
            fullWidth
            onClick={handleCalculate}
          >
            Calculate
          </Button>
        </Card>
      </div>
    </div>
  )
}