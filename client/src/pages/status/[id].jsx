import AppLayout from './AppLayout'
import {
    Card,
    CardActionArea,
    CardMedia,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import laravelAxios from '../../lib/laravelAxios'
import { useAuth } from '../../hooks/auth'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'
import Image from 'next/image'

const ImageDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const imageId = id
    const [item, setItem] = useState(null)
    const [isFavorited, setIsFavorited] = useState(false)
    const [error, setError] = useState(null)
    const [favoriteCnt, setFavoriteCnt] = useState(0)
    const { user } = useAuth({ middleware: 'guest' })
    const currentUrl = `https://pengram.click/${router.asPath}`

    useEffect(() => {
        if (!imageId) return
        const fetchReviews = async () => {
            try {
                const itemdata = await laravelAxios.get(
                    `api/image/status/${imageId}`,
                )
                setItem(itemdata.data)
                console.log(itemdata.data)

                const favoriteResponse = await laravelAxios.get(
                    `api/favorites/status`,
                    {
                        params: {
                            partner_id: imageId,
                        },
                    },
                )

                setFavoriteCnt(favoriteResponse.data.cnt)
                setIsFavorited(favoriteResponse.data.favorite)
            } catch (err) {
                setError('エラーが発生しました')
            }
        }

        fetchReviews()
    }, [imageId])

    if (error) {
        return <Typography color="error">エラーが発生しました</Typography>
    }

    if (!item) {
        return <Typography>読み込み中...</Typography>
    }

    const handleToggleFavorite = async () => {
        try {
            const response = await laravelAxios.post(`api/favorites`, {
                partner_id: imageId,
            })
            setFavoriteCnt(response.data.cnt)
            setIsFavorited(response.data.status === 'added')
        } catch (err) {
            setError('エラーが発生しました')
        }
    }

    const handleSaveImage = (image, title) => {
        const downloadLink = document.createElement('a')
        downloadLink.href = image
        downloadLink.download = `${title}.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    const handleDelete = async () => {
        if (window.confirm('レビューを削除してもよろしいですか？')) {
            try {
                await laravelAxios.delete(`api/image/${imageId}`)
                window.location.href = '/home'
            } catch (err) {
                setError('エラーが発生しました')
            }
        }
    }
    const shareOnTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            currentUrl,
        )}&text=${encodeURIComponent('おすすめの絵です|')}`
        window.open(twitterUrl, '_blank')
    }

    return (
        <AppLayout>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '100vh' }} // 画面全体の中央に揃えるために高さを設定
            >
                <Card
                    sx={{
                        backgroundColor: '#fef9fb',
                        width: '100%',
                        maxWidth: { xs: 400, sm: 600, md: 800 }, // スマホとデスクトップに対応した最大幅
                        margin: 2, // 画面端からの余白を設定
                    }}
                    variant="outlined">
                    <CardActionArea>
                        <CardMedia
                            component={'img'}
                            image={item.image || ''}
                            alt={item.taitle || 'No Title'}
                        />
                    </CardActionArea>

                    <Typography
                        variant="h5"
                        component={'div'}
                        noWrap
                        textAlign={'center'}>
                        {item.taitle || 'No Title'}
                    </Typography>

                    <Grid container alignItems={'center'}>
                        <Grid item xs={3}>
                            <Grid container alignItems={'center'}>
                                <IconButton
                                    sx={{
                                        color: isFavorited ? 'red' : 'white',
                                    }}
                                    onClick={handleToggleFavorite}>
                                    <FavoriteIcon
                                        sx={{
                                            stroke: isFavorited
                                                ? 'red'
                                                : 'black',
                                        }}
                                    />
                                </IconButton>

                                {favoriteCnt > 0 && (
                                    <Typography variant="h5">
                                        {favoriteCnt}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Tooltip title="絵をダウンロード">
                                <IconButton
                                    onClick={() =>
                                        handleSaveImage(item.image, item.taitle)
                                    }>
                                    <FileDownloadIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={3}>
                            <Tooltip title="Xに共有">
                                <IconButton onClick={shareOnTwitter}>
                                    <Image
                                        src="/logo-black.png"
                                        alt="Share on Twitter"
                                        width={20}
                                        height={20}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={3}>
                            {user?.id === item?.user?.id && (
                                <>
                                    <Tooltip title="絵を削除">
                                        <IconButton onClick={handleDelete}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </AppLayout>
    )
}

export default ImageDetail
