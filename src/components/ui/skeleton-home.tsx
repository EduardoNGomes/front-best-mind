import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonHome() {
  return (
    <>
      <header className="flex justify-between p-4 lg:max-w-7xl mx-auto items-center">
        <div className="flex items-center gap-2 text-black text-base font-bold uppercase">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </header>

      <main className="p-4 lg:max-w-7xl mx-auto flex flex-col gap-4">
        <section className="flex sm:items-center justify-between flex-col sm:flex-row">
          <Skeleton className="h-10 w-[125px]" />

          <Skeleton className="h-8 w-[150px]" />
        </section>
        <Skeleton className="h-96 w-full" />
      </main>
    </>
  )
}
