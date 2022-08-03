import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddContact from './pages/ViewContact';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

const App = () => (
  <div className="App">
    <Layout className="layout">
      <Header>
        <div className="logo" >App Contact Management</div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>Detail</Breadcrumb.Item>
        </Breadcrumb>

        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/add-contact/:id' element={<AddContact />} />
          </Routes>
        </BrowserRouter>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2022 Test React by Khalil
      </Footer>
    </Layout>

  </div>
);
export default App;
