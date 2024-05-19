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

const Dashboard = () => {
    const[open,setOpen] = useState(false)
    const[images,setImages] = useState("");
    

    const fetcher = (url) => laravelAxios.get(url).then((res) => res.data);
    
    //作成した絵を取得
    const {data: imageItems, error} = useSWR('api/images', fetcher);
    console.log(imageItems)

    const loading = !imageItems && !error;

    if(error){
        return <div>エラーが発生しました</div>
    }

    // useEffect(() => {
    //     const fetchImages = async()=>{
    //         try {
    //             const response = await laravelAxios.get('api/images');
    //             // console.log(response.data.results);
    //             setImages(response.data);
    //             console.log(response.data);
    //         }catch(err){
    //             console.log(err);
    //         }
    //      }

    //      fetchImages();
    // }, [])
    return (
        
        <AppLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                ホーム
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
                ): imageItems.length > 0 ?(
                    <Grid container direction="column" alignItems="center" justify="center" spacing={3} py={3}>
                    {imageItems.reduceRight((p, c) => [...p, c], []).map((item)=>(
                        <MediaCard item={item} key={item.id} isContent={false}/>
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

export default Dashboard
