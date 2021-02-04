import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import { 
  Card, 
  Divider, 
  Tab, 
  Tabs} from "@material-ui/core";

import { 
  ExperimentModel, 
  calculateExperimentType,
  initCalculateExperiment } from "@models";
import { MainLayout, Graph } from "@components";

import { ExperimentProvider, useExperiment } from "./context";
import { DatasetDialog } from "./dataset";
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
  const [store, dispatch] = useExperiment()

  const [openDataset, setOpenDataset] = useState<boolean>(false)
  const [dataCalc, setDataCalc] = useState<calculateExperimentType>(initCalculateExperiment)
  const [graphMode, setGraphMode] = useState<number>(0)

  useEffect(() => {
    Experiment.getDataset(data => dispatch({type: "setDataset", payload: data}))
  }, [])
  
  const handleUploadFile = (file: File | undefined) => {
    if (file === undefined) { return }
    Experiment.uploadDataset(file, () => {
      Experiment.getDataset(data => dispatch({type: "setDataset", payload: data}))
    })
  }

  const handleCalculate = () => {
    Experiment.calculate(
      store.request,
      data => setDataCalc({...data})
    )
  }

  const handleDownloadResult = () => {
    let body = store.request
    Experiment.downloadResult(body, () => console.log("download experiment calculation"))
  }

  return (
    <Fragment>
      <DatasetDialog 
        open={openDataset}
        onClose={() => setOpenDataset(false)}
        onUploadDataset={handleUploadFile}
      />

      <div className={styles.root}>
        <Head>
          <title>Reflection Loss: Experiment</title>
        </Head>

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
              frequency={dataCalc.frequency?.label}
              dataset={[
                {
                  data: dataCalc.reflection_loss?.original,
                  label: "Reflection Loss",
                  borderColor: 'rgba(255, 0, 0, 0.1)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.reflection_loss?.filter,
                  label: "Reflection Loss (Filter)",
                  borderColor: 'rgb(255, 0, 0)',
                  pointRadius: 0,
                }
              ]}
            />

            <Graph 
              hidden={graphMode !== 1}
              frequency={dataCalc.frequency?.label}
              dataset={[
                {
                  data: dataCalc.impedance?.real,
                  label: "Real",
                  borderColor: 'rgba(255, 0, 0, 0.1)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.impedance?.real_filter,
                  label: "Real (Filter)",
                  borderColor: 'rgb(255, 0, 0)',
                  pointRadius: 0,
                },
                {
                  data: dataCalc.impedance?.imag,
                  label: "Imag",
                  borderColor: 'rgba(0, 0, 255, 0.1)',
                  backgroundColor: 'rgb(0, 0, 255)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.impedance?.imag_filter,
                  label: "Imag (Filter)",
                  borderColor: 'rgb(0, 0, 255)',
                  backgroundColor: 'rgb(0, 0, 255)',
                  pointRadius: 0,
                }
              ]}
            />

            <Graph 
              hidden={graphMode !== 2}
              frequency={dataCalc.frequency?.label}
              dataset={[
                {
                  data: dataCalc.relative_permitivity?.real,
                  label: "Real",
                  borderColor: 'rgba(255, 0, 0, 0.1)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.relative_permitivity?.real_filter,
                  label: "Real (Filter)",
                  borderColor: 'rgb(255, 0, 0)',
                  pointRadius: 0,
                },
                {
                  data: dataCalc.relative_permitivity?.imag,
                  label: "Imag",
                  borderColor: 'rgba(0, 0, 255, 0.1)',
                  backgroundColor: 'rgb(0, 0, 255)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.relative_permitivity?.imag_filter,
                  label: "Imag (Filter)",
                  borderColor: 'rgb(0, 0, 255)',
                  backgroundColor: 'rgb(0, 0, 255)',
                  pointRadius: 0,
                }
              ]}
            />

            <Graph 
              hidden={graphMode !== 3}
              frequency={dataCalc.frequency?.label}
              dataset={[
                {
                  data: dataCalc.relative_permeability?.real,
                  label: "Real",
                  borderColor: 'rgba(255, 0, 0, 0.1)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.relative_permeability?.real_filter,
                  label: "Real (Filter)",
                  borderColor: 'rgb(255, 0, 0)',
                  pointRadius: 0,
                },
                {
                  data: dataCalc.relative_permeability?.imag,
                  label: "Imag",
                  borderColor: 'rgba(0, 0, 255, 0.1)',
                  backgroundColor: 'rgb(0, 0, 255)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.relative_permeability?.imag_filter,
                  label: "Imag (Filter)",
                  borderColor: 'rgb(0, 0, 255)',
                  backgroundColor: 'rgb(0, 0, 255)',
                  pointRadius: 0,
                }
              ]}
            />

            <Graph 
              hidden={graphMode !== 4}
              frequency={dataCalc.frequency?.label}
              dataset={[
                {
                  data: dataCalc.transmitance?.real,
                  label: "Real",
                  borderColor: 'rgba(255, 0, 0, 0.1)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.transmitance?.real_filter,
                  label: "Real (Filter)",
                  borderColor: 'rgb(255, 0, 0)',
                  pointRadius: 0,
                },
                {
                  data: dataCalc.transmitance?.imag,
                  label: "Imag",
                  borderColor: 'rgba(0, 0, 255, 0.1)',
                  backgroundColor: 'rgb(0, 0, 255)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.transmitance?.imag_filter,
                  label: "Imag (Filter)",
                  borderColor: 'rgb(0, 0, 255)',
                  backgroundColor: 'rgb(0, 0, 255)',
                  pointRadius: 0,
                }
              ]}
            />

            <Graph 
              hidden={graphMode !== 5}
              frequency={dataCalc.frequency?.label}
              dataset={[
                {
                  data: dataCalc.reflectance?.real,
                  label: "Real",
                  borderColor: 'rgba(255, 0, 0, 0.1)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.reflectance?.real_filter,
                  label: "Real (Filter)",
                  borderColor: 'rgb(255, 0, 0)',
                  pointRadius: 0,
                },
                {
                  data: dataCalc.reflectance?.imag,
                  label: "Imag",
                  borderColor: 'rgba(0, 0, 255, 0.1)',
                  backgroundColor: 'rgb(0, 0, 255)',
                  pointRadius: 2,
                },
                {
                  data: dataCalc.reflectance?.imag_filter,
                  label: "Imag (Filter)",
                  borderColor: 'rgb(0, 0, 255)',
                  backgroundColor: 'rgb(0, 0, 255)',
                  pointRadius: 0,
                }
              ]}
            />
          </Card>

          <Panel 
            onClickDataset={() => setOpenDataset(true)}
            onClickCalculate={handleCalculate}
            onClickDownload={handleDownloadResult}
          />
        </div>
      </div>
    </Fragment>
  )
}