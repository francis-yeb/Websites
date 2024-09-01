import { useDispatch, useSelector } from "react-redux";
import {actions} from '../store/indexStore';


const useCounterActions = () => {
    const counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    const increment = () => {
        dispatch(actions.increment());
    }

    const decrement = () => {
        dispatch(actions.decrement());
    }

    const addBy = () => {
        dispatch(actions.addBy(10));
    }
    
    return {
        counter: counter,
        increment: increment,
        decrement: decrement,
        addBy: addBy,
    }
}

export default useCounterActions;