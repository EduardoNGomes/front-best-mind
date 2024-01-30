import { Button } from '@/components/ui/button'
import { columns } from './column'
import { DataTable } from './datatable'
import { Power } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { SheetProductCreate } from '@/components/ui/sheet-product-create'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { SkeletonHome } from '@/components/ui/skeleton-home'

export const Home = () => {
  const navigate = useNavigate()

  const {
    isFetching,
    error,
    data: products,
  } = useQuery({
    retry: 0,
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get('/product')
      return data.products
    },
  })

  if (isFetching) return <SkeletonHome />

  if (error) {
    if (error instanceof AxiosError && error.status === 401) {
      toast.warning('Sessão expirada.')
    } else {
      console.log('Ocorreu um error inexperado:', error)
    }
    navigate('/sign-in')
  }

  const handleSingOut = async () => {
    try {
      await api.post('/logout')
      toast('Volte sempre!')
    } catch (error) {
      toast.error(`Ocorreu um error`)
      console.log(error)
    }

    navigate('/sign-in')
  }
  return (
    <>
      <header className="flex justify-between p-4 lg:max-w-7xl mx-auto items-center">
        <div className="flex items-center gap-2 text-black text-base font-bold uppercase">
          <img src="/logo.png" alt="" />
          <h1>nunes sports</h1>
        </div>
        <div>
          <Power
            className="h-8 w-8 cursor-pointer text-gray-950 hover:opacity-70"
            onClick={handleSingOut}
          />
        </div>
      </header>

      <main className="p-4 lg:max-w-7xl mx-auto flex flex-col gap-4">
        <section className="flex sm:items-center justify-between flex-col sm:flex-row">
          <h2 className="text-black text-2xl font-bold">Produtos</h2>
          <SheetProductCreate
            label="Adicione um novo produto"
            title="Adicionar Produto"
          >
            <Button className="capitalize w-fit">adicionar produto</Button>
          </SheetProductCreate>
        </section>
        <DataTable data={products} columns={columns} />
      </main>
    </>
  )
}
