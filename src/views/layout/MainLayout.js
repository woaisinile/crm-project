import React, { useState } from 'react';
// 图标
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './MainLayout.css'

const {
    Header,
    Sider,
    Content
} = Layout;

// 顶部导航栏
const items = [
    {
        label: '首页',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: '房子',
        key: 'app',
        icon: <AppstoreOutlined />,
    },
    {
        label: '通讯录',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: '老王',
                children: [
                    {
                        label: '大王',
                        key: 'setting:1',
                    },
                    {
                        label: '小王',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: '老李',
                children: [
                    {
                        label: '大李',
                        key: 'setting:3',
                    },
                    {
                        label: '小李',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        label: (
            <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">
                去antd官网
            </a>
        ),
        key: 'alipay',
    },
];
const leftItems = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: '客户管理',
        children: [
            {
                key: '1-1',
                label: '客户大壮'
            },
            {
                key: '1-2',
                label: '客户小壮'
            }
        ]
    },
    {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: '视屏录像',
        children: [
            {
                key: '2-1',
                label: '视屏'
            },
            {
                key: '2-2',
                label: '录像'
            }
        ]
    },
    {
        key: '3',
        icon: <UploadOutlined />,
        label: '上传下载',
    },
]

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // 顶部菜单栏选中状态
    const [current, setCurrent] = useState('mail');

    const clickMenu = (e) => {
        setCurrent(e.key)
    }

    return (
        <Layout className={'mainLayout'}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div className={'logo'}>{collapsed ? 'crm' : 'crm客户关系管理系统'}</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={leftItems}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div className="header-content">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Menu onClick={clickMenu} className={"menu"} selectedKeys={[current]} mode="horizontal" items={items} />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
