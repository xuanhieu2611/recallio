import AuthForm from "@/components/AuthForm"

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded border-2 border-gray-200 bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">Sign In</h1>
        <AuthForm isSignUp={false} />
      </div>
    </div>
  )
}
