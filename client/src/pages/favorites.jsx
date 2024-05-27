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
    const {data: imageItems, error2} = useSWR('api/images', fetcher);
    
    var validItems = []
    const loading = !imageItems && !error && !favoriteItems && !error2;
    if(error || error2){
        return <div>エラーが発生しました</div>
    }else if (!loading &&  imageItems && favoriteItems){
        validItems.fill(0);
        favoriteItems.map((favoriteitem)=>{validItems.push(imageItems.filter((item1) =>item1.id == favoriteitem.partner_id))})
        console.log(validItems.flat())
        validItems = validItems.reduceRight((p, c) => [...p, c], [])
        console.log(validItems)
        validItems = validItems.flat()
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
                ): validItems.length > 0 ?(
                    <Grid container direction="column" alignItems="center" justify="center" spacing={3} py={3}>
                    {validItems.map((item)=>(
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