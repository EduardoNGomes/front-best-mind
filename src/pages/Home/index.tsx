import { Button } from '@/components/ui/button'
import { Product, columns } from './column'
import { DataTable } from './datatable'
import { Power } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { SheetProduct } from '@/components/ui/sheet-product'
const MockData: Product[] = [
  {
    id: 'ccc94124-0c8c-41bd-84bd-535e1632438b',
    name: 'product 10',
    description: 'Product 1 description',
    price: '10',
    createdAt: '2024-01-08T22:10:54.488Z',
    updatedAt: '2024-01-08T22:10:54.488Z',
  },
  {
    id: 'db5a250d-72ed-40f1-8510-b90ed0722b6e',
    name: 'product 1',
    description: 'Product 1 description',
    price: '10',
    createdAt: '2024-01-09T14:17:19.355Z',
    updatedAt: '2024-01-09T14:17:19.355Z',
  },
]

export const Home = () => {
  const navigate = useNavigate()

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
        <section className="flex items-center justify-between">
          <h2 className="text-black text-2xl font-bold">Produtos</h2>
          <SheetProduct
            label="Adicione um novo produto"
            title="Adicionar Produto"
          >
            <Button className="capitalize">adicionar produto</Button>
          </SheetProduct>
        </section>
        <DataTable data={MockData} columns={columns} />
      </main>
    </>
  )
}
