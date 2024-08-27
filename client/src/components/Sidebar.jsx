import { List, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'

const Sidebar = () => {
    return (
        <List component="nav" sx={{ bgcolor: 'white' }}>
            <ListItemButton href="/">
                <HomeIcon style={{ marginRight: 8 }} />
                <ListItemText primary="タイトル" />
            </ListItemButton>
            <ListItemButton href="/searchpage">
                <SearchIcon style={{ marginRight: 8 }} />
                <ListItemText primary="検索" />
            </ListItemButton>
            <ListItemButton href="/popularity">
                <LocalFireDepartmentIcon style={{ marginRight: 8 }} />
                <ListItemText primary="人気" />
            </ListItemButton>
        </List>
    )
}

export default Sidebar
