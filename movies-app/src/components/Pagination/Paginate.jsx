import React from 'react'
import { useEffect, useRef } from "react";
const Paginate = (props) => {


    const observingDiv = useRef();

    useEffect(() => {
      const observingElement = observingDiv.current;
      if (!observingElement) return;
  
      const observer = new IntersectionObserver( (entries) => {
        const isIntersecting = entries[0].isIntersecting;
       

        if(isIntersecting && props.onEnd) {
            props.onEnd();
        }

      });
  
      observer.observe(observingElement);
  
      return () => {
        observer.unobserve(observingElement);
      };
    },[]);

    return (
        <div style={{ position: "relative" }}>
          {props.children}
    
          <div
            ref={observingDiv}
            style={{
              position: "absolute",
              bottom: '0'
            }}
          />
        </div>
      );
}

export default Paginate;