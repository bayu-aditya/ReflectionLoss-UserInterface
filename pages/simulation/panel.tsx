import React from 'react'
import { 
  Card, 
  Typography,
  TextField, 
  Button,
  Tabs,
  Tab,
  Divider } from "@material-ui/core";

import { useSimulation } from "./context";
import styles from "./index.module.scss"

interface IPanel {
  mode: "static" | "dynamic"
  onChangeMode?: (mode: "static" | "dynamic") => void
  onClickDataset?: () => void
  onSubmit?: () => void
}

export const Panel: React.FC<IPanel> = (props) => {
  const { mode, onChangeMode } = props
  const [{request}, dispatch] = useSimulation()

  const handleChangeTab = (val:any) => {
    onChangeMode && onChangeMode(val === 0 ? "static" : "dynamic")
  }

  return (
    <Card className={styles.panel}>
      <Tabs 
        value={mode === "static" ? 0 : 1}
        onChange={(_, val) => handleChangeTab(val)}
      >
        <Tab label="Static" />
        <Tab label="Dynamic" />
      </Tabs>
      <Divider />

      <TextField 
        className={styles.textfield}
        label="Tebal Spesimen (cm)"
        placeholder="contoh: 0.4 untuk 0.4 cm"
        type="number"
        defaultValue={request.absorber_thickness}
        onBlur={e => dispatch({type: "setThickness", payload: parseFloat(e.target.value)})}
        fullWidth
        required
      />

      <div hidden={mode !== "static"}>
        <Typography>Frekuensi (Hz)</Typography>
        <div className={styles.twocolumn}>
          <TextField 
            className={styles.textfield}
            label="Start"
            placeholder="contoh: 0.1"
            type="number"
            defaultValue={request.frequency.start}
            onBlur={e => dispatch({type: "setFreqStart", payload: parseFloat(e.target.value)})}
            fullWidth
            required
          />
          <TextField 
            className={styles.textfield}
            label="Stop"
            placeholder="contoh: 0.1"
            type="number"
            defaultValue={request.frequency.end}
            onBlur={e => dispatch({type: "setFreqEnd", payload: parseFloat(e.target.value)})}
            fullWidth
            required
          />
        </div>

        <Typography>Permeabilitas Relatif</Typography>
        <div className={styles.twocolumn}>
          <TextField 
            className={styles.textfield}
            label="Real"
            placeholder="contoh: 0.1"
            type="number"
            defaultValue={request.relative_permeability.real}
            onBlur={e => dispatch({type: "setMrReal", payload: parseFloat(e.target.value)})}
            fullWidth
            required
          />
          <TextField 
            className={styles.textfield}
            label="Imaginary"
            placeholder="contoh: 0.1"
            type="number"
            defaultValue={request.relative_permeability.imag}
            onBlur={e => dispatch({type: "setMrImag", payload: parseFloat(e.target.value)})}
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
            defaultValue={request.relative_permitivity.real}
            onBlur={e => dispatch({type: "setErReal", payload: parseFloat(e.target.value)})}
            fullWidth
            required
          />
          <TextField 
            className={styles.textfield}
            label="Imaginary"
            placeholder="contoh: 0.1"
            type="number"
            defaultValue={request.relative_permitivity.imag}
            onBlur={e => dispatch({type: "setErImag", payload: parseFloat(e.target.value)})}
            fullWidth
            required
          />
        </div>
      </div>
      
      <div hidden={mode !== "dynamic"}>
        <Button
          className={styles.button}
          variant="outlined"
          onClick={props.onClickDataset}
          fullWidth
        >
          Dataset
        </Button>
      </div>

      <Button
        className={styles.button}
        variant="outlined"
        onClick={props.onSubmit}
        fullWidth
      >
        Hitung
      </Button>

      <Button
        className={styles.button}
        variant="outlined"
        // onClick={props.onSubmit}
        fullWidth
      >
        Unduh Data Perhitungan
      </Button>
    </Card>
  )
}