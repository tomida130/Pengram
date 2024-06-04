import AppLayout from '../components/Layouts/AppLayout'
import { Box, Fab, Tooltip, Typography, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import laravelAxios from '../lib/laravelAxios'
import useSWR from 'swr'
import MediaCard from './MediaCard'

const Mywork = () => {
    // const [open, setOpen] = useState(false)
    // const [images, setImages] = useState('')

    const fetcher = url => laravelAxios.get(url).then(res => res.data)

    //作成した絵を取得
    const { data: imageItems, error } = useSWR('api/images/mywork', fetcher)

    const loading = !imageItems && !error

    if (error) {
        return <div>エラーが発生しました</div>
    }
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    自分の作品
                </h2>
            }>
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

            {/* ロード中の処理 */}
            {loading ? (
                <Grid item textAlign={'center'} xs={12}>
                    <Typography>Loading...</Typography>
                </Grid>
            ) : // 絵を所得
            imageItems.length > 0 ? (
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
        </AppLayout>
    )
}

export default Mywork
