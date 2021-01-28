import { Button, Card, TextField, Typography } from "@material-ui/core"

import styles from "./index.module.scss";

interface PanelProps {
  onClickCalculate: () => void
  onClickDownload: () => void
}

export const Panel: React.FC<PanelProps> = (props) => {
  return (
    <Card className={styles.panel}>
      <Typography>Konstanta</Typography>
      <div className={styles.twocolumn}>
        <TextField 
          className={styles.textfield}
          label="Lambda 0"
          placeholder="contoh: 0.1"
          type="number"
          // defaultValue={request.relative_permeability.real}
          // onBlur={e => dispatch({type: "setMrReal", payload: parseFloat(e.target.value)})}
          fullWidth
          required
        />
        <TextField 
          className={styles.textfield}
          label="Lambda C"
          placeholder="contoh: 0.1"
          type="number"
          // defaultValue={request.relative_permeability.imag}
          // onBlur={e => dispatch({type: "setMrImag", payload: parseFloat(e.target.value)})}
          fullWidth
          required
        />
      </div>

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
        onClick={props.onClickCalculate}
      >
        Hitung
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={props.onClickDownload}
      >
        Unduh Perhitungan
      </Button>
    </Card>
  )
}