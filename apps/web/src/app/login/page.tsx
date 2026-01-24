import { Header, Footer, LoginForm } from "@repo/ui"

export default function Page() {
  return (
      <div className="min-h-screen flex-1 bg-background">
      <Header />
      <main className="container max-w-xl mx-auto space-y-12 py-12 px-8">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}