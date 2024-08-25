import ApplicationLogo from '../components/ApplicationLogo'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import GuestLayout from '../components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '../hooks/auth'
import { useState } from 'react'

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                <div className="mb-4 text-sm text-gray-600">
                    ご登録ありがとうございます！始める前に
                    Eメールアドレスをご確認ください。
                    をクリックしてください。Eメールが届いていない場合は
                    再度お送りいたします。
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        新しい認証リンクが、登録時に入力されたEメールアドレスに送信されました。
                        新しい認証リンクが送信されました。
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <Button
                        onClick={() => resendEmailVerification({ setStatus })}>
                        認証メールの再送
                    </Button>

                    <button
                        type="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                        onClick={logout}>
                        Logout
                    </button>
                </div>
            </AuthCard>
        </GuestLayout>
    )
}

export default VerifyEmail
