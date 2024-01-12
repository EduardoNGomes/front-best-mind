import { ComponentProps, forwardRef } from 'react'
import { Input } from './input'
import { Label } from './label'
import { UploadSimple } from '@phosphor-icons/react'

type InputWithLabelProps = ComponentProps<'input'> & {
  label: string
  subtitle?: string
  errorMessage?: string
}

export const InputFileWithLabel = forwardRef<
  HTMLInputElement,
  InputWithLabelProps
>(
  (
    { type = 'text', label, id, placeholder, subtitle, errorMessage, ...props },
    ref,
  ) => {
    return (
      <>
        <div className="w-full gap-1.5 flex flex-col">
          <div className="flex flex-col">
            <h2>{label}</h2>
            {subtitle && (
              <p className="text-zinc-600 text-sm font-normal">{subtitle}</p>
            )}
          </div>
          <Label htmlFor={id}>
            <p className="flex items-center text-black text-base font-normal gap-2 h-9 rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 w-[217px] cursor-pointer">
              {placeholder} <UploadSimple className="h-5 w-5 " />
            </p>
            <Input
              type={type}
              id={id}
              className="xl:max-w-full bg-neutral-100 rounded-lg border border-slate-200 hidden"
              // @ts-expect-error 'wrong ref type'
              ref={ref}
              {...props}
            />
          </Label>
        </div>
        <p className="text-xs text-destructive h-4">{errorMessage}</p>
      </>
    )
  },
)

InputFileWithLabel.displayName = 'InputFileWithLabel'
