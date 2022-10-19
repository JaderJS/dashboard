import { MdSpaceDashboard } from 'react-icons/md'
import { GiWalkieTalkie } from 'react-icons/gi'
import { RiBaseStationFill } from 'react-icons/ri'

const sidebar_menu = [
    {
        id: 1,
        icon: <MdSpaceDashboard />,
        path: '/',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: <GiWalkieTalkie />,
        path: '/walktalkie',
        title: 'walktalkie',
    },
    {
        id: 3,
        icon: <RiBaseStationFill />,
        path: '/station',
        title: 'station',
    },
]

export default sidebar_menu