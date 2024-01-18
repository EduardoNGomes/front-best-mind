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
  name: z.string().min(1, 'Campo obrigatorio'),
  description: z.string().min(1, 'Campo obrigatório'),
  price: z
    .string()
    .min(1, 'Campo obrigatorio')
    .refine((value) => {
      const sanitizedValue = value.replace(',', '.')

      return verifyIfNumberIsValid(sanitizedValue)
    }, 'O campo digitado precisa ser um número válido'),
  image: z
    .any()
    .refine(
      (files) => files?.length === 1,
      'Imagem(.jpg/.jpeg/.png/.webp) obrigatória com tamanho de até 5MB',
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
})

type FormProductType = z.infer<typeof schema>

type SheetProductProps = {
  children: ReactNode
  idToEdit?: string
  title: string
  label: string
}

export function SheetProduct({ children, title, label }: SheetProductProps) {
  const [open, setOpen] = useState(false)
  const [imageSelected, setImageSelected] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormProductType>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', price: '', description: '', image: '' },
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

  const onSubmit = async ({
    name,
    description,
    price,
    image,
  }: FormProductType) => {
    const form = new FormData()

    form.append('name', name)
    form.append('description', description)
    form.append('price', price)
    form.append('image', image)

    console.log(form.get('image'))
  }
  return (
    <Sheet onOpenChange={(e) => handleSave(e)} open={open}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="lg:max-w-[640px]">
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
            {...register('name')}
            errorMessage={errors.name?.message}
          />

          <TextareaWithLabel
            label="Descrição"
            {...register('description')}
            errorMessage={errors.description?.message}
          />

          <InputPriceWithLabel
            label="Preço"
            id="price-edit"
            {...register('price')}
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

          <div className="flex-1 h-80 w-60">
            {imageSelected && (
              <img
                src={imageSelected}
                alt=""
                className="rounded-lg object-cover"
              />
            )}
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant={'outline'}>
                cancelar
              </Button>
            </SheetClose>
            <Button type="submit">{title}</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
