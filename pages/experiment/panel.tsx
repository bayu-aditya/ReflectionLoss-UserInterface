import { Button, Card, TextField, Typography } from "@material-ui/core"

import { useExperiment } from "./context";
import styles from "./index.module.scss";

interface PanelProps {
  onClickDataset: () => void
  onClickCalculate: () => void
  onClickDownload: () => void
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [store, dispatch] = useExperiment()

  return (
    <Card className={styles.panel}>
      <TextField 
        className={styles.textfield}
        label="Ketebalan (cm)"
        placeholder="contoh: 0.1"
        type="number"
        defaultValue={store.request.thickness}
        onBlur={e => dispatch({type: "setThickness", payload: parseFloat(e.target.value)})}
        fullWidth
        required
      />

      <Typography>Konstanta</Typography>
      <div className={styles.twocolumn}>
        <TextField 
          className={styles.textfield}
          label="Lambda 0"
          placeholder="contoh: 0.1"
          type="number"
          defaultValue={store.request.lambda_0}
          onBlur={e => dispatch({type: "setLambda0", payload: parseFloat(e.target.value)})}
          fullWidth
          required
        />
        <TextField 
          className={styles.textfield}
          label="Lambda C"
          placeholder="contoh: 0.1"
          type="number"
          defaultValue={store.request.lambda_C}
          onBlur={e => dispatch({type: "setLambdaC", payload: parseFloat(e.target.value)})}
          fullWidth
          required
        />
      </div>

      <Button
        variant="outlined"
        fullWidth
        onClick={props.onClickDataset}
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