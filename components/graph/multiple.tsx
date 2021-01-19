import React from "react";

import { Graph, GraphProps } from "./single";

export interface MultiGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  configs: Array<GraphProps>
}

export const MultiGraph: React.FC<MultiGraphProps> = (props) => {
  const { configs, ...rest } = props

  return (
    <div {...rest} >
      {configs.map((el, idx) => (
        <Graph 
          key={idx}
          {...el}
        />
      ))}
    </div>
  )
}