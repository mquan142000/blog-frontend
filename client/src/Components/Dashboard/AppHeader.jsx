import React from 'react';
import logo from '../../LoginAssets/logo.png';
import './dashboard.css';
import { Badge, Space, Typography } from 'antd';
import { BellFilled, MailOutlined } from '@ant-design/icons'

export default function AppHeader() {
    return (
        <div className="AppHeader">
            <img className="AppHeader-logo" src={logo} alt="Logo" />
            <Typography.Title>Foodie Dashboard</Typography.Title>
            <Space>
                <Badge count={10} dot>
                    <MailOutlined style={{ fontSize: 24 }} />
                </Badge>
                <Badge count={20}>
                    <BellFilled style={{ fontSize: 24 }} />
                </Badge>
            </Space>
        </div>
    );
}
