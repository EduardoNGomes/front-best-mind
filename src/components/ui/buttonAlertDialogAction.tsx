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
      if (error instanceof AxiosError && error.response?.status === 400) {
        toast.error('Ocorreu um error inexperado')
        navigate('/sign-in')
        return
      }
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.warning(`Este produto não existe.`)
        return
      }

      if (error instanceof AxiosError && error.status === 401) {
        toast.warning('Sessão expirada.')
      } else {
        toast.error('Ocorreu um error inexperado')
      }
      navigate('/sign-in')
    }
  }

  const { mutateAsync: handleDeleteProductFn } = useMutation({
    mutationFn: handleDeleteProduct,

    onSuccess: () => {
      queryClient.setQueryData(['products'], (old: Product[]) =>
        old.filter((element) => element.id !== id),
      )
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
