import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, DatePicker, Form, Input, Modal, Pagination, Select, Table} from "antd";
import './MarketActivity.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';
import {$queryAllUsers} from "../../api/adminApi";
import {$insertActivity, $qryActivityPage} from "../../api/activityApi";
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
    // column的数据
    const [activityData, setActivityData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalActivity, setTotalActivity] = useState(0)

    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '所有者',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: '开始日期',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: '结束日期',
            dataIndex: 'endDate',
            key: 'endDate',
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

    const onFinish = async () => {
        await activityPagination()
    }

    const activityPagination = async (page, pageSize) => {
        setCurrentPage(page)
        setPageSize(pageSize)
        const qryObj = form.getFieldsValue();
        qryObj.pageNo = page
        qryObj.pageSize = pageSize

        const result = await $qryActivityPage(qryObj)
        if(result.message === '成功') {
            setActivityData(result.data.activityPage)
            setNotiMsg({
                type: 'success',
                description: '查询成功'
            })
        } else {
            setNotiMsg({
                type: 'error',
                description: '查询失败'
            })
        }
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
                        name="owner"
                        label="所有者"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="startDate"
                        label="开始日期"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="endDate"
                        label="结束日期"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit"> 查询</Button>
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
                    <Table columns={columns} dataSource={activityData} pagination={false}/>
                    <Pagination current={currentPage} total={totalActivity} pageSize={pageSize}
                                onChange={activityPagination} />
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
                            <Select style={{width: 120}} options={allUsers} defaultValue={'李四'}/>
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
