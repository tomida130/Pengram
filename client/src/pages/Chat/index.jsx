
import { Box, Button, ButtonGroup, Card, CardContent, Container, Fab, Grid, Modal, Rating, TextareaAutosize, Tooltip, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react'

export default function Index(props) {

    

    return (

            <Container sx={{py: 4}}>
        <Typography
            component={"h1"}
            variant='h4'
            align='center'
            gutterBottom
        >
            レビュー一覧
        </Typography>
        <Grid container spacing={3}>
            {reviews.map((review)=>(
                <Grid item xs={12} key={review.id}>
                    <Card>
                        <CardContent>
                             {/* ユーザー名 */}
                             <Typography
                                variant='h6'
                                component={"div"}
                                gutterBottom
                            >
                                {review.user.name}
                            </Typography>
                            {editMode === review.id ? (
                                 <>
                                 {/* 編集ボタンが押されたレビュー */}
                                <Rating value={editeRating} onChange={(e, newvalue)=> setEditRating(newvalue)}/>
                                <TextareaAutosize minRows={3} style={{ width: "100%"}} value={editContent}
                                onChange={(e)=> setEditContent(e.target.value)}
                                />
                                </>
                            ) : (<>
                           

                            {/* 星 */}

                            <Rating 
                            value={review.rating}
                            readOnly
                            />

                            {/* レビュー内容 */}
                            <Typography
                                variant='body2'
                                color="textSecondary"
                                paragraph
                            >
                                {review.content}
                            </Typography>
                            
                            </>)}
                            
                            {user?.id === review.user.id && (
                                <Grid sx={{display: "flex", justifyContent: "flex-end"}}>
                                    {editMode == review.id ? (
                                        //編集中の表示
                                        <Button onClick={()=>handleConfimEdit(review.id) } disabled={isEditwButtonDisabled}>編集確定</Button>

                                    ) : (
                                        <>
                                        <ButtonGroup>
                                            <Button onClick={() =>handleEdit(review)}>編集</Button>
                                            <Button color="error" onClick={() => handleDelete(review.id)}>削除</Button>
                                        </ButtonGroup>
                                        </>

                                    )}
                                

                            </Grid>
                                
                            )}
                            
                        </CardContent>
                    </Card>
                </Grid>
            ))}

        </Grid>
    </Container>
        
    );
}