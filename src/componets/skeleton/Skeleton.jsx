import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" /> 
    <rect x="0" y="277" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="316" rx="10" ry="10" width="280" height="88" /> 
    <rect x="115" y="416" rx="25" ry="25" width="162" height="44" /> 
    <rect x="0" y="423" rx="10" ry="10" width="90" height="30" />
  </ContentLoader>
)

export default Skeleton;