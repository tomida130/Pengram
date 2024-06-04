import {
    Card,
    CardActionArea,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteICon from '@mui/icons-material/Favorite'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import laravelAxios from '../lib/laravelAxios'

const MediaCard = ({ item }) => {
    const [isFavorited, setIsFavorited] = useState(false)
    const [error, setError] = useState(null)
    if (!item) {
        return null // or handle the case where item is undefined/null
    }
    const handleToggleFavorite = async () => {
        try {
            const response = await laravelAxios.post(`api/favorites`, {
                partner_id: item.id,
            })
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

                setIsFavorited(favoriteResponse.data)
            } catch (err) {
                setError('エラーが発生しました')
            }
        }

        fetchReviews()
    }, [])
    if (error) {
        return <div>{error}</div>
    }
    return (
        <Grid item>
            <Card sx={{ backgroundColor: '#fef9fb', maxWidth: 600 }}>
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
                <IconButton
                    style={{ color: isFavorited ? 'red' : 'white' }}
                    onClick={() => handleToggleFavorite()}>
                    <FavoriteICon
                        sx={{ stroke: isFavorited ? 'red' : 'black' }}
                    />
                </IconButton>

                <IconButton
                    onClick={() => handleSaveImage(item.image, item.taitle)}>
                    <FileDownloadIcon />
                </IconButton>
            </Card>
        </Grid>
    )
}

export default MediaCard
