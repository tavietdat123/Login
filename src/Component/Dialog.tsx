import React from 'react';
import { Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';

interface Props {
  open: boolean;
  onClose: () => void;
  yes?: string;
  no?: string;
  onYesClick?: () => void;
  onConfirmDialogClose: () => void;
  textTitle?: string;
  children?: any;
  size?: any;
  maxWidth?: boolean;
}

const CustomDialog: React.FC<Props> = ({
  open,
  onClose,
  yes,
  no,
  onYesClick,
  onConfirmDialogClose,
  textTitle,
  children,
  size = 'sm',
  maxWidth,
}) => {
  return (
    <Dialog maxWidth={size} fullWidth={maxWidth} open={open} onClose={onClose}>
      <div style={{ paddingTop: '24px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '8px' }}>
        <h4 className="capitalize">{textTitle}</h4>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {yes && no && (
            <>
              <Button onClick={onConfirmDialogClose} variant="contained" color="secondary">
                {no}
              </Button>
              <Button onClick={onYesClick} className="ms-3" variant="contained" color="primary">
                {yes}
              </Button>
            </>
          )}
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default CustomDialog;
