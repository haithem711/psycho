import { Button } from 'antd'
import React from 'react'
import { Icon, Modal, Checkbox,Select,Slider, InputNumber, Row, Col  } from 'antd'
const { Option } = Select;
const SectionDashboard = () => {
    const [chatPrice,setChatPrice]=React.useState(0)
    const [callPrice,setCallPrice]=React.useState(1)
    const [visible, setVisible] = React.useState(false)
    const showModal = () => {
        setVisible(true)
    };
    const handleOk = () => {
        setChatPrice(chatPrice)
        setCallPrice(callPrice)
        setVisible(false)
    };
    const handleCancel = e => {
        setVisible(false)
    };
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    function handleChange(value) {
        console.log(`selected ${value}`);
      }
    const  onChangeChatPrice = value => {
        if (isNaN(value)) {
          return;
        }
       setChatPrice(value)
      };
      const  onChangeCallPrice = value => {
       
       setCallPrice(value)
      };
      function formatter(value) {
        return `${value}.99 $`;
      }
    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-arround' }}>
                <div>
                    <img style={{ height: '80px', width: '80px', borderRadius: '40px', marginRight: '10px' }} src='https://images.unsplash.com/photo-1551179939-b839002d0a18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='photo' />
                </div>
                <div>
                    <h1>Haithem Hajri</h1>
                    <p style={{ backgroundColor: '#8c8c8c', borderRadius: '8px', width: '45px' }}>Offline</p>
                    { /*<p style={{backgroundColor:'#31a14d',borderRadius:'8px',width:'45px'}} >Online</p>*/}
                    <p>Horoscopes</p>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Icon style={{ fontSize: '20px', marginRight: '10px' }} type="message" />
                <strong style={{ marginRight: '20px' }}>Chats</strong>
                <strong style={{ marginRight: '20px' }}>$00.00/min</strong>
                < Button style={{ marginRight: '20px' }} type="primary" onClick={showModal}>Edit Prices</Button>
                <Checkbox style={{ marginRight: '10px' }} onChange={onChange} />
                <Modal
                    title="Basic Modal"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                />
            </div>
            <div style={{ marginTop: '20px' }}>
                <Icon style={{ fontSize: '20px', marginRight: '10px' }} type="phone" />
                <strong style={{ marginRight: '20px' }}>Calls</strong>
                <strong style={{ marginRight: '20px' }}>  $00.00/min  </strong>
                < Button style={{ marginRight: '20px' }} type="primary" onClick={showModal}>
                    Edit Prices
                    </Button>
                <Checkbox style={{ marginRight: '10px' }} onChange={onChange} />
                <Modal
                    title=" Edit Prices"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <strong>Chat price per minute:</strong>
                    <Slider tipFormatter={formatter} style={{ width: '27rem', marginTop: '50px' }}
                        min={1}
                        max={14}
                        onChange={onChangeChatPrice}
                        value={typeof chatPrice === 'number' ? chatPrice : 0}
                        step={1}
                    />
                    <strong> Call price per minute:  </strong>

                    <Slider tipFormatter={formatter} style={{ width: '27rem', marginTop: '50px' }}
                        min={1}
                        step={1}
                        max={14}
                        onChange={onChangeCallPrice}
                        value={typeof callPrice === 'number' ? callPrice : 0} />
                    <p>You can't change the price more than once <strong style={{ color: 'red' }}>every 24 hours</strong></p>
                </Modal>
            </div>
            <div style={{ display: 'flex' }}>
                <h2 style={{ marginRight: '30px', marginTop: '20px' }}>Number of parallel chats  </h2>
                <Select defaultValue="1" style={{ width: 120, marginTop: '20px' }} onChange={handleChange}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                </Select>
            </div>
            <div style={{ display: 'flex' }}>
                <h3 style={{ fontWeight: 'bold', marginTop: '20px' }}> User reviews</h3> <h3 style={{ fontWeight: 'bold', marginLeft: '50px', marginTop: '20px' }}>0</h3>
            </div>
            <p>No reviews published yet</p>
        </div>
    )
}

export default SectionDashboard
