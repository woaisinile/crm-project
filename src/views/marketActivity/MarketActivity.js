import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, DatePicker, Form, Input, Modal, Select, Table} from "antd";
import './MarketActivity.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';
import {$queryAllUsers} from "../../api/adminApi";
import {$insertActivity} from "../../api/activityApi";
import MyNOtification from "../../components/notification/MyNOtification";

const MarketActivity = () => {

    // 主界面使用的表单
    const [form] = Form.useForm();
    // 创建市场活动弹窗使用的表单
    const [createForm] = Form.useForm();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    // 时间选择器
    const { RangePicker } = DatePicker;
    // 储存下拉列表
    const [allUsers, setAllUsers] = useState([]);
    // 通知框
    let [notiMsg, setNotiMsg] = useState({
        type: '',
        description: ''
    })

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
        // 给下拉列表赋值
        $queryAllUsers().then(r =>{
            let newRows = []
            r.data.map((item) => {
                let newObj = {}
                newObj.label = item.name
                newObj.value = item.name
                newRows.push(newObj)
            })
            setAllUsers(newRows)
        } )
    },[])

    const onFinish = (values) => {
        console.log(values)
    }

    const onCreateFinish = (values) => {
        const result = $insertActivity(values)
        if(result.message === '成功') {
            setNotiMsg({
                type: 'success',
                description: '储存成功'
            })
        } else {
            setNotiMsg({
                type: 'error',
                description: '储存失败'
            })
        }
    }

    const handleCreateCancel = () => {
        createForm.resetFields();
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
                        <Button type="primary" htmlType="button">
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

                <Modal title={'创建市场活动'} open={isCreateOpen} onCancel={handleCreateCancel} footer={null}>
                    <Form form={createForm} name={'createActivity'} onFinish={onCreateFinish}>
                        <Form.Item name='owner' label={'所有者'}
                                   rules={[
                                       {
                                           required: true,
                                           message: '请输入所有者'
                                       }
                                   ]}
                        >
                            <Select style={{width: 120}} options={allUsers} />
                        </Form.Item>
                        <Form.Item name='name' label={'名称'}
                                   rules={[
                                       {
                                           required: true,
                                           message: '请输入名称'
                                       }
                                   ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item name='date' label={'开始日期-结束日期'}>
                            <RangePicker/>
                        </Form.Item>
                        <Form.Item name='description' label={'描述'}>
                            <Input />
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
                                提交
                            </Button>
                            <Button
                                style={{ marginLeft: '10px' }}
                                onClick={() => {
                                    handleCreateCancel();
                                }}
                            >
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <MyNOtification notiMsg={notiMsg}/>
            </div>
        </ConfigProvider>
    );
};

export default MarketActivity;
