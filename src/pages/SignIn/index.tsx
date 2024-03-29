import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/ui/input-with-label'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { api } from '@/lib/axios'
import { useState } from 'react'

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
  const [buttonShouldBeDisable, setButtonShouldBeDisable] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginType>({
    resolver: zodResolver(schema),
  })

  const navigate = useNavigate()

  const onSubmit = async (data: FormLoginType) => {
    setButtonShouldBeDisable(true)

    try {
      await api.post('/auth', data)
      toast.success('Bem Vindo!')

      navigate(`/`)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        toast.warning(`Por favor verifique novamente os campos.`)
        return
      }
      if (error instanceof AxiosError && error.response?.status === 409) {
        toast.warning(`E-mail/Senha inválido`)
      } else {
        toast.error(`Não foi possível concluir está ação`)
        console.log(error)
      }
    } finally {
      setButtonShouldBeDisable(false)
    }
  }

  return (
    <main className="w-full min-h-screen flex flex-col justify-center gap-10 md:grid md:grid-cols-2 place-items-center">
      <section className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center">
          <h2 className="text-primary text-5xl font-normal font-display text-center">
            Bem Vindo de Volta!
          </h2>
          <p className="w-full md:w-10/12 text-center">
            Sua fonte exclusiva de camisetas de alta qualidade para verdadeiros
            de futebol.
          </p>
        </div>

        <img src="/signInArt.png" alt="" className="hidden md:block" />
      </section>
      <section className="flex flex-col items-center px-6 md:px-0 justify-center gap-4 xl:w-[520px]">
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
            id="email-login"
            {...register('email')}
            errorMessage={errors.email?.message}
          />
          <InputWithLabel
            {...register('password')}
            label="senha"
            type="password"
            id="password-login"
            errorMessage={errors.password?.message}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={buttonShouldBeDisable}
          >
            Entrar
          </Button>
        </form>
        <p className="flex self-end text-black text-base font-normal ">
          Ainda não tem conta?{' '}
          <Link
            to="/sign-up"
            className="ml-2 text-primary text-base font-bold transition-all duration-300 hover:opacity-75"
          >
            Cadastre-se!
          </Link>
        </p>
      </section>
    </main>
  )
}
