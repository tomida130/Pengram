import AppLayout from '../components/Layouts/AppLayout'
import { Box, Fab, Tooltip, Typography, Button, Modal, Grid } from '@mui/material'
import Head from 'next/head'
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import Canvas from './canvas';
import Drow from './Drow';
import laravelAxios from '../lib/laravelAxios';
import useSWR from 'swr';
import MediaCard from './MediaCard';

const Mywork= () => {
    const[open,setOpen] = useState(false)
    const[images,setImages] = useState("");
    

  

    const fetcher = (url) => laravelAxios.get(url).then((res) => res.data);
    
    //作成した絵を取得
    const {data: user, error2} = useSWR('api/user', fetcher);
    const {data: imageItems, error} = useSWR('api/images', fetcher);
   
    console.log(user)
    var validItems = imageItems
    const loading = !imageItems && !error && !user && !error2;

    if(error || error2){
        return <div>エラーが発生しました</div>
    }else if (!loading && user &&  validItems == imageItems){
        validItems = validItems.filter((item) => item.user_id ==user.id);
    }
    return (
        
        <AppLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                自分の作品
            </h2>
        }
            >
               
              
            

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

export default Mywork
