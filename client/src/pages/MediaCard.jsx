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
import FavoriteICon from '@mui/icons-material/Favorite'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import laravelAxios from '../lib/laravelAxios'
import { useAuth } from '../hooks/auth'
import DeleteIcon from '@mui/icons-material/Delete'

const MediaCard = ({ item }) => {
    const [isFavorited, setIsFavorited] = useState(false)
    const [error, setError] = useState(null)
    const [favoriteCnt, setFavoriteCnt] = useState(0)
    const { user } = useAuth({ middleware: 'auth' })
    if (!item) {
        return null // or handle the case where item is undefined/null
    }
    const handleToggleFavorite = async () => {
        try {
            const response = await laravelAxios.post(`api/favorites`, {
                partner_id: item.id,
            })
            setFavoriteCnt(response.data.cnt)
            setIsFavorited(response.data.status == 'added')
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
                await laravelAxios.delete(`api/image/${item.id}`)
                location.reload()
            } catch (err) {
                setError('エラーが発生しました')
            }
        }
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const favoriteResponse = await laravelAxios.get(
                    `api/favorites/status`,
                    {
                        params: {
                            partner_id: item.id,
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
    }, [])
    if (error) {
        return window.confirm(error)
    }
    return (
        <Grid item>
            <Card
                sx={{ backgroundColor: '#fef9fb', maxWidth: 700 }}
                variant="outlined">
                <CardActionArea>
                    <Typography
                        variant="h6"
                        component={'div'}
                        noWrap
                        textAlign={'center'}>
                        {item.user.name}
                    </Typography>

                    <CardMedia
                        component={'img'}
                        image={item.image}
                        alt={item.taitle}
                    />
                </CardActionArea>

                <Typography
                    variant="h5"
                    component={'div'}
                    noWrap
                    textAlign={'center'}>
                    {item.taitle}
                </Typography>

                <Grid container alignItems={'center'}>
                    <Grid item xs={4}>
                        <Grid container alignItems={'center'}>
                            <IconButton
                                sx={{
                                    color: isFavorited ? 'red' : 'white',
                                }}
                                onClick={() => handleToggleFavorite()}>
                                <FavoriteICon
                                    sx={{
                                        stroke: isFavorited ? 'red' : 'black',
                                    }}
                                />
                            </IconButton>

                            {favoriteCnt > 0 ? (
                                <Typography variant="h5">
                                    {favoriteCnt}
                                </Typography>
                            ) : (
                                <Typography variant="h5" />
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Tooltip title="絵をダウンロード">
                            <IconButton
                                onClick={() =>
                                    handleSaveImage(item.image, item.taitle)
                                }>
                                <FileDownloadIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={4}>
                        {user?.id === item.user.id && (
                            <>
                                <Tooltip title="絵を削除">
                                    <IconButton onClick={() => handleDelete()}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default MediaCard
