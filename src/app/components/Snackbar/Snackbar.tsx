import React from 'react'
import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarProps {
    isSnackBarOpen: boolean;
    setIsSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    Message: string;
}

const Snackbar = ({isSnackBarOpen, setIsSnackBarOpen, Message} : SnackbarProps) => {
    return (<>
        <MuiSnackbar
            anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
            open={isSnackBarOpen}
            autoHideDuration={3000}
            onClose={() => setIsSnackBarOpen(false)}
        >
            <Alert
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                onClose={() => setIsSnackBarOpen(false)}
            >
                {Message}
            </Alert>
        </MuiSnackbar>
    </>
    )
}

export default Snackbar