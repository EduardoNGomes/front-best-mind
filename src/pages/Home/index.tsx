import { Button } from '@/components/ui/button'
import { columns } from './column'
import { DataTable } from './datatable'
import { Power } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { SheetProduct } from '@/components/ui/sheet-product'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/axios'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const Home = () => {
  const navigate = useNavigate()

  const {
    isPending,
    error,
    data: response,
  } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => await api.get('/product'),
  })

  if (isPending) return 'Loading...'
  // TODO: SKELETON

  if (error) {
    if (error instanceof AxiosError && error.status === 401) {
      toast.warning('Sessão expirada.')
    } else {
      toast.error('Ocorreu um error inexperado')
    }
    navigate('/sign-in')
  }

  const handleSingOut = () => {
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
          <SheetProduct
            label="Adicione um novo produto"
            title="Adicionar Produto"
          >
            <Button className="capitalize w-fit">adicionar produto</Button>
          </SheetProduct>
        </section>
        <DataTable data={response?.data.products} columns={columns} />
      </main>
    </>
  )
}
