import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonProduct() {
  return (
    <div className="flex flex-col gap-10  min-h-full">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>

      <div className="w-full gap-1.5 flex flex-col">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="w-full gap-1.5 flex flex-col">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-40 w-full" />
      </div>

      <div className="w-full gap-1.5 flex flex-col">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="w-full gap-1.5 flex flex-col ">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="flex-1 h-50 w-32 md:h-80 md:w-60">
        <Skeleton className="rounded-full object-cover h-52 w-52 " />
      </div>

      <div className="flex flex-row gap-2 justify-end pb-5 ">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  )
}
