import { useDispatch, useSelector } from "react-redux"
import { notificationActions } from "../slice/NotificationSlice";


const useNotificationActions = () => {
    // const notificationType = useSelector(state => state.notification.type);
    // const notificationMessage = useSelector(state => state.notification.message);
    const notificationStates = useSelector(state => state.notification);
    // console.log('notification type: ',notificationType)

    const dispatch = useDispatch();

    const showNotification = ({type,message,open}) => {
        dispatch(notificationActions.showNotification({
            type: type,
            message:message,
            open: open
        }))
    }

    const hideNotification = () => {
        dispatch(notificationActions.hideNotification());
    }

    return {
        notificationStates: notificationStates,
        showNotification: showNotification,
        hideNotification: hideNotification
    }
}


export default useNotificationActions;