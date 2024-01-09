import { ComponentProps } from 'react'
import { Input } from './input'
import { Label } from './label'

type InputWithLabelProps = ComponentProps<'input'> & { label: string }

export function InputWithLabel({
  type = 'text',
  label,
  id,
  placeholder,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} placeholder={placeholder} />
    </div>
  )
}
