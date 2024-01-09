import { ComponentPropsWithoutRef } from 'react'
import { Input } from './input'
import { Label } from './label'

type InputWithLabelProps = ComponentPropsWithoutRef<'input'> & {
  label: string
  subtitle?: string
}

export function InputWithLabel({
  type = 'text',
  label,
  id,
  placeholder,
  subtitle,
  ...props
}: InputWithLabelProps) {
  return (
    <div className="w-full gap-1.5 flex flex-col">
      <div className="flex flex-col">
        <Label htmlFor={id}>{label}</Label>
        {subtitle && (
          <p className="text-zinc-600 text-sm font-normal">{subtitle}</p>
        )}
      </div>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        className="xl:max-w-full"
        {...props}
      />
    </div>
  )
}
