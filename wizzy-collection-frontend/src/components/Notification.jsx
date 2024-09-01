import { Alert } from "@mui/material";
import useNotificationActions from "../redux/useHooks/useNotificationActions";
import { useEffect } from "react";
const Notification = () => {
    // const {notificationType, notificationMessage,hideNotification} = useNotificationActions();
    const {notificationStates,hideNotification} = useNotificationActions();

    useEffect(() => {
        const timer = setTimeout(()=>{
            hideNotification()
        },5000);
        return () => clearTimeout(timer)
    },[hideNotification]);
    return (
        <>
            <div className="mt-5 mb-0" style={{
                position:"fixed",
                top: '13px',
                left: '0',
                right: '0',
                zIndex: '100'
            }}>
                {notificationStates.notification?.open &&<Alert onClose={''} severity={notificationStates.notification.type}>{notificationStates.notification.message}</Alert>}
            </div>
        </>
    );
}

export default Notification;