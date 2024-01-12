import { ComponentProps, forwardRef } from 'react'
import { Input } from './input'
import { Label } from './label'

type InputWithLabelProps = ComponentProps<'input'> & {
  label: string
  subtitle?: string
}

export const InputPriceWithLabel = forwardRef<
  HTMLInputElement,
  InputWithLabelProps
>(({ type = 'text', label, id, placeholder, subtitle, ...props }, ref) => {
  return (
    <div className="w-full gap-1.5 flex flex-col">
      <div className="flex flex-col">
        <Label htmlFor={id}>{label}</Label>
      </div>

      {subtitle && (
        <p className="text-zinc-600 text-sm font-normal">{subtitle}</p>
      )}

      <div className="flex items-center shadow-sm border-input px-3 py-1 bg-neutral-100 rounded-lg border border-slate-200 focus-within:outline-none focus-within:ring-ring focus-within:ring-1">
        <span className="text-black text-base font-bold ">R$</span>
        <Input
          type={type}
          id={id}
          className="xl:max-w-full bg-neutral-100 border-none rounded-none focus:outline-none focus-visible:ring-0 shadow-none"
          placeholder={placeholder}
          // @ts-expect-error 'wrong ref type'
          ref={ref}
          {...props}
        />
      </div>
    </div>
  )
})

InputPriceWithLabel.displayName = 'InputPriceWithLabel'
