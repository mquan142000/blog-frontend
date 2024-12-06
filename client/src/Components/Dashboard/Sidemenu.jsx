import { Menu } from 'antd';
import React from 'react';
import { AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function Sidemenu() {
    const navigate = useNavigate();
    return (
        <div className='Sidemenu'>
            <Menu
                onClick={(item) => {
                    navigate(item.key); // Chuyển hướng đến route
                }}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreOutlined />,
                        key: '/dashboard', // Route cho trang dashboard
                    },
                    {
                        label: "Inventory",
                        icon: <ShopOutlined />,
                        key: '/dashboard/inventory', // Đảm bảo key chứa route đầy đủ
                    },
                    {
                        label: "Orders",
                        icon: <ShoppingCartOutlined />,
                        key: '/dashboard/orders', // Đảm bảo key chứa route đầy đủ
                    },
                    {
                        label: "Customers",
                        icon: <UserOutlined />,
                        key: '/dashboard/customers', // Đảm bảo key chứa route đầy đủ
                    },
                ]}
            />
        </div>
    );
}
