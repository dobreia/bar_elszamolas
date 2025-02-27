import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Mégse
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Megerősítés
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
