import React from 'react'
import { Modal,Col,Row ,Button,Card,Icon } from 'antd';
const Balance = () => {
    const [visible,setVisible]=React.useState(false)


   const  showModal = () => {
       setVisible(true)
      };
    const   handleOk = e => {
        console.log(e);
       setVisible(false)
      };
      const handleCancel = e => {
        console.log(e);
       setVisible(false)
      };
    return (
        <div>
            <h1 style={{ marginBottom: '30px' }}>Transactions $0.00</h1>
            <p style={{ marginBottom: '10px' }}>Add Funds</p>
            <div style={{ width: '100%' }}>
                <Row gutter={{ sm: 4, md: 24, lg: 16 }} style={{ width: '100%' }}>

                    <Col className="gutter-row" xs={12} sm={10} md={10} lg={10} xl={4}  >
                        <Card title="$10.00" bordered={true} hoverable={true} style={{ backgroundColor: '#305c79', marginBottom: '30px', borderRadius: '15px' }}>
                            <Button style={{ color: 'RGB(48, 92, 121)' }} onClick={showModal}>Add Funds</Button>
                            <Modal
                                title="Basic Modal"
                                visible={visible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okButtonProps={{ disabled: false }}
                                cancelButtonProps={{ disabled: false }}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </Card>
                    </Col>

                    <Col className="gutter-row" xs={12} sm={10} md={10} lg={10} xl={4}  >
                        <Card title="$20.00" bordered={true} hoverable={true} style={{ backgroundColor: '#305c79', marginBottom: '30px', borderRadius: '15px' }}>
                            <Button style={{ color: 'RGB(48, 92, 121)' }} onClick={showModal}>Add Funds</Button>
                            <Modal
                                title="Basic Modal"
                                visible={visible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okButtonProps={{ disabled: false }}
                                cancelButtonProps={{ disabled: false }}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </Card>
                    </Col>

                    <Col className="gutter-row" xs={12} sm={10} md={10} lg={10} xl={4}  >
                        <Card title="$30.00" bordered={true} hoverable={true} style={{ backgroundColor: '#305c79', marginBottom: '30px', borderRadius: '15px' }}>
                            <Button style={{ color: 'RGB(48, 92, 121)' }} onClick={showModal}>Add Funds</Button>
                            <Modal
                                title="Basic Modal"
                                visible={visible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okButtonProps={{ disabled: false }}
                                cancelButtonProps={{ disabled: false }}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </Card>
                    </Col>

                    <Col className="gutter-row" xs={12} sm={10} md={10} lg={10} xl={4}  >
                        <Card title="$60.00" bordered={true} hoverable={true} style={{ backgroundColor: '#305c79', marginBottom: '30px', borderRadius: '15px' }}>
                            <Button style={{ color: 'RGB(48, 92, 121)' }} onClick={showModal}>Add Funds</Button>
                            <Modal
                                title="Basic Modal"
                                visible={visible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okButtonProps={{ disabled: false }}
                                cancelButtonProps={{ disabled: false }}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </Card>
                    </Col>

                    <Col className="gutter-row" xs={12} sm={10} md={10} lg={10} xl={4}  >
                        <Card title="$120.oo" bordered={true} hoverable={true} style={{ backgroundColor: '#305c79', marginBottom: '30px', borderRadius: '15px' }}>
                            <Button style={{ color: 'RGB(48, 92, 121)' }} onClick={showModal}>Add Funds</Button>
                            <Modal
                                title="Basic Modal"
                                visible={visible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okButtonProps={{ disabled: false }}
                                cancelButtonProps={{ disabled: false }}
                            >
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Modal>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Button type="primary" style={{marginBottom:'20px'}}>
            All transactions history 
                <Icon type="right" />
            </Button>
        </div>
    )
}

export default Balance
