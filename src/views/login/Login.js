import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './Login.css'
import { Button, Form, Input } from 'antd';
import {$login} from "../../api/adminApi";
import MyNOtification from "../../components/notification/MyNOtification";

export default function Login(){
    // 表单
    let [contentForm] = Form.useForm()
    // 通知框
    let [notiMsg, setNotiMsg] = useState({
        type: '',
        description: ''
    })
    // 导航
    let navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const result = await $login(values);
            if(result.message === '成功') {
                setNotiMsg({
                    type: 'success',
                    description: result.message
                })
                navigate('/main-layout')
            } else {
                setNotiMsg({
                    type: 'error',
                    description: result.message
                })
            }
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return(
        <div className={'login'}>
            <div className={'content'}>
                <h2>市场关系管理系统</h2>
                <Form
                    name="basic"
                    form={contentForm}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的用户名!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的密码!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 24,
                            style: {
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '20px',
                            },
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button
                            style={{ marginLeft: '10px' }}
                            onClick={() => {
                                contentForm.resetFields();
                            }}
                        >
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <MyNOtification notiMsg={notiMsg}/>
        </div>
    )
}
