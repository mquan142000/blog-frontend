import { Space, Spin, Table, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { getCustomers } from "../API/index.jsx";

export default function Customers() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const response = await getCustomers();
                setDataSource(response.map((item, index) => ({ ...item, key: index })));
            } catch (error) {
                console.error("Failed to fetch customers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Address", dataIndex: "address", key: "address" },
        {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl) => (
                <img
                    src={`http://localhost:8089${imageUrl}`}
                    alt="Customer"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                />
            ),
        },
        { title: "Created Date", dataIndex: "createdDate", key: "createdDate" },
    ];

    return (
        <div style={{ padding: 20 }}>
            <Typography.Title level={4}>Customers</Typography.Title>
            <Space direction="vertical" size={20} style={{ width: "100%" }}>
                {loading ? (
                    <Spin size="large" style={{ display: "block", margin: "0 auto" }} />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{ pageSize: 5 }}
                        bordered
                    />
                )}
            </Space>
        </div>
    );
}
