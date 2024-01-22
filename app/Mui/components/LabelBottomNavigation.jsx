import "./LabelBottomNavigation.css"
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('feed');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation className='bottomNavigationCont' value={value} onChange={handleChange}>

      <BottomNavigationAction
        className="bottomNavigationItems"
        label="Feed"
        value="feed"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        className="bottomNavigationItems"
        label="Updates"
        value="updates"
        icon={< NotificationsIcon />}
      />
      <BottomNavigationAction
        className="bottomNavigationItems"
        label="Games"
        value="games"
        icon={<SportsEsportsIcon />}
      />
      <BottomNavigationAction
        className="bottomNavigationItems"
        label="Chat"
        value="chat"
        icon={<QuestionAnswerIcon />}
      />
      <BottomNavigationAction
        className="bottomNavigationItems"
        label="Create"
        value="create"
        icon={<AddCircleIcon />}
      />

    </BottomNavigation>
  );
}