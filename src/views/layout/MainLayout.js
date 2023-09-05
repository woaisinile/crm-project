import React, { useState } from 'react';
// 图标
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MailOutlined,
    SettingOutlined, WindowsFilled
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './MainLayout.css'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'

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
        icon: <WindowsFilled />,
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
                        key: 'bowing',
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
    {
        key: 'exit',
        icon: <UserOutlined />,
        label: '退出',
    },
];
const leftItems = [
    {
        key: 'marketActivity',
        icon: <UserOutlined />,
        label: '市场活动',
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
    }
]

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // 顶部菜单栏选中状态
    const [current, setCurrent] = useState('mail');
    // 获取路由传递过来的值,保存登录用户的值
    const location = useLocation();
    const user = location?.state?.result;

    const clickMenu = (e) => {
        setCurrent(e.key)
        switch (e.key){
            case 'marketActivity':
                console.log('user', user)
                navigate('/main-layout/market-activity')
                break
            case 'exit':
                sessionStorage.clear();
                localStorage.clear();
                navigate('/')
                break
            default:
                break
        }
    }

    return (
        <Layout className={'mainLayout'}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div className={'logo'}>{collapsed ? 'crm' : 'crm客户关系管理系统'}</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={clickMenu}
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
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
