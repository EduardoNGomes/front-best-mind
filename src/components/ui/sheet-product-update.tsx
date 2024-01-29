import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { ChangeEvent, ReactNode, useState } from 'react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './button'
import { InputWithLabel } from './input-with-label'
import { TextareaWithLabel } from './textarea-with-label '
import { InputPriceWithLabel } from './input-price-with-label'
import { InputFileWithLabel } from './input-file-with-label'
import { api } from '@/lib/axios'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Product } from '@/pages/Home/column'
import { SkeletonHome } from './skeleton-home'

const verifyIfNumberIsValid = (value: string): boolean => {
  if (isNaN(Number(value))) return false
  return true
}
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const schema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1, 'Campo obrigatório').optional(),
  price: z
    .string()
    .min(1, 'Campo obrigatorio')
    .refine((value) => {
      const sanitizedValue = value.replace(',', '.')

      return verifyIfNumberIsValid(sanitizedValue)
    }, 'O campo digitado precisa ser um número válido')
    .transform((value) => value.replace(',', '.'))
    .optional(),
  image: z
    .any()
    .refine(
      (files) => files?.length >= 0,
      'Imagem(.jpg/.jpeg/.png/.webp) obrigatória com tamanho de até 5MB',
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE || !files,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) || !files,
      '.jpg, .jpeg, .png and .webp files are accepted.',
    )
    .nullable(),
})

type FormProductType = z.infer<typeof schema>

type SheetProductProps = {
  children: ReactNode
  idToEdit: string
  title: string
  label: string
}

export function SheetProductUpdate({
  children,
  title,
  label,
  idToEdit,
}: SheetProductProps) {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [imageSelected, setImageSelected] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<FormProductType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      price: '',
      description: '',
      image: '',
    },
  })

  const handleSave = (e: boolean) => {
    setOpen(e)
  }
  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setImageSelected(previewURL)
  }

  const { description, name, price } = watch()

  const { isLoading, error } = useQuery({
    queryKey: [`product`],
    queryFn: async () => {
      const { data } = await api.get(`/product/${idToEdit}`)

      const product: Product = data.product
      setValue('name', product!.name)
      setValue('price', product!.price)
      setValue('description', product!.description)
      setImageSelected(`${api.defaults.baseURL}/${product!.image}`)

      return data
    },
    enabled: name === '' && price === '' && description === '',
  })

  const handleUpdateProduct = async (dataToCreated: FormData) => {
    try {
      await api.put(`/product/${idToEdit}`, dataToCreated)
      toast.success('Produto criado com sucesso')
      setOpen(false)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        toast.warning(`Por favor verifique novamente os campos.`)
        return
      }
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.warning(`Este produto já existe.`)
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

  const queryClient = useQueryClient()

  const { mutateAsync: handleUpdateProductFn } = useMutation({
    mutationFn: handleUpdateProduct,

    onSuccess: (_, variables) => {
      queryClient.setQueryData(['products'], (old: Product[]) =>
        old.map((element) => {
          if (element.id === idToEdit) {
            return {
              id: idToEdit,
              image: imageSelected,
              name: variables.get('name'),
              description: variables.get('description'),
              price: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(variables.get('price'))),
              createdAt: element.createdAt,
              updatedAt: new Intl.DateTimeFormat('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC',
              }).format(new Date()),
            }
          } else {
            return element
          }
        }),
      )
    },
  })

  const onSubmit = async ({
    name,
    description,
    price,
    image,
  }: FormProductType) => {
    const form = new FormData()

    if (name) form.append('name', name)
    if (description) form.append('description', description)
    if (price) form.append('price', price)
    if (image) form.append('image', image[0])

    await handleUpdateProductFn(form)
  }

  if (error) {
    if (error instanceof AxiosError && error.response?.status === 400) {
      toast.warning(`Por favor verifique novamente os campos.`)
      return
    }
    if (error instanceof AxiosError && error.response?.status === 409) {
      toast.warning(`Este produto já existe.`)
      return
    }

    if (error instanceof AxiosError && error.status === 401) {
      toast.warning('Sessão expirada.')
    } else {
      toast.error('Ocorreu um error inexperado')
    }
    navigate('/sign-in')
  }

  return (
    <Sheet onOpenChange={(e) => handleSave(e)} open={open}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="overflow-scroll w-full lg:max-w-[640px] md:overflow-x-hidden">
        {isLoading ? (
          <SkeletonHome />
        ) : (
          <form
            className="flex flex-col gap-4 h-full"
            onSubmit={handleSubmit((data) => onSubmit(data))}
          >
            <SheetHeader className="mb-2">
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription style={{ marginTop: 0 }}>
                {label}
              </SheetDescription>
            </SheetHeader>

            <InputWithLabel
              label="Nome"
              id={`name-edit`}
              type="text"
              subtitle="Nome do produto ou serviço, visível aos clientes."
              value={name}
              {...register('name')}
              onChange={(e) => setValue('name', e.target.value)}
              errorMessage={errors.name?.message}
            />

            <TextareaWithLabel
              label="Descrição"
              value={description}
              {...register('description')}
              onChange={(e) => setValue('description', e.target.value)}
              errorMessage={errors.description?.message}
            />

            <InputPriceWithLabel
              label="Preço"
              id="price-edit"
              value={price}
              {...register('price')}
              onChange={(e) => setValue('price', e.target.value)}
              errorMessage={errors.price?.message}
            />

            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <InputFileWithLabel
                  id="image"
                  label="Imagem"
                  subtitle="JPEG ou PNG a baixo de 5MB."
                  placeholder="Upload da Imagem"
                  type="file"
                  value={value.filename}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e.target.files)
                    handleImageSelect(e)
                  }}
                  ref={ref}
                  errorMessage={errors.image?.message?.toString()}
                />
              )}
            />

            <div className="flex-1 h-50 w-32 md:h-80 md:w-60">
              {imageSelected && (
                <img
                  src={imageSelected}
                  alt=""
                  className="rounded-lg object-cover"
                />
              )}
            </div>

            <SheetFooter className="flex flex-row gap-2 justify-end pb-5 ">
              <SheetClose asChild>
                <Button type="button" variant={'outline'}>
                  cancelar
                </Button>
              </SheetClose>
              <Button type="submit">{title}</Button>
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  )
}
