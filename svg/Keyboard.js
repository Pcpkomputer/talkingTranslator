import * as React from "react"
import Svg, { Defs, G, Path, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgComponent = (props) => (
  <Svg
    id="fi-rr-keyboard"
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    {...props}
  >
    <Defs></Defs>
    <G
      id="fi-rr-keyboard-2"
      data-name="fi-rr-keyboard"
      transform="translate(0 3.75)"
    >
      <Path
      fill="black"
        id="Path_19"
        data-name="Path 19"
        className="cls-1"
        d="M23.75 7h-7.5V3.25a1.25 1.25 0 0 0-2.5 0V7h-7.5A6.257 6.257 0 0 0 0 13.25v5a6.257 6.257 0 0 0 6.25 6.25h17.5A6.257 6.257 0 0 0 30 18.25v-5A6.258 6.258 0 0 0 23.75 7zm3.75 11.25A3.75 3.75 0 0 1 23.75 22H6.25a3.75 3.75 0 0 1-3.75-3.75v-5A3.75 3.75 0 0 1 6.25 9.5h17.5a3.75 3.75 0 0 1 3.75 3.75z"
        transform="translate(0 -2)"
      />

      <Path
        id="Path_20"
        data-name="Path 20"
        className="cls-1"
        d="M16.75 14h-7.5a1.25 1.25 0 0 0 0 2.5h7.5a1.25 1.25 0 0 0 0-2.5z"
        transform="translate(2 1)"
      />
      <Path
      fill="black"
        id="Path_21"
        data-name="Path 21"
        className="cls-1"
        d="M10.25 12.5h1.25a1.25 1.25 0 0 0 0-2.5h-1.25a1.25 1.25 0 0 0 0 2.5z"
        transform="translate(2.25)"
      />
      <Path
      fill="black"
        id="Path_22"
        data-name="Path 22"
        className="cls-1"
        d="M20.25 10h-5a1.25 1.25 0 0 0 0 2.5h5a1.25 1.25 0 0 0 0-2.5z"
        transform="translate(3.5)"
      />
      <Path
      fill="black"
        id="Path_23"
        data-name="Path 23"
        className="cls-1"
        d="M6.5 10H5.25a1.25 1.25 0 0 0 0 2.5H6.5a1.25 1.25 0 0 0 0-2.5z"
        transform="translate(1)"
      />
      <Circle
      fill="black"
        id="Ellipse_1"
        data-name="Ellipse 1"
        className="cls-1"
        cx={1.25}
        cy={1.25}
        r={1.25}
        transform="translate(5 15)"
      />
      <Circle
      fill="black"
        id="Ellipse_2"
        data-name="Ellipse 2"
        className="cls-1"
        cx={1.25}
        cy={1.25}
        r={1.25}
        transform="translate(22.5 15)"
      />
    </G>
    <G id="frame_icon" data-name="frame icon">
      <Path
        id="Rectangle_11"
        data-name="Rectangle 11"
        style={{
          fill: "none",
        }}
        d="M0 0h30v30H0z"
      />
    </G>
  </Svg>
)

export default SvgComponent
