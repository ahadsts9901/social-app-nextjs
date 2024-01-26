"use client"

import "../../globals.css"
import "./index.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import ControlPointDuplicateRoundedIcon from '@mui/icons-material/ControlPointDuplicateRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import { useRouter } from "next/navigation";

export default function AppBarMUI() {

    const [value, setValue] = React.useState(0);

    const router = useRouter()

    const [pathname, setPathname] = React.useState(null)

    React.useEffect(() => {
        setPathname(location.pathname)
    }, [])

    const routes = [{
        text: 'Feed',
        href: '/',
        icon: <HomeRoundedIcon />,
    }, {
        text: 'Updates',
        href: '/updates',
        icon: <NotificationsRoundedIcon />,
    },
    {
        text: 'Create',
        href: '/create',
        icon: <ControlPointDuplicateRoundedIcon />,
    }, {
        text: 'Search',
        href: '/search',
        icon: <SearchRoundedIcon />,
    }, {
        text: 'Admin',
        href: '/admin',
        icon: <AdminPanelSettingsRoundedIcon />,
    },
    ]

    return (
        <Box className="mobile-bar hide-scrollbar">
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                {
                    routes.map((route, index) => (
                        <BottomNavigationAction key={index} label={route.text} icon={route.icon} onClick={() => {
                            router.push(route.href)
                        }}
                            style={{
                                color: pathname === route.href ? "#2D3F52" : "#666",
                                flexGrow: 1,
                            }}
                        />
                    ))
                }
            </BottomNavigation>
        </Box>
    );
}