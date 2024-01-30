import { ReactNode } from 'react'
import { AlertDialogAction } from './alert-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product } from '@/pages/Home/column'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

type ButtonAlertDialogActionProps = {
  children: ReactNode
  id: string
}

export const ButtonAlertDialogAction = ({
  children,
  id,
}: ButtonAlertDialogActionProps) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleDeleteProduct = async () => {
    try {
      await api.delete(`/product/${id}`)
      toast.success('Produto deletado com sucesso')
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 400: {
            toast.warning(`Por favor verifique novamente os campos.`)
            break
          }
          case 409: {
            toast.warning(`Este produto já existe.`)
            break
          }
          case 401: {
            toast.warning('Sessão expirada.')
            navigate('/sign-in')
            break
          }
          default: {
            toast.error('Ocorreu um error inexperado')
          }
        }
        throw Error(error.response?.data)
      }

      throw new Error('internal server error')
    }
  }

  const { mutateAsync: handleDeleteProductFn } = useMutation({
    mutationFn: handleDeleteProduct,

    onSuccess: () => {
      queryClient.setQueryData(['products'], (old: Product[]) =>
        old.filter((element) => element.id !== id),
      )
    },
    onError: (err) => {
      console.error(err)
    },
  })

  return (
    <AlertDialogAction
      className="text-white bg-destructive"
      onClick={() => handleDeleteProductFn()}
    >
      {children}
    </AlertDialogAction>
  )
}
