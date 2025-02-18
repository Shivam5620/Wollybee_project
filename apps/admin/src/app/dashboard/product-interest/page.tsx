import { Suspense } from "react"
import Loader from "../../components/common/Loader"
import ListProductInterestContainer from "./ListProductInterestContainer"

const ProductInterests = () => {
  return (
    <Suspense fallback={<Loader text="Loading Product Interest" />}>
    <ListProductInterestContainer />
  </Suspense>
  )
}

export default ProductInterests