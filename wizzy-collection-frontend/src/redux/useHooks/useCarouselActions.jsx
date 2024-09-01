import { useDispatch, useSelector } from "react-redux"
import { carouselActions } from "../slice/CarouselSlice";


const useCarouselActions = () => {
    const dispatch = useDispatch();
    const slideIndex = useSelector((state) => state.carousel.value);
    const {value} = useSelector((state) => state.carousel);
    // console.log("slide store", value)


    const NextSlide = () => {
        dispatch(carouselActions.nextSlide(slideIndex + 1))
    }

    const PrevSlide = () => {
        dispatch(carouselActions.prevSlide(slideIndex - 1));
    }


    return {
        slideIndex: slideIndex,
        nextSlide: NextSlide,
        prevSlide: PrevSlide,
    };
}


export default useCarouselActions;