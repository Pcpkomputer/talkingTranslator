import * as React from "react"
import Svg, { Defs, G, Rect, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

const SvgComponent = (props) => (
  <Svg
    id="fi-rr-menu-burger"
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    {...props}
  >
    <Defs></Defs>
    <G
      id="fi-rr-menu-burger-2"
      data-name="fi-rr-menu-burger"
      transform="translate(0 5)"
    >
      <Rect
        fill="black"
        id="Rectangle_12"
        data-name="Rectangle 12"
        className="cls-1"
        width={25}
        height={2.5}
        rx={1}
        transform="translate(0 8.75)"
      />
      <Rect
       fill="black"
        id="Rectangle_13"
        data-name="Rectangle 13"
        className="cls-1"
        width={30}
        height={2.5}
        rx={1}
      />
      <Rect
       fill="black"
        id="Rectangle_14"
        data-name="Rectangle 14"
        className="cls-1"
        width={17}
        height={2.5}
        rx={1}
        transform="translate(0 17.5)"
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
