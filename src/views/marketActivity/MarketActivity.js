import React, {useEffect} from 'react';
import {Button, Form, Input, Table} from "antd";
import './MarketActivity.css'

const MarketActivity = () => {

    const [form] = Form.useForm();

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '所有者',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '开始日期',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '结束日期',
            dataIndex: 'name',
            key: 'name',
        },
    ]

    useEffect(() => {
        console.log('acc')
    },[])

    const onFinish = (values) => {
        console.log(values)
    }

    return (
        <div>
            <h2>市场活动列表</h2>
            <Form form={form} name="marketActivity" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="名称"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="所有者"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="开始日期"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="结束日期"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="查询"
                >
                    <Input />
                </Form.Item>
            </Form>


            <div className="button-container">
                <div>
                    <Button type="primary" htmlType="button">
                        创建
                    </Button>
                    <Button htmlType="button" htmlType="button">
                        修改
                    </Button>
                    <Button type="primary" htmlType="button" >
                        删除
                    </Button>
                </div>

                <div>
                    <Button type="primary" htmlType="button" >
                        上传列表数据（导入）
                    </Button>
                    <Button type="primary" htmlType="button" >
                        下载列表数据（批量导出）
                    </Button>
                    <Button type="primary" htmlType="button" >
                        下载列表数据（选择导出）
                    </Button>
                </div>
            </div>

            <div>
                <Table columns={columns}/>
            </div>
        </div>
    );
};

export default MarketActivity;
