import { Suspense } from "react"
import Loader from "../../components/common/Loader"
import ListProductCategoryContainer from "./ListProductCategoryContainer"

const ProductCategories = () => {
  return (
    <Suspense fallback={<Loader text="Loading Product Category" />}>
    <ListProductCategoryContainer />
  </Suspense>
  )
}

export default ProductCategories