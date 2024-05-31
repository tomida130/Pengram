import AppLayout from '../components/Layouts/AppLayout'
import MediaCard from './MediaCard';
import laravelAxios from '../lib/laravelAxios'
import { Box, Container, Fab, Grid, Tooltip, Typography } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import useSWR from 'swr'
import EditIcon from '@mui/icons-material/Edit';


const favorites = () => {

    const fetcher = (url) => laravelAxios.get(url).then((res) => res.data);
    
    const {data: favoriteItems, error} = useSWR('api/favorites', fetcher);

    console.log(favoriteItems)
    
    const loading =  !error && !favoriteItems;
    if(error ){
        return <div>エラーが発生しました</div>
    }

  return (
    <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    お気に入り
                </h2>
            }>

            <Box
                sx={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                    zIndex: 5,
                }}
                >
        
                <Tooltip title='絵を作成'>
                    <Fab
                    style={{background: '#FF7CBF', color: 'white'}}
                    href='/Drow'
                    >
                        <EditIcon />
                    </Fab>
                </Tooltip>
            </Box>




                {/* ロード中の処理 */}
            {/* ロード中の処理 */}
            {loading ?(
                    <Grid item textAlign={"center"} xs={12}>
                        <Typography>Loading...</Typography>
                    </Grid>
                    // 絵を所得
                ): favoriteItems.length > 0 ?(
                    <Grid container direction="column" alignItems="center" justify="center" spacing={3} py={3}>
                    {favoriteItems.map((item)=>(
                        <MediaCard item={item} key={item.id} />
                        ))}
                    
                    </Grid>
                    ):( 
                    <Grid item textAlign={"center"} xs={12}>
                        <Typography>作品が見つかりませんでした</Typography>
                    </Grid>
           

                )}
    </AppLayout>
  )
}

export default favorites