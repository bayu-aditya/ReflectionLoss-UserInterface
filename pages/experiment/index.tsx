import { useState } from "react";
import Head from "next/head";
import { 
  Button, 
  Card, 
  Divider, 
  Tab, 
  Table, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TableBody,
  Tabs} from "@material-ui/core";

import { 
  ExperimentModel, 
  datasetExperimentType, 
  initDataset, 
  calculateExperimentType,
  initCalculateExperiment } from "@models";
import { MainLayout, Graph } from "@components";

import { ExperimentProvider } from "./context";
import { Panel } from "./panel";
import styles from "./index.module.scss";

const Experiment = new ExperimentModel()


export default function ExperimentPage() {
  return (
    <ExperimentProvider>
      <MainLayout>
        <ExperimentBody />
      </MainLayout>
    </ExperimentProvider>
  )  
}

const ExperimentBody: React.FC = () =>  { 
  const [dataset, setDataset] = useState<datasetExperimentType>(initDataset)
  const [dataCalc, setDataCalc] = useState<calculateExperimentType>(initCalculateExperiment)

  const [graphMode, setGraphMode] = useState<number>(0)
  
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

      <div hidden>
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
          <Tabs
            value={graphMode}
            onChange={(_, val) => setGraphMode(val)}
          >
            <Tab label="Reflection Loss" />
            <Tab label="Impedansi" />
            <Tab label="Permitivitas" />
            <Tab label="Permeabilitas" />
            <Tab label="Transmitansi" />
            <Tab label="Reflektansi" />
          </Tabs>
          <Divider />

          <Graph 
            hidden={graphMode !== 0}
            frequency={dataCalc.frequency.label}
            dataset={[
              {
                data: dataCalc.reflection_loss.original,
                label: "Reflection Loss",
                borderColor: 'rgba(255, 0, 0, 0.1)',
                pointRadius: 2,
              },
              {
                data: dataCalc.reflection_loss.filter,
                label: "Reflection Loss (Filter)",
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 0,
              }
            ]}
          />

          <Graph 
            hidden={graphMode !== 1}
            frequency={dataCalc.frequency.label}
            dataset={[
              {
                data: dataCalc.impedance.real,
                label: "Real",
                borderColor: 'rgba(255, 0, 0, 0.1)',
                pointRadius: 2,
              },
              {
                data: dataCalc.impedance.real_filter,
                label: "Real (Filter)",
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 0,
              },
              {
                data: dataCalc.impedance.imag,
                label: "Imag",
                borderColor: 'rgba(0, 0, 255, 0.1)',
                backgroundColor: 'rgb(0, 0, 255)',
                pointRadius: 2,
              },
              {
                data: dataCalc.impedance.imag_filter,
                label: "Imag (Filter)",
                borderColor: 'rgb(0, 0, 255)',
                backgroundColor: 'rgb(0, 0, 255)',
                pointRadius: 0,
              }
            ]}
          />

          <Graph 
            hidden={graphMode !== 2}
            frequency={dataCalc.frequency.label}
            dataset={[
              {
                data: dataCalc.relative_permitivity.real,
                label: "Real",
                borderColor: 'rgba(255, 0, 0, 0.1)',
                pointRadius: 2,
              },
              {
                data: dataCalc.relative_permitivity.real_filter,
                label: "Real (Filter)",
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 0,
              },
              {
                data: dataCalc.relative_permitivity.imag,
                label: "Imag",
                borderColor: 'rgba(0, 0, 255, 0.1)',
                backgroundColor: 'rgb(0, 0, 255)',
                pointRadius: 2,
              },
              {
                data: dataCalc.relative_permitivity.imag_filter,
                label: "Imag (Filter)",
                borderColor: 'rgb(0, 0, 255)',
                backgroundColor: 'rgb(0, 0, 255)',
                pointRadius: 0,
              }
            ]}
          />

          <Graph 
            hidden={graphMode !== 3}
            frequency={dataCalc.frequency.label}
            dataset={[
              {
                data: dataCalc.relative_permeability.real,
                label: "Real",
                borderColor: 'rgba(255, 0, 0, 0.1)',
                pointRadius: 2,
              },
              {
                data: dataCalc.relative_permeability.real_filter,
                label: "Real (Filter)",
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 0,
              },
              {
                data: dataCalc.relative_permeability.imag,
                label: "Imag",
                borderColor: 'rgba(0, 0, 255, 0.1)',
                backgroundColor: 'rgb(0, 0, 255)',
                pointRadius: 2,
              },
              {
                data: dataCalc.relative_permeability.imag_filter,
                label: "Imag (Filter)",
                borderColor: 'rgb(0, 0, 255)',
                backgroundColor: 'rgb(0, 0, 255)',
                pointRadius: 0,
              }
            ]}
          />

          <Graph 
            hidden={graphMode !== 4}
            frequency={dataCalc.frequency.label}
            dataset={[
              {
                data: dataCalc.transmitance.real,
                label: "Real",
                borderColor: 'rgba(255, 0, 0, 0.1)',
                pointRadius: 2,
              },
              {
                data: dataCalc.transmitance.real_filter,
                label: "Real (Filter)",
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 0,
              },
              {
                data: dataCalc.transmitance.imag,
                label: "Imag",
                borderColor: 'rgba(0, 0, 255, 0.1)',
                backgroundColor: 'rgb(0, 0, 255)',
                pointRadius: 2,
              },
              {
                data: dataCalc.transmitance.imag_filter,
                label: "Imag (Filter)",
                borderColor: 'rgb(0, 0, 255)',
                backgroundColor: 'rgb(0, 0, 255)',
                pointRadius: 0,
              }
            ]}
          />

          <Graph 
            hidden={graphMode !== 5}
            frequency={dataCalc.frequency.label}
            dataset={[
              {
                data: dataCalc.reflectance.real,
                label: "Real",
                borderColor: 'rgba(255, 0, 0, 0.1)',
                pointRadius: 2,
              },
              {
                data: dataCalc.reflectance.real_filter,
                label: "Real (Filter)",
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 0,
              },
              {
                data: dataCalc.reflectance.imag,
                label: "Imag",
                borderColor: 'rgba(0, 0, 255, 0.1)',
                backgroundColor: 'rgb(0, 0, 255)',
                pointRadius: 2,
              },
              {
                data: dataCalc.reflectance.imag_filter,
                label: "Imag (Filter)",
                borderColor: 'rgb(0, 0, 255)',
                backgroundColor: 'rgb(0, 0, 255)',
                pointRadius: 0,
              }
            ]}
          />
        </Card>

        <Panel 
          onClickCalculate={handleCalculate}
          onClickDownload={() => console.log("download")}
        />
      </div>
    </div>
  )
}