import { Dialog, Button, DialogActions } from '@material-ui/core';
interface PropsConfirmationDialog {
  open: boolean;
  onConfirmDialogClose: () => void;
  text: string;
  title: string;
  onYesClick: () => void;
  Yes: string;
  No: string;
}
const ConfirmationDialog = ({
  open,
  onConfirmDialogClose,
  text,
  title = 'confirm',
  onYesClick,
  Yes,
  No,
}: PropsConfirmationDialog) => {
  return (
    <Dialog maxWidth="xs" fullWidth={true} open={open} onClose={onConfirmDialogClose}>
      <div style={{ paddingTop: '24px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '8px' }}>
        <h4 className="capitalize">{title}</h4>
        <p>{text}</p>
        <DialogActions>
          <div className="d-flex justify-content-between flex-middle">
            {No && (
              <Button onClick={onConfirmDialogClose} variant="contained" color="secondary">
                {No}
              </Button>
            )}
            <Button onClick={onYesClick} className="ms-3" variant="contained" color="primary">
              {Yes}
            </Button>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
