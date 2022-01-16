import * as React from "react"
import Svg, { Defs, G, Path, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} {...props}>
    <Defs></Defs>
    <G id="fi-rr-interrogation" transform="rotate(180 15 15)">
      <G id="fi-rr-interrogation-2" data-name="fi-rr-interrogation">
        <Path
            fill="white"
          id="Path_24"
          data-name="Path 24"
          className="cls-1"
          d="M15 0a15 15 0 1 0 15 15A15 15 0 0 0 15 0zm0 27.5A12.5 12.5 0 1 1 27.5 15 12.5 12.5 0 0 1 15 27.5z"
        />
        <Path
            fill="white"
          id="Path_25"
          data-name="Path 25"
          className="cls-1"
          d="M13.9 5.079A5 5 0 0 0 8 10a1.25 1.25 0 1 0 2.5 0 2.5 2.5 0 0 1 2.964-2.459 2.53 2.53 0 0 1 2 1.994 2.5 2.5 0 0 1-1.25 2.656 4.943 4.943 0 0 0-2.464 4.38v.929a1.25 1.25 0 0 0 2.5 0v-.929a2.477 2.477 0 0 1 1.163-2.19 5 5 0 0 0-1.516-9.3z"
          transform="translate(2 1.25)"
        />
        <Path
            fill="white"
          id="Rectangle_15"
          data-name="Rectangle 15"
          className="cls-1"
          width={2.5}
          height={2.5}
          rx={1}
          transform="translate(13.75 21.25)"
        />
      </G>
      <G id="frame_icon" data-name="frame icon">
        <Path
            fill="white"
          id="Rectangle_11"
          data-name="Rectangle 11"
          style={{
            fill: "none",
          }}
          d="M0 0h30v30H0z"
        />
      </G>
    </G>
  </Svg>
)

export default SvgComponent
