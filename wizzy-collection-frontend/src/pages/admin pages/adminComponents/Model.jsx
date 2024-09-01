import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import AddProductForm from './AddProductForm';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAppStore } from '../../../store/AppStore';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const Model = () => {
    // const open = useAppStore(state => state.dopen);
    const dopen = useAppStore(state => state.dopen);
  const updateOpen = useAppStore(state => state.updateOpen);

    //Model Methods 
    const [open, setOpen] = useState(!dopen);
    const handleOpen = () => setOpen(dopen);
    const handleClose = () => setOpen(!dopen);
    
    return (
        <>
            <Modal
                open={handleOpen}
                // onClose={handleClose}
                onClose={()=>updateOpen(!dopen)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddProductForm closeEvent={()=>updateOpen(!dopen)}/>
                </Box>
            </Modal>
        </>
    );
}


export default Model;