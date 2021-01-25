import React from "react";
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

import { useSimulation } from "./context";
import styles from "./index.module.scss";

interface IDatasetDialog extends DialogProps {
  onUploadDataset: (file: File | undefined) => void
}

export const DatasetDialog: React.FC<IDatasetDialog> = (props) => {
  const { onUploadDataset, ...rest } = props
  const [{ inputData }] = useSimulation()

  return (
    <Dialog maxWidth="lg" {...rest}>
      <DialogTitle>Input Parameter Dataset</DialogTitle>
      <DialogContent className={styles.dataset}>
        <TableContainer className={styles.table}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Frekuensi (Hz)</TableCell>
                <TableCell>Permeabilitas Relatif Real</TableCell>
                <TableCell>Permeabilitas Relatif Imag</TableCell>
                <TableCell>Permitivitas Relatif Real</TableCell>
                <TableCell>Permitivitas Relatif Imag</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inputData.frequency.map((el, idx) => (
                <TableRow key={idx}>
                  <TableCell>{el}</TableCell>
                  <TableCell>{inputData.mr.real[idx]}</TableCell>
                  <TableCell>{inputData.mr.imag[idx]}</TableCell>
                  <TableCell>{inputData.er.real[idx]}</TableCell>
                  <TableCell>{inputData.er.imag[idx]}</TableCell>
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
            htmlFor="file-unggah"
          >
            Upload Dataset
            <input 
              id="file-unggah"
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