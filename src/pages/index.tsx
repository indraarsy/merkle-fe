import { UserAuthForm } from "@/components/UserAuthForm";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center`}
    >
      <UserAuthForm />
    </main>
  )
}
