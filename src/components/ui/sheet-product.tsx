import { Button } from '@/components/ui/button'

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
import { ReactNode, useState } from 'react'
import { InputWithLabel } from './input-with-label'
import { TextareaWithLabel } from './textarea-with-label '
import { Label } from './label'
import { Input } from './input'
import { UploadSimple } from '@phosphor-icons/react'

type SheetProductProps = {
  children: ReactNode
  id: string
  title: string
  label: string
}

export function SheetProduct({ children, title, label }: SheetProductProps) {
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  const handleSave = (e: boolean) => {
    setOpen(e)
  }

  return (
    <Sheet onOpenChange={(e) => handleSave(e)} open={open}>
      <form>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col gap-4 lg:max-w-[640px]">
          <SheetHeader className="mb-2">
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription style={{ marginTop: 0 }}>
              {label}
            </SheetDescription>
          </SheetHeader>
          <InputWithLabel
            label="Nome"
            id={`name`}
            subtitle="Nome do produto ou serviço, visível aos clientes."
          />
          <TextareaWithLabel label="Descrição" />
          <div className="w-full gap-1.5 flex flex-col">
            <div className="flex flex-col">
              <h1>Imagem</h1>
              <p className="text-zinc-600 text-sm font-normal">
                JPEG ou PNG a baixo de 2MB.
              </p>
            </div>
            <Label htmlFor="image" className="">
              <p className="flex items-center text-black text-base font-normal gap-2 h-9 rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 w-[217px] cursor-pointer">
                Upload da imagem <UploadSimple className="h-5 w-5 " />
              </p>
              <Input
                type="file"
                id="image"
                className="xl:max-w-full bg-neutral-100 rounded-lg border border-slate-200 hidden"
              />
            </Label>
          </div>
          <div className="w-full gap-1.5 flex flex-col flex-1">
            <div className="flex flex-col">
              <Label htmlFor="price">Preço</Label>
            </div>
            <div className="flex items-center shadow-sm border-input px-3 py-1 bg-neutral-100 rounded-lg border border-slate-200 focus-within:outline-none focus-within:ring-ring focus-within:ring-1">
              <span className="text-black text-base font-bold ">R$</span>
              <Input
                type="string"
                id="price"
                className="xl:max-w-full bg-neutral-100 border-none rounded-none focus:outline-none focus-visible:ring-0 shadow-none"
                placeholder="00,00"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant={'outline'}>
                cancelar
              </Button>
            </SheetClose>
            <Button type="button" onClick={() => handleSave(false)}>
              {title}
            </Button>
          </SheetFooter>
        </SheetContent>
      </form>
    </Sheet>
  )
}
