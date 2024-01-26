import "../../globals.css"
import "./index.css"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import ControlPointDuplicateRoundedIcon from '@mui/icons-material/ControlPointDuplicateRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { profilePicture } from '@/app/api/schema.mjs';
import Image from 'next/image';
import AppBarMUI from "./AppBarMUI";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({ children }) {


    const [pathname, setPathname] = React.useState(null)
    const [showAppName, setShowAppName] = React.useState(true)

    const toolBar = React.useRef()
    const appBar = React.useRef()

    React.useEffect(() => {
        setPathname(location.pathname)
    }, [])

    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch()

    const router = useRouter();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        setShowAppName(false)
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setShowAppName(true)
    };

    const routes = [{
        text: 'Feed',
        href: '/',
        icon: <HomeRoundedIcon />,
    }, {
        text: 'Updates',
        href: '/updates',
        icon: <NotificationsRoundedIcon />,
    }, {
        text: 'Chat',
        href: '/chat',
        icon: <ForumRoundedIcon />,
    },
    // {
    //     text: 'Games',
    //     href: '/games',
    //     icon: <SportsEsportsRoundedIcon />,
    // },
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

    const prevScrollY = React.useRef();

    React.useEffect(() => {
        const handleScroll = () => {

            let currentScrollY = window.scrollY;

            if (toolBar.current) {
                if (window.scrollY > 50) {
                    toolBar.current.style.display = "none";
                }
                else {
                    toolBar.current.style.display = "flex";
                }

                setTimeout(() => {
                    prevScrollY.current = currentScrollY - 1;
                }, 500);

                if (prevScrollY.current > currentScrollY) {
                    toolBar.current.style.display = "flex";
                }
            }

        };

        window.addEventListener('scroll', handleScroll);

    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar>
                <Toolbar ref={toolBar} >
                    <IconButton
                        className="drawerIcon"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <ListItemButton>
                        <ListItemText className='h-[33px] w-[5em] flex items-center m-0'>
                            {
                                showAppName && "We App"
                            }
                        </ListItemText>
                    </ListItemButton>
                    <ListItemButton onClick={() => router.push("/profile")} className="iconButtonDrawer flex flex-row-reverse gap-[1em] items-center ml-[auto]">
                        <ListItemIcon>
                            <Image priority="true" crossOrigin="anonymous" src={currentUser.profilePhoto || profilePicture} alt="profile picture" width={40} height={40} className='cursor-pointer w-[40px] h-[40px] object-cover rounded-[100%]' />
                        </ListItemIcon>
                        <ListItemText className='name text-right w-[10em] no-scrollbar'>{`${currentUser.firstName || ""} ${currentUser.lastName || ""}`}</ListItemText>
                    </ListItemButton>
                </Toolbar>
                <AppBarMUI routes={routes} ref={appBar} />
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <ListItemButton>
                        <ListItemText className='h-[33px] w-[5em] flex justify-start font-bold items-center m-0'>
                            {
                                !showAppName && "We App"
                            }
                        </ListItemText>
                    </ListItemButton>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {routes.map(({ text, href, icon }, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    py: 2,
                                    color: pathname === href ? "#2D3F52" : "#666",
                                    fontWeight: pathname === href ? "bold" : "normal",
                                }}
                                onClick={() => {
                                    router.push(href);
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: pathname === href ? "#2D3F52" : "#666"
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}