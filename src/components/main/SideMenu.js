import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import "./SideMenu.css"

export default function SideMenu() {
    const [selectedKey, setSelectedKey] = useState("home");

    const handleSelect = (e) => {
        setSelectedKey(e.key);
    };

    return (
        <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[selectedKey]}
            onSelect={handleSelect}
            className="menu"
        >
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/home">首页</Link>
            </Menu.Item>
            <Menu.Item key="user" icon={<UserOutlined />}>
                <Link to="/user-manage/list">用户管理</Link>
            </Menu.Item>
            <Menu.Item key="setting" icon={<SettingOutlined />}>
                <Link to="/setting">设置</Link>
            </Menu.Item>
        </Menu>
    );
}
