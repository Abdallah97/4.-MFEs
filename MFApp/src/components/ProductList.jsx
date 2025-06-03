import React, {lazy, Suspense} from "react";
const Checkout = lazy(() => import("CheckoutHost/Checkout"));

const ProductList = () => {
    return (
        <div className="todo-list-container">
            <Suspense fallback={null}>
            <Checkout />
            </Suspense>
        </div>
    )
}

export default ProductList;
