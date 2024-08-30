import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../hooks/auth'
import { Button, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Pengram</title>
            </Head>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-black py-4">
                    <div className="text-right px-3">
                        {user ? (
                            <Link
                                href="/home"
                                className="ml-4 text-sm text-white pt-1">
                                ホーム
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm text-white pt-1">
                                    ログイン
                                </Link>

                                <Link
                                    href="/register"
                                    className="ml-4 text-sm text-white pt-1">
                                    新規登録
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>
            <div
                className="d-flex flex-column" // flex-columnを追加
                style={{
                    backgroundImage: 'url(/watercolor_00685.jpg)',
                    minHeight: '100vh',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed',
                }}>
                <div className="flex-grow-1 d-flex align-items-center justify-content-centerw-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7 text-center">
                                <img
                                    src="/pengramlog1.png"
                                    className="rounded mx-auto d-block img-fluid"
                                    alt="Pengram Logo"
                                />
                                <Typography
                                    variant="h5"
                                    className="py-5 text-black">
                                    才能に、名前はいらない。
                                </Typography>
                                <Button variant="contained" href="/register">
                                    新規登録
                                </Button>

                                <p className="pt-4 text-black">
                                    ご意見等があれば、以下のボタンからメールにてお問い合わせください。
                                </p>
                                <div className="py-3">
                                    <Button
                                        variant="outlined"
                                        href="mailto:Pengram@outlook.jp"
                                        startIcon={<EmailIcon />}>
                                        お問い合わせ
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-black">
                <div className="footer-top">
                    <div className="col-md-4 text-center">
                        <small className="text-white">
                            &copy; 2024 Pengram
                        </small>
                    </div>
                </div>
            </footer>
        </>
    )
}
