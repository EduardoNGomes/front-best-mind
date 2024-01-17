import { ComponentProps, forwardRef } from 'react'
import { Label } from './label'
import { Textarea } from './textarea'

type TextareaWithLabelProps = ComponentProps<'textarea'> & {
  label: string
  subtitle?: string
  errorMessage?: string
}

export const TextareaWithLabel = forwardRef<
  HTMLInputElement,
  TextareaWithLabelProps
>(({ label, id, placeholder, subtitle, errorMessage, ...props }, ref) => {
  return (
    <>
      <div className="w-full items-center gap-1.5">
        <Label htmlFor={id}>{label}</Label>
        {subtitle && (
          <p className="text-zinc-600 text-sm font-normal">{subtitle}</p>
        )}
        <Textarea
          id={id}
          placeholder={placeholder}
          className="resize-none h-40 bg-neutral-100 rounded-lg border border-slate-200"
          // @ts-expect-error 'wrong ref type'
          ref={ref}
          {...props}
        />
      </div>
      <p className="text-xs text-destructive h-4">{errorMessage}</p>
    </>
  )
})

TextareaWithLabel.displayName = 'TextareaWithLabel'
