import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@mui/material'
import { State } from '@hookstate/core'

export interface ConfirmDialogProps {
  readonly open: State<boolean>
  readonly title?: string
  readonly content?: string
  readonly handleClose: () => void
  readonly handleAgree: () => void
}

export function ConfirmDialog({open, title, content, handleClose, handleAgree}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open.get()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && (
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
      )}

      {content && (
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      )}

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button variant="outlined" onClick={() => handleClose()}>
          {'Cancelar'}
        </Button>

        <Button
          variant="outlined"
          onClick={() => handleAgree()}
          autoFocus
        >
          {'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
