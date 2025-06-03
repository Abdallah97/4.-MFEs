import React, {lazy, Suspense} from "react";
const Checkout = lazy(() => import("CheckoutHost/Checkout"));


const CheckoutContainer = () => {   
    return (
        <div className="">
            <Suspense fallback={null}>
            <Checkout />
            </Suspense>
        </div>
    )
}

export default CheckoutContainer;
