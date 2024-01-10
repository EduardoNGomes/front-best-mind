import { ComponentPropsWithoutRef } from 'react'
import { Label } from './label'
import { Textarea } from './textarea'

type TextareaWithLabelProps = ComponentPropsWithoutRef<'textarea'> & {
  label: string
  subtitle?: string
}

export function TextareaWithLabel({
  label,
  id,
  placeholder,
  subtitle,
  ...props
}: TextareaWithLabelProps) {
  return (
    <div className="w-full items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {subtitle && (
        <p className="text-zinc-600 text-sm font-normal">{subtitle}</p>
      )}
      <Textarea
        id={id}
        placeholder={placeholder}
        className="resize-none h-40 bg-neutral-100 rounded-lg border border-slate-200"
        {...props}
      />
    </div>
  )
}
