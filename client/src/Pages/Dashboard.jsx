import {Card, Space, Statistic, Table, Typography, Spin} from "antd";
import {ShoppingOutlined, ShoppingCartOutlined, UserOutlined, DollarCircleOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {getOrders} from "../API/index.jsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    return (
        <div style={{padding: 20}}>
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal" style={{marginBottom: 20}}>
                <DashboardCard
                    icon={
                        <ShoppingCartOutlined
                            style={{
                                color: "green",
                                backgroundColor: "rgba(0,255,0,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Orders"}
                    value={1234}
                />
                <DashboardCard
                    icon={
                        <ShoppingOutlined
                            style={{
                                color: "blue",
                                backgroundColor: "rgba(0,0,255,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Inventory"}
                    value={5678}
                />
                <DashboardCard
                    icon={
                        <UserOutlined
                            style={{
                                color: "purple",
                                backgroundColor: "rgba(128,0,128,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Customer"}
                    value={910}
                />
                <DashboardCard
                    icon={
                        <DollarCircleOutlined
                            style={{
                                color: "red",
                                backgroundColor: "rgba(255,0,0,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Revenue"}
                    value={"$12,345"}
                />
            </Space>
            <Typography.Title level={5} style={{marginTop: 20}}>
                Recent Orders
            </Typography.Title>
            <Space>
                <RecentOrders/>
                <DashboardChart/>
            </Space>
        </div>
    );
}

function DashboardCard({title, value, icon}) {
    return (
        <Card style={{width: 200}}>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value}/>
            </Space>
        </Card>
    );
}

function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Khi component được load, bắt đầu lấy dữ liệu từ API
        getOrders()
            .then((res) => {
                console.log(res); // Kiểm tra dữ liệu trả về
                // Nếu dữ liệu trả về có trường "products" thì sử dụng, nếu không thì sử dụng trực tiếp mảng dữ liệu
                setDataSource(res.products || res || []); // Cập nhật dữ liệu vào state
                setLoading(false); // Dừng trạng thái loading sau khi có dữ liệu
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false); // Dừng trạng thái loading khi có lỗi
            });
    }, []);

    if (loading) {
        // Hiển thị spinner khi dữ liệu đang được tải
        return <Spin size="large"/>;
    }

    return (
        <Table
            columns={[
                {
                    title: "Name",
                    dataIndex: "name", // Cột tên sản phẩm
                    key: "name",
                },
                {
                    title: "Quantity",
                    dataIndex: "quantity", // Cột số lượng
                    key: "quantity",
                },
                {
                    title: "Price",
                    dataIndex: "price", // Cột giá
                    key: "price",
                    render: (price) => `$${price.toFixed(2)}`, // Định dạng giá
                },
            ]}
            dataSource={dataSource} // Hiển thị dữ liệu lấy từ API
            pagination={{
                pageSize: 5, // Hiển thị 5 dòng mỗi trang
            }}
            bordered
            style={{marginTop: 20}}
        />
    );
}

function DashboardChart() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Order Revenue',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => Math.random() * 1000),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => Math.random() * 1000),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Card style={{width: 500, height: 250}}>
            <Bar options={options} data={data}/>
        </Card>
    );
}
