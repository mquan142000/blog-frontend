import { Space, Table, Typography, Spin, Button, Modal, Form, Input, InputNumber, Switch, message, Upload, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getProduct, addProduct, updateProduct, deleteProduct, getCategories } from "../API/index.jsx";

function UploadOutlined() {
    return null;
}

export default function Inventory() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [categories, setCategories] = useState([]);  // State for categories
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        // Get products
        getProduct()
            .then(res => {
                setDataSource(res.products || res || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });

        // Get categories (ensure this API call is correct)
        getCategories()
            .then(res => {
                console.log(res); // Kiểm tra dữ liệu trả về từ API
                setCategories(res.categories || []);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleEdit = (record) => {
        setIsEditing(true);
        setEditingProduct(record);
        form.setFieldsValue({
            ...record,
            category: { id: record.category?.id, name: record.category?.name }, // Set the category values in form
        });
        setIsModalOpen(true);
    };

    const handleDelete = (key) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            onOk: async () => {
                try {
                    await deleteProduct(key);
                    const newData = dataSource.filter((item) => item.key !== key);
                    setDataSource(newData);
                    message.success('Product deleted successfully!');
                } catch (error) {
                    console.error("Error deleting product:", error);
                    message.error('Failed to delete the product.');
                }
            },
        });
    };

    const handleAddProduct = () => {
        setIsEditing(false);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleModalSubmit = async () => {
        try {
            const values = await form.validateFields();
            const token = localStorage.getItem('token'); // Get token from localStorage

            if (isEditing) {
                await updateProduct(editingProduct.key, values, token); // Pass token to API call
                const updatedData = dataSource.map(item =>
                    item.key === editingProduct.key ? { ...item, ...values } : item
                );
                setDataSource(updatedData);
                message.success("Product updated successfully!");
            } else {
                const formData = { ...values, key: dataSource.length + 1 };
                await addProduct(formData, token); // Pass token to API call
                setDataSource([...dataSource, formData]);
                message.success("Product added successfully!");
            }
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error("Validation Failed:", error);
            message.error("Failed to submit the form.");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Typography.Title level={4}>Inventory</Typography.Title>
            <Button
                type="primary"
                style={{ marginBottom: 20 }}
                onClick={handleAddProduct}
            >
                Add Product
            </Button>
            <Space direction="vertical" size={20} style={{ width: "100%" }}>
                {loading ? (
                    <Spin size="large" style={{ display: "block", margin: "0 auto" }} />
                ) : (
                    <Table
                        columns={[
                            { title: "Name", dataIndex: "name", key: "name" },
                            { title: "Image", dataIndex: "imageUrl", key: "imageUrl", render: (imageUrl) => <img src={`http://localhost:8089${imageUrl}`} alt="Product" style={{ width: 50, height: 50, objectFit: "cover" }} /> },
                            { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                            { title: "Category Name", dataIndex: ["category", "name"], key: "categoryName", render: (name) => name || "Uncategorized" },
                            { title: "Price", dataIndex: "price", key: "price", render: (price) => `$${price.toFixed(2)}` },
                            { title: "Active", dataIndex: "isActive", key: "isActive", render: (isActive) => (isActive ? "Yes" : "No") },
                            { title: "Created Date", dataIndex: "createdDate", key: "createdDate" },
                            {
                                title: "Action", key: "action", render: (_, record) => (
                                    <Space size="middle">
                                        <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                                        <Button type="link" danger onClick={() => handleDelete(record.key)}>Delete</Button>
                                    </Space>
                                ),
                            },
                        ]}
                        dataSource={dataSource.map((item, index) => ({ ...item, key: index }))}
                        pagination={{ pageSize: 5 }}
                        bordered
                    />
                )}
            </Space>
            <Modal
                title={isEditing ? "Edit Product" : "Add Product"}
                open={isModalOpen}
                onOk={handleModalSubmit}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    {/* Product Name */}
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: "Please input the product name!" },
                            { max: 100, message: "Product name cannot exceed 100 characters!" }
                        ]}
                    >
                        <Input placeholder="Enter product name" />
                    </Form.Item>

                    {/* Product Image */}
                    <Form.Item
                        label="Image"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                        rules={[{ required: true, message: "Please upload an image!" }]}
                    >
                        <Upload
                            name="image"
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false} // Prevent auto upload
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    {/* Product Quantity */}
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            { required: true, message: "Please input the quantity!" },
                            { type: "number", min: 1, message: "Quantity must be at least 1!" }
                        ]}
                    >
                        <InputNumber min={1} style={{ width: "100%" }} placeholder="Enter quantity" />
                    </Form.Item>

                    {/* Product Price */}
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            { required: true, message: "Please input the price!" },
                            { type: "number", min: 0.01, message: "Price must be greater than 0!" }
                        ]}
                    >
                        <InputNumber min={0.01} step={0.01} style={{ width: "100%" }} placeholder="Enter price" />
                    </Form.Item>

                    {/* Product Category */}
                    <Form.Item
                        label="Category"
                        name="category.id"
                        rules={[{ required: true, message: "Please select a category!" }]}
                    >
                        <Select placeholder="Select a category">
                            {categories.map((cat) => (
                                <Select.Option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Product Active Status */}
                    <Form.Item
                        label="Active"
                        name="isActive"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
