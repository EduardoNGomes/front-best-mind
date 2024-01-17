import { ComponentProps, forwardRef } from 'react'
import { Input } from './input'
import { Label } from './label'

type InputWithLabelProps = ComponentProps<'input'> & {
  label: string
  subtitle?: string
  errorMessage?: string
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    { type = 'text', label, id, placeholder, subtitle, errorMessage, ...props },
    ref,
  ) => {
    return (
      <>
        <div className="w-full gap-1.5 flex flex-col">
          <div className="flex flex-col">
            <Label htmlFor={id} className="capitalize">
              {label}
            </Label>
            {subtitle && (
              <p className="text-zinc-600 text-sm font-normal">{subtitle}</p>
            )}
          </div>
          <Input
            type={type}
            id={id}
            placeholder={placeholder}
            // @ts-expect-error 'wrong ref type'
            ref={ref}
            className="xl:max-w-full bg-neutral-100 rounded-lg border border-slate-200"
            {...props}
          />
        </div>
        <p className="text-xs text-destructive h-4">{errorMessage}</p>
      </>
    )
  },
)

InputWithLabel.displayName = 'InputWithLabel'
