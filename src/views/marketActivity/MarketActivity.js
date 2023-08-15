import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, DatePicker, Form, Input, Modal, Pagination, Select, Table} from "antd";
import './MarketActivity.css'
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';
import {$queryAllUsers} from "../../api/adminApi";
import {$insertActivity, $qryActivityPage} from "../../api/activityApi";
import MyNOtification from "../../components/notification/MyNOtification";
import UpdateActivityModal from "./UpdateActivityModal";

const MarketActivity = () => {

    // 主界面使用的表单
    const [form] = Form.useForm();
    // 创建市场活动弹窗使用的表单
    const [createForm] = Form.useForm();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    // 修改市场活动所用的表单
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
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
    const [totalActivity, setTotalActivity] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectRecord, setSelectRecord] = useState([]);
    const selectionType = 'radio'

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
                newObj.value = item.id
                newRows.push(newObj)
            })
            setAllUsers(newRows)
        } )
    },[])

    const onFinish = async () => {
        await activityPagination(1, 10)
    }

    // 分页查询函数，这个是提取出来的
    const activityPagination = async (page = 1, pageSize = 10) => {
        setLoading(true)
        const qryObj = form.getFieldsValue();
        qryObj.pageNo = currentPage
        qryObj.pageSize = pageSize

        const result = await $qryActivityPage(qryObj)
        if(result.message === '成功') {
            result.data.activityPage.map((item) => {
                item.key = item.id
            })
            setActivityData(result.data.activityPage)
            setCurrentPage(page)
            setPageSize(pageSize)
            setTotalActivity(result.data.activityPageCount)
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
        setLoading(false)
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

    // 设置初始值，例如默认选择 "张三"
    const initialFormValues = {
        owner: "06f5fc056eac41558a964f96daa7f27c", // "33" 对应张三的 value
    };

    if (isCreateOpen) {
        createForm.setFieldsValue(initialFormValues);
    }

    const handleActivityPagination = (page, pageSize) => {
        activityPagination(page, pageSize)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectRecord(selectedRows)
        }
    };

    const updateModal = () => {
        setIsUpdateOpen(true)
    }

    const closeUpdateModal = () => {
        setIsUpdateOpen(false)
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
                        <Button type="primary" htmlType="button" onClick={updateModal}>
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
                    <Table
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={activityData}
                        pagination={false}
                        loading={loading}
                    />
                    <Pagination
                        current={currentPage}
                        total={totalActivity}
                        pageSize={pageSize}
                        onChange={handleActivityPagination}
                    />
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
                            <Select style={{width: 120}} options={allUsers}/>
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

                <UpdateActivityModal
                    isUpdateOpen={isUpdateOpen}
                    closeUpdateModal={closeUpdateModal}
                    allusers={allUsers}
                    selectReord={selectRecord}
                />

                <MyNOtification notiMsg={notiMsg}/>
            </div>
        </ConfigProvider>
    );
};

export default MarketActivity;
