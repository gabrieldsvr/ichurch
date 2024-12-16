"use client";

import {Menu, MenuItem, Sidebar as SidebarMUI} from 'react-pro-sidebar';
import PersonIcon from '@mui/icons-material/Person';
import {useRouter} from "next/navigation";
import AddIcon from "@mui/icons-material/Add";

export default function Sidebar({collapsed, setCollapsed}: {
    collapsed: boolean,
    setCollapsed: (collapsed: boolean) => void
}) {
    const router = useRouter();

    return (
        <SidebarMUI
            collapsed={collapsed}
            onMouseOver={() => setCollapsed(false)}
            onMouseLeave={() => setCollapsed(true)}
            backgroundColor="#6495ED"
        >
            <Menu>
                <MenuItem icon={<PersonIcon/>} onClick={() => router.push("/membro")}> Membro </MenuItem>
                <MenuItem icon={<AddIcon/>} onClick={() => router.push("/membro/new")}>
                    Novo Membro
                </MenuItem>
            </Menu>
        </SidebarMUI>
    );
}
