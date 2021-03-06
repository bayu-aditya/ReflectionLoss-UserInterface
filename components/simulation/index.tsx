import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { Card, Tab, Tabs, Divider } from "@material-ui/core";

import { Graph, MainLayout } from "@components";
import { SimulationModel } from "@models";

import { SimulationProvider, useSimulation } from "./context";
import { Panel } from "./panel";
import { DatasetDialog } from "./dataset";
import styles from "./index.module.scss";


const Simulation = new SimulationModel()

export default function SimulationPage() {
  return (
    <SimulationProvider>
      <MainLayout>
        <SimulationBody />
      </MainLayout>
    </SimulationProvider>
  )
}

function SimulationBody() {
  const [store, dispatch] = useSimulation()
  const [mode, setMode] = useState<"static" | "dynamic">("static")
  const [openDataset, setOpenDataset] = useState<boolean>(false)
  const [graphMode, setGraphMode] = useState<number>(0)

  useEffect(() => {
    Simulation.getInputData(data => {
      dispatch({type: "setInputData", payload: data})
    })
  }, [])

  const handleUploadInput = (file: File | undefined) => {
    if (file === undefined) { return }
    Simulation.uploadInputData(file, () => {
      Simulation.getInputData(data => {
        dispatch({type: "setInputData", payload: data})
      })
    })
  }

  const handleCalculateSimulation = () => {
    let body = store.request

    if (mode === "static") {
      Simulation.calculate(body, data => {
        dispatch({type: "setDataCalculation", payload: data})
      })
    } else {
      Simulation.calculateWithData(body, data => {
        dispatch({type: "setDataCalculation", payload: data})
      })
    }
  }

  const handleDownloadResult = (modeCalculation: typeof mode) => {
    let body = store.request

    if (modeCalculation === "static") {
      Simulation.downloadResultStatic(body, () => console.log("download result static"))
    } else {
      Simulation.downloadResultDynamic(body, () => console.log("donwload result dynamic"))
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Reflection Loss: Simulation</title>
      </Head>

      <DatasetDialog 
        open={openDataset}
        onClose={() => setOpenDataset(false)}
        onUploadDataset={handleUploadInput}
      />

      <div className={styles.root}>
        <div className={styles.body}>
          <Card className={styles.graph}>
            <Tabs
              value={graphMode}
              onChange={(_, val) => setGraphMode(val)}
            >
              <Tab label="Reflection Loss" />
              <Tab label="Impedansi" />
            </Tabs>
            <Divider />

            <Graph 
              hidden={graphMode !== 0}
              frequency={store.data.frequency?.label}
              ylabel="Relection Loss"
              dataset={[
                {
                  data: store.data.reflection_loss?.original,
                  label: "Original",
                  borderColor: 'rgba(255, 0, 0, 0.2)',
                },
                {
                  data: store.data.reflection_loss?.filter,
                  label: "Filter",
                  borderColor: 'rgb(255, 0, 0)',
                  pointRadius: 0,
                }
              ]}
            />

            <Graph 
              hidden={graphMode !== 1}
              frequency={store.data.frequency?.label}
              ylabel="Impedance"
              dataset={[
                {
                  data: store.data.impedance?.real,
                  label: "Real",
                  borderColor: 'rgba(255, 0, 0, 0.2)',
                },
                {
                  data: store.data.impedance?.real_filter,
                  label: "Real Filter",
                  borderColor: 'rgb(255, 0, 0)',
                  pointRadius: 0,
                },
                {
                  data: store.data.impedance?.imag,
                  label: "Imag",
                  borderColor: 'rgba(0, 0, 250, 0.2)',
                  backgroundColor: 'rgb(0, 0, 250)',
                },
                {
                  data: store.data.impedance?.imag_filter,
                  label: "Imag Filter",
                  borderColor: 'rgb(0, 0, 250)',
                  backgroundColor: 'rgb(0, 0, 250)',
                  pointRadius: 0,
                },
              ]}
            />
          </Card>

          <Panel 
            mode={mode}
            onChangeMode={val => setMode(val)}
            onClickDataset={() => setOpenDataset(true)}
            onSubmit={handleCalculateSimulation}
            onClickDownloadResult={handleDownloadResult}
          />
        </div>
      </div>
    </Fragment>
  )
}
