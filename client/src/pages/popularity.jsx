import AppLayout from '../components/Layouts/AppLayout'
import MediaCard from './MediaCard'
import laravelAxios from '../lib/laravelAxios'
import { Box, Fab, Grid, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import useSWR from 'swr'
import EditIcon from '@mui/icons-material/Edit'
import Sidebar from '../components/Sidebar'
import useMediaQuery from '@mui/material/useMediaQuery'

const popularity = () => {
    const isSmallScreen = useMediaQuery('(max-width:960px)')
    const [hasError, setHasError] = useState(false)
    const fetcher = url => laravelAxios.get(url).then(res => res.data)

    const { data: favoriteItems, error } = useSWR('api/favorites/sort', fetcher)

    // オブジェクトを配列に変換（favoriteItemsが存在する場合のみ）
    const favoriteItemsArray = favoriteItems ? Object.values(favoriteItems) : []
    console.log(favoriteItemsArray)

    const loading = !error && !favoriteItems
    if (error && !hasError) {
        setHasError(true)
        window.confirm('エラーが発生しました')
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    人気
                </h2>
            }>
            {!isSmallScreen && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '16px',
                        right: '16px',
                        zIndex: 5,
                    }}>
                    <Tooltip title="絵を作成">
                        <Fab
                            style={{ background: '#FF7CBF', color: 'white' }}
                            href="/Drow">
                            <EditIcon />
                        </Fab>
                    </Tooltip>
                </Box>
            )}

            <Grid container alignItems="flex-start">
                {!isSmallScreen && (
                    <Grid
                        item
                        xs={12}
                        md={2}
                        spacing={3}
                        py={3}
                        sx={{
                            position: 'sticky',
                            top: 0,
                            height: 'calc(100vh - 64px)',
                            overflowY: 'auto',
                        }}>
                        <Sidebar />
                    </Grid>
                )}
                <Grid item xs={12} md={isSmallScreen ? 12 : 8}>
                    {loading ? (
                        <Grid item textAlign={'center'} xs={12}>
                            <Typography>Loading...</Typography>
                        </Grid>
                    ) : favoriteItemsArray.length > 0 ? (
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                            spacing={3}
                            py={3}>
                            {favoriteItemsArray.map(item => (
                                <MediaCard item={item} key={item.id} />
                            ))}
                        </Grid>
                    ) : (
                        <Grid item textAlign={'center'} xs={12}>
                            <Typography>作品が見つかりませんでした</Typography>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </AppLayout>
    )
}

export default popularity
