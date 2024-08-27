import AppLayout from '../components/Layouts/AppLayout'
import React, { useState } from 'react'
import {
    Box,
    Container,
    Fab,
    Grid,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import Searchicon from '@mui/icons-material/Search'
import Button from './../components/Button'
import laravelAxios from '../lib/laravelAxios'
import MediaCard from './MediaCard'
import useSWR from 'swr'
import Sidebar from '../components/Sidebar'
import useMediaQuery from '@mui/material/useMediaQuery'

const SearchPage = () => {
    const [query, setQuery] = useState('')
    const [trimmedQuery, settrimmedQuery] = useState('')
    const [hasError, setHasError] = useState(false)
    // 画面の幅が960pxより小さいかどうかをチェックす
    const isSmallScreen = useMediaQuery('(max-width:960px)')

    const fetcher = url => laravelAxios.get(url).then(res => res.data)

    const { data: imageItems, error } = useSWR(
        trimmedQuery ? `api/images/search/${trimmedQuery}` : null,
        fetcher,
    )

    const loading = !imageItems && !error

    if (error && !hasError) {
        setHasError(true)
        window.confirm('エラーが発生しました')
        settrimmedQuery('')
    }

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const performSearch = e => {
        e.preventDefault()

        // クエリのトリムと空チェック
        const trimmedQuery = query.trim()
        if (!trimmedQuery) {
            settrimmedQuery('')
            return
        }

        settrimmedQuery(trimmedQuery)
        setQuery('')
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    検索
                </h2>
            }>
            <Container maxWidth="md" style={{ marginTop: '50px' }}>
                <Box
                    component={'form'}
                    onSubmit={performSearch}
                    sx={{
                        width: '80%',
                        margin: '3% auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <TextField
                        onChange={handleChange}
                        fullWidth
                        variant="filled"
                        placeholder="検索する"
                        sx={{
                            mr: 2,
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <Button type="submit">
                        <Searchicon />
                    </Button>
                </Box>
            </Container>
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
                            style={{
                                background: '#FF7CBF',
                                color: 'white',
                            }}
                            href="/Drow">
                            <EditIcon />
                        </Fab>
                    </Tooltip>
                </Box>
            )}

            <Grid container alignItems="flex-start">
                {/* 大きな画面でのみサイドバーを条件付きでレンダリングする */}
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
                            height: 'calc(100vh - 64px)', // ヘッダーの高さを引いた値
                            overflowY: 'auto',
                        }}>
                        <Sidebar />
                    </Grid>
                )}
                {/* 検索結果の表示 */}
                <Grid item xs={12} md={isSmallScreen ? 12 : 8}>
                    {/* ロード中の処理 */}
                    {loading ? (
                        <></>
                    ) : imageItems.length > 0 ? (
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="center"
                            spacing={3}
                            py={3}>
                            {imageItems.map(item => (
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

export default SearchPage
