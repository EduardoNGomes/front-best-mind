import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/ui/inputWithLabel'

export const SignIn = () => {
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
        <form className="flex flex-col gap-4 w-full">
          <InputWithLabel label="Email" type="email" className="w-full" />
          <InputWithLabel label="Senha" type="password" />
          <Button className="w-full " type="button">
            Entrar
          </Button>
        </form>
      </section>
    </main>
  )
}
