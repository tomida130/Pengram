import { List, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../hooks/auth'

const Sidebar = () => {
    const { logout } = useAuth()
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
            <ListItemButton onClick={logout}>
                <LogoutIcon style={{ marginRight: 8 }} />
                <ListItemText primary="ログアウト" />
            </ListItemButton>
        </List>
    )
}

export default Sidebar
