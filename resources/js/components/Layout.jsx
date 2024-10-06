import React from "react";
import {
    Sidebar,
    Menu,
    MenuItem,
    useProSidebar,
    SubMenu,
} from "react-pro-sidebar";
import DehazeOutlinedIcon from "@mui/icons-material/DehazeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import DataThresholdingOutlinedIcon from "@mui/icons-material/DataThresholdingOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessibilityOutlinedIcon from "@mui/icons-material/AccessibilityOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
function Layout({ children }) {
    const { collapseSidebar } = useProSidebar();
    return (
        <>
            <div style={({ height: "100vh" }, { display: "flex" })}>
                <Sidebar
                    style={{ minHeight: "100vh", backgroundColor: "white" }}
                >
                    <Menu>
                        <MenuItem
                            icon={<DehazeOutlinedIcon />}
                            onClick={() => {
                                collapseSidebar();
                            }}
                            style={{
                                cursor: "pointer",
                                textAlign: "center",
                                paddingTop: "10px",
                            }}
                        >
                            <h2>Admin</h2>
                        </MenuItem>
                        <SubMenu icon={<MenuBookOutlinedIcon />} label="Thư viện sách">
                        <a className="text-decoration-none text-black" href={"/permissions"}>
                            <MenuItem icon={<CategoryOutlinedIcon />}> Loại sách </MenuItem>
                        </a>
                        <a className="text-decoration-none text-black" href={"/permissions"}>
                            <MenuItem icon={<AutoStoriesOutlinedIcon />}> Sách </MenuItem>
                        </a>
                        </SubMenu>
                        <SubMenu icon={<DataUsageOutlinedIcon />} label="Quản lý dữ liệu">
                        <a className="text-decoration-none text-black" href={"/permissions"}>
                            <MenuItem icon={<DataThresholdingOutlinedIcon />}> Danh sách theo ngày </MenuItem>
                        </a>
                        <a className="text-decoration-none text-black" href={"/permissions"}>
                            <MenuItem icon={<AddchartOutlinedIcon />}> Thêm danh sách </MenuItem>
                        </a>
                        </SubMenu>
                        <SubMenu icon={<PersonOutlineOutlinedIcon />} label="Quản lý người dùng">
                        <a className="text-decoration-none text-black" href={"/permissions"}>
                            <MenuItem icon={<AccessibilityOutlinedIcon />}> Loại tài khoản </MenuItem>
                        </a>
                        <a className="text-decoration-none text-black" href={"/permissions"}>
                            <MenuItem icon={<AccountBoxOutlinedIcon />}> Tài khoản </MenuItem>
                        </a>
                        </SubMenu>
                        <MenuItem icon={<LoginOutlinedIcon />}
                            style={{ cursor: "pointer",color: "red", paddingTop: "10px" }}>
                            <a className="text-decoration-none" style={{ color: "red" }} href={"/permissions"}>
                            Logout
                            </a> 
                             </MenuItem>
                    </Menu>
                </Sidebar>

                <main className="p-4">{children}</main>
            </div>
        </>
    );
}

export default Layout;
