import { permissions } from "@repo/ui/lib"
import PermissionCheck from "../../lib/PermissionCheck"

const Dashboard = () => {

  return (
    <div> 
      <h1 className="text-primary-black text-3xl">Dashboard</h1>
      <PermissionCheck permission={permissions.product.create}>
          <h1>I have Permission to create product!!</h1>
      </PermissionCheck>
    </div>
  )
}

export default Dashboard