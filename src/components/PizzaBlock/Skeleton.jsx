import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="135" cy="153" r="124"/>
    <rect x="0" y="340" rx="10" ry="10" width="280" height="86"/>
    <rect x="0" y="290" rx="10" ry="10" width="280" height="32"/>
    <rect x="0" y="445" rx="10" ry="10" width="90" height="29"/>
    <rect x="129" y="445" rx="10" ry="10" width="145" height="29"/>
  </ContentLoader>
)

export default Skeleton