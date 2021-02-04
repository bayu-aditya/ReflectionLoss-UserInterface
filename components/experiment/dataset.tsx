import React from 'react';

import { 
  Button,
  Dialog, 
  DialogContent, 
  DialogProps, 
  DialogTitle, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer,
  TableHead,
  TableRow } from "@material-ui/core";

import { useExperiment } from "./context";
import styles from "./index.module.scss";

interface IDatasetDialog extends DialogProps {
  onUploadDataset: (file: File | undefined) => void
}

export const DatasetDialog: React.FC<IDatasetDialog> = (props) => {
  const { onUploadDataset, ...rest } = props
  const [{ dataset }] = useExperiment()

  return (
    <Dialog maxWidth="lg" {...rest}>
      <DialogTitle>Input Parameter Dataset</DialogTitle>
      <DialogContent className={styles.dataset}>
        <TableContainer className={styles.table}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Frekuensi (Hz)</TableCell>
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

        <div>
          <Button
            component="label"
            variant="outlined"
            fullWidth
            htmlFor="file-unggah-dataset-experiment"
          >
            Upload Dataset
            <input 
              id="file-unggah-dataset-experiment"
              type="file"
              accept=".csv"
              style={{display: "none"}}
              onChange={e => onUploadDataset(e.target.files[0])}
            />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}