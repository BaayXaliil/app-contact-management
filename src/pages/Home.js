import { Button, Form, Input, InputNumber, message, Modal, Popconfirm, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, editUser, loadUsers } from './../redux/action'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
const key = 'updatable';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Créer un nouveau contact"
            okText="Ajouter"
            cancelText="Annuler"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="horizontal"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="name"
                    label="Prénom et Nom :"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail :"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the email of collection!',
                        },
                    ]}
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    name="contact"
                    label="Numéro de téléphone :"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the phone number of collection!',
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Adresse :"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the address of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const Home = ({showNavlink}) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [visible, setVisible] = useState(false);
    let dispatch = useDispatch()
    const { users } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(loadUsers());
        showNavlink(false);
    }, [])

    const success = (text) => {
        message.success(text);
    };
    const error = (text) => {
        message.error(text);
    };
    const openMessage = () => {
        message.loading({
            content: 'Action en cours',
            key,
            duration: 2
        })
    };

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        dispatch(addUser(values))
        success('Contact ajouter avec succés')
        setVisible(false);
    };

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            email: '',
            contact: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const handleDelete = (key) => {
        dispatch(deleteUser(key))
    };

    const save = async (key) => {
        try {
            const user = await form.validateFields();
            console.log(user);
            dispatch(editUser(key, user))
            setEditingKey('');
        } catch (errInfo) {
            error(errInfo)
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'name',
            editable: true,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            editable: true
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            editable: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            editable: true,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <div className='buttons'>
                        <Link to={`/add-contact/${record.key}`}>
                            <Tooltip placement="top" title="Voir" color="blue">
                                <EyeOutlined />
                            </Tooltip>
                        </Link>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <Tooltip placement="top" title="Editer" color="green">
                                <EditOutlined style={{ 'color': 'green' }} />
                            </Tooltip>
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <Tooltip placement="top" title="Supprimer" color="red">
                                <a><DeleteOutlined style={{ 'color': 'red' }} /></a>
                            </Tooltip>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'contact' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <div className='add-row'>
                <Button
                    type="primary"
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    Ajouter un contact
                </Button>
                <CollectionCreateForm
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                />
            </div>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={users}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default Home;