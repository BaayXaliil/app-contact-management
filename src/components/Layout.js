import React, { useState } from 'react'
import { Breadcrumb, Layout } from 'antd';
import PublicRouter from '../router';
const { Header, Content, Footer } = Layout;

function PublicLayout() {
    const [visible, setVisible] =  useState(false)
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" >App Contact Management</div>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    {visible && <Breadcrumb.Item>Detail</Breadcrumb.Item>}
                </Breadcrumb>
                <PublicRouter setVisible={setVisible} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2022 Test React by Khalil
            </Footer>
        </Layout>
    )
}

export default PublicLayout