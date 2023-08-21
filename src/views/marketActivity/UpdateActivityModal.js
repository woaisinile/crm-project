import React, {useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, message, Modal, Select} from "antd";
import MyNOtification from "../../components/notification/MyNOtification";
import {$insertActivity, $updateActivity} from "../../api/activityApi";

function UpdateActivityModal(props){

    const [form] = Form.useForm();
    // 时间选择器
    const { RangePicker } = DatePicker;
    let [notiMsg, setNotiMsg] = useState({
        type: '',
        description: ''
    })

    const onUpdateFinish = async (values) => {
        values.id = props.selectReord[0].id
        console.log(values)
        const result = $updateActivity(values)
        if(result.message === '成功') {
            setNotiMsg({
                type: 'success',
                description: '更新成功'
            })
        } else {
            setNotiMsg({
                type: 'error',
                description: '更新失败'
            })
        }
    }

    useEffect(() => {
        if (props.selectReord.length === 0 && props.isUpdateOpen){
            message.error('请选择一列数据')
            props.closeUpdateModal()
        }
        const initialForm = props.selectReord[0]
        form.setFieldsValue(initialForm)
        form.setFieldsValue({owner: initialForm?.ownerId})
    },)

    return(
        <div>
            <Modal title={'修改市场活动'}
                   open={props.isUpdateOpen}
                   onCancel={props.closeUpdateModal}
                   footer={null}
            >
                <Form form={form} name={'updateActivity'} onFinish={onUpdateFinish}>
                    <Form.Item name='owner' label={'所有者'}
                               rules={[
                                   {
                                       required: true,
                                       message: '请输入所有者'
                                   }
                               ]}
                    >
                        <Select style={{width: 120}} options={props.allusers}/>
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
                            onClick={props.closeUpdateModal}
                        >
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <MyNOtification notiMsg={notiMsg}/>
        </div>
    )
}

export default UpdateActivityModal;
