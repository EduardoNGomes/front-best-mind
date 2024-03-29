import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import {
  DotsThreeVertical,
  PencilSimple,
  TrashSimple,
} from '@phosphor-icons/react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogPortal,
} from '@/components/ui/alert-dialog'
import { SheetProductUpdate } from '@/components/ui/sheet-product-update'
import { api } from '@/lib/axios'
import { ButtonAlertDialogAction } from '@/components/ui/buttonAlertDialogAction'

export type Product = {
  image: string
  id: string
  description: string
  name: string
  price: string
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<Product>[] = [
  {
    id: 'image',
    cell: ({ row }) => {
      const product = row.original

      const isUrlValid = (url: string): string[] => {
        const urlParts = url.split('http')
        return urlParts
      }

      return (
        <img
          src={
            isUrlValid(product.image).length > 1
              ? product.image
              : `${api.defaults.baseURL}/${product.image}`
          }
          className="h-10 w-10 aspect-square object-contain"
          alt=""
        />
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'nome',
  },
  {
    accessorKey: 'price',
    header: 'preço',
  },
  {
    accessorKey: 'createdAt',
    header: 'criado em',
  },
  {
    accessorKey: 'updatedAt',
    header: 'editado em',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsThreeVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <SheetProductUpdate
              idToEdit={product.id}
              label="Altere um produto"
              title="Alterar Produto"
            >
              <DropdownMenuItem
                className="flex items-center gap-4 cursor-pointer"
                onSelect={(evt) => {
                  evt.preventDefault()
                }}
              >
                <PencilSimple className="h-4 w-4" />
                editar
              </DropdownMenuItem>
            </SheetProductUpdate>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="flex items-center gap-4 cursor-pointer text-destructive"
                  onSelect={(evt) => {
                    evt.preventDefault()
                  }}
                >
                  <TrashSimple className="h-4 w-4" />
                  remover
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogPortal>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá
                      permanentemente o produto e removerá os dados de nossos
                      serviços
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <ButtonAlertDialogAction id={product.id}>
                      Continue
                    </ButtonAlertDialogAction>
                    {/* <AlertDialogAction className="text-white bg-destructive">
                      Continue
                    </AlertDialogAction> */}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogPortal>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
