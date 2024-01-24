import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/ui/input-with-label'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z
    .string()
    .email()
    .min(8, 'Insira um email válido')
    .refine(
      (value) => !/[<>"' \t]/g.test(value),
      'O campo login não pode conter os caracteres <>"\' ou espaços em branco.',
    ),
  password: z
    .string()
    .min(6, 'Insira uma senha com mais de seis caracteres')
    .refine(
      (value) => !/[<>"' \t]/g.test(value),
      'O campo password não pode conter os caracteres <>"\' ou espaços em branco.',
    ),
})

type FormLoginType = z.infer<typeof schema>

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginType>({
    resolver: zodResolver(schema),
  })

  const navigate = useNavigate()

  const onSubmit = async (data: FormLoginType) => {
    console.log(data)
    navigate('/')
  }

  return (
    <main className="w-full min-h-screen grid grid-cols-2 place-items-center gap-10">
      <section>
        <h2 className="text-primary text-5xl font-normal font-display">
          Bem Vindo de Volta!
        </h2>
        <p>
          Sua fonte exclusiva de camisetas de alta qualidade para verdadeiros de
          futebol.
        </p>
        <img src="/signInArt.png" alt="" />
      </section>
      <section className="flex flex-col items-center justify-center gap-4 xl:w-[520px]">
        <div className="w-full">
          <h1 className="text-black text-xl font-bold capitalize">login</h1>
          <p className="text-zinc-700 text-sm font-normal">
            Digite suas informações para entrar na aplicação{' '}
          </p>
        </div>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex flex-col gap-1 w-full"
        >
          <InputWithLabel
            label="email"
            type="email"
            className="w-full"
            id="email-login"
            {...register('email')}
          />
          <p className="text-xs text-destructive h-4">
            {errors.email?.message}
          </p>
          <InputWithLabel
            {...register('password')}
            label="senha"
            type="password"
            id="password-login"
          />
          <p className="text-xs text-destructive h-4">
            {errors.password?.message}
          </p>
          <Button className="w-full" type="submit">
            Entrar
          </Button>
        </form>
        <p className="flex self-end text-black text-base font-normal ">
          Ainda não tem conta?{' '}
          <Link
            to="/sign-out"
            className="ml-2 text-primary text-base font-bold transition-all duration-300 hover:opacity-75"
          >
            Cadastre-se!
          </Link>
        </p>
      </section>
    </main>
  )
}
