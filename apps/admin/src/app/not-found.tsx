import Link from "next/link"


const NotFound = () => {
  return (
    <div className="w-full justify-center text-center pt-24">
        <p className="py-4">Oops !! you are in an unknown page</p>
        <Link className="p-2 bg-secondary-color text-white rounded-md" href="/">Go back</Link>
    </div>
  )
}

export default NotFound