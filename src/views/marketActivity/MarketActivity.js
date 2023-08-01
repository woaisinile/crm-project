import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, DatePicker, Form, Input, Modal, Table} from "antd";
import './MarketActivity.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';

const MarketActivity = () => {

    // 主界面使用的表单
    const [form] = Form.useForm();
    // 创建市场活动弹窗使用的表单
    const [createForm] = Form.useForm();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    // 时间选择器
    const { RangePicker } = DatePicker;

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

    const onCreateFinish = (values) => {
        console.log(values)
    }

    const handleCreateOk = () => {
        setIsCreateOpen(false)
    }

    const handleCreateCancel = () => {
        setIsCreateOpen(false)
    }

    const showCreateModal = () => {
        setIsCreateOpen(true)
    }

    return (
        <ConfigProvider locale={locale}>
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
                        <Button type="primary" htmlType="button" onClick={showCreateModal}>
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
                    <br></br>
                    <Table columns={columns}/>
                </div>

                <Modal title={'创建市场活动'} open={isCreateOpen} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                    <Form form={createForm} name={'createActivity'} onFinish={onCreateFinish}>
                        <Form.Item name={'name'} label={'所有者'}
                                   rules={[
                                       {
                                           required: true,
                                           message: '请输入所有者'
                                       }
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item name={'name'} label={'名称'}
                                   rules={[
                                       {
                                           required: true,
                                           message: '请输入名称'
                                       }
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item name={'name'} label={'开始日期-结束日期'}>
                            <RangePicker/>
                        </Form.Item>
                        <Form.Item name={'name'} label={'描述'}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default MarketActivity;
