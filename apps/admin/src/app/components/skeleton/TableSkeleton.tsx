import { Skeleton } from "../../../../components/ui/skeleton"

const TableSkeleton = () => {
  const numberOfRows = 3; 

  return (
    <div className="w-full">
    <Skeleton className="h-8  w-24 rounded-lg my-2" />
      <div className="flex gap-1 justify-between">
      <Skeleton className="h-8  w-[90%] rounded-lg my-2" />
      <Skeleton className="h-8  w-[9%] rounded-lg my-2" />
      </div>
      <Skeleton className="h-8  w-[100%] rounded-lg my-2" />
      {Array.from({ length: numberOfRows }).map((_, index) => (
        <div key={index} className="flex flex-col">
          <Skeleton className="h-8  w-[100%] rounded-lg my-2" />
          <Skeleton className="h-8  w-[100%] rounded-lg my-2" />
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;