import React from 'react'
import { Modal,Col,Row ,Button,Card,Icon } from 'antd';
import "./balance.css"
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
            <h1 style={{ marginBottom: '30px', padding: '2rem' }}>Transactions $0.00</h1>
            <p style={{ marginBottom: '10px', fontSize: '2rem', fontWeight: 'bold' }}>Add Funds</p>
            <div style={{ width: '100%' }}>
                <Row gutter={{ sm: 4, md: 24, lg: 16 }} style={{ width: '100%', padding: '1rem' }}>
                    <Col className="gutter-row" xs={12} sm={10} md={10} lg={10} xl={4}  >
                        <div className="card-price">
                            <h3 className='title-card'>$10.00</h3>
                            <Button className='button-card' onClick={showModal}>Add Funds</Button>
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
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={12} sm={10} md={10} lg={10} xl={4}  >
                        <div className="card-price">
                            <h3 className='title-card'>$20.00</h3>
                            <Button className='button-card' onClick={showModal}>Add Funds</Button>
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
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={12} sm={10} md={10} lg={10} xl={4}  >
                        <div className="card-price">
                            <h3 className='title-card'>$30.00</h3>
                            <Button className='button-card' onClick={showModal}>Add Funds</Button>
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
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={12} sm={10} md={10} lg={10} xl={4}  >
                        <div className="card-price">
                            <h3 className='title-card'>$60.00</h3>
                            <Button className='button-card' onClick={showModal}>Add Funds</Button>
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
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={12} sm={10} md={10} lg={10} xl={4}  >
                        <div className="card-price">
                            <h3 className='title-card'>$120.00</h3>
                            <Button className='button-card' onClick={showModal}>Add Funds</Button>
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
                        </div>
                    </Col>
                </Row>
            </div>
            <Button type="primary" style={{ margin: '4rem' }}>
                All transactions history
                <Icon type="right" />
            </Button>
        </div>
    )
}

export default Balance
