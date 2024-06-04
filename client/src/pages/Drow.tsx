import { Button, Grid, TextField } from '@mui/material'
import html2canvas from 'html2canvas'
import { ChangeEvent, MouseEvent, useState } from 'react'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import UploadIcon from '@mui/icons-material/Upload'
import { useRouter } from 'next/router'
import laravelAxios from '../lib/laravelAxios'

interface Point {
    x: number
    y: number
}

const Drow = () => {
    //絵のタイトル
    const [name, setName] = useState('')
    //絵のタグ
    // const [tage, setTage] = useState('')
    const router = useRouter()

    const isButtonDisabled = (name: string) => {
        return !name
    }

    const isReviewButtonDisabled = isButtonDisabled(name)

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    //   const handleChangeTage = (e) => {
    //     setTage(e.target.value)
    // }

    const [drawing, setDrawing] = useState(false)
    const [lines, setLines] = useState<Point[][]>([])
    const [currentLine, setCurrentLine] = useState<Point[]>([])

    const handleMouseDown = (e: MouseEvent) => {
        setDrawing(true)
        setCurrentLine([{ x: e.clientX, y: e.clientY }])
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!drawing) return
        setCurrentLine(currentLine => [
            ...currentLine,
            { x: e.clientX, y: e.clientY },
        ])
    }

    const handleMouseUp = () => {
        if (!drawing) return
        setDrawing(false)
        setLines(lines => [...lines, currentLine])
        setCurrentLine([])
    }

    const saveAsImage = async (uri: string): Promise<void> => {
        const downloadLink = document.createElement('a')
        if (typeof downloadLink.download === 'string') {
            downloadLink.href = uri

            // ファイル名
            downloadLink.download = `${name}.png`

            // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
            document.body.appendChild(downloadLink)
            try {
                //作成した絵をデータベースに保存
                await laravelAxios.post(`api/images`, {
                    taitle: name,
                    image: downloadLink.href,
                })
                //処理が終わり次第ホームに戻す
                router.push('/home')
            } catch (err) {
                ;<div>エラーが発生しました</div>
            }
            // ダウンロードリンクが設定された a タグをクリック
            // downloadLink.click();

            // Firefox 対策で追加したリンクを削除しておく
            document.body.removeChild(downloadLink)
        } else {
            window.open(uri)
        }
        return
    }
    const saveimg = () => {
        // 画像に変換する component の id を指定
        const target = document.getElementById('target-component')
        html2canvas(target).then(canvas => {
            const targetImgUri = canvas.toDataURL('img/png')
            saveAsImage(targetImgUri)
        })
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div
                role="button"
                tabIndex={0}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="drawing-area"
                id="target-component"
                style={{
                    flex: 1,
                    position: 'relative',
                    cursor: 'crosshair',
                    backgroundColor: 'white',
                }}>
                {lines.map((line, index) => (
                    <svg
                        key={index}
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        style={{ height: '100vh' }}>
                        <polyline
                            fill="none"
                            stroke="black"
                            strokeWidth="2"
                            points={line
                                .map(point => `${point.x},${point.y}`)
                                .join(' ')}
                        />
                    </svg>
                ))}
                {drawing && (
                    <svg
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        style={{ height: '100vh' }}>
                        <polyline
                            fill="none"
                            stroke="black"
                            strokeWidth="2"
                            points={currentLine
                                .map(point => `${point.x},${point.y}`)
                                .join(' ')}
                        />
                    </svg>
                )}
            </div>
            <Grid
                container
                direction="column"
                spacing={2}
                justifyContent="flex-end"
                width={270}
                sx={{ backgroundColor: 'pink', padding: 2 }}
                alignItems="center">
                <TextField
                    onChange={handleChangeName}
                    variant="filled"
                    placeholder="タイトル"
                    sx={{ mb: 2, width: '80%' }}
                />
                <Button
                    onClick={saveimg}
                    startIcon={<UploadIcon />}
                    sx={{ width: '80%' }}
                    disabled={isReviewButtonDisabled}>
                    Upload
                </Button>
                <Button
                    href="/home"
                    startIcon={<HomeIcon />}
                    sx={{ width: '80%' }}>
                    Home
                </Button>
            </Grid>
        </div>
    )
}

export default Drow
