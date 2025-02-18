import { Suspense } from "react"
import Loader from "../../components/common/Loader"
import ListProductAgesContainer from "./ListProductAgesContainer"

const ProductAges = () => {
  return (
    <Suspense fallback={<Loader text="Loading Product Ages" />}>
    <ListProductAgesContainer />
  </Suspense>
  )
}

export default ProductAges