import React, { useEffect, useRef } from "react";
import { mount } from "VueAppHost/VueApp";

const VeuJs = () => {
    const ref = useRef(null);

    useEffect(()=> {
        mount(ref.current);
    }, []);

    return (
        <div ref={ref}></div>
    )
}

export default VeuJs;
