import { IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useNotification } from "../store/NotificationContext";
import CloseIcon from "@material-ui/icons/Close";

function Notification({ alertType, title, message }) {
  const { closeNotification } = useNotification();
  return (
    <div className="container">
      <Alert
        variant="filled"
        severity={alertType}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={closeNotification}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <strong>{title} </strong>
        <span>{message}</span>
      </Alert>
    </div>
  );
}

export default Notification;
