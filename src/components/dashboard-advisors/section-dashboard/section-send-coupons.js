import React, { useState } from 'react'
import { Tag, Button } from 'antd';
const { CheckableTag } = Tag;
const freeMinute = ['3 min', '5 min', '7 min', '$10.00', '$15.00', '$20.00'];
const sendto = ['All my clients', '10% of clients ', 'Free minutes readlng clients', 'My best Clients']
const SendCoupons = () => {
    const [selectedTags, setSelectedTags] = useState([])
    const [sendTo, setSendTo] = useState([])
    function handleChange(tag, checked) {
        const nextSelectedTags = checked ? (tag) : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags)
    }
    function handleChangeSendTo(tag, checked) {
        const nextSendTo = checked ? (tag) : sendTo.filter(t => t !== tag);
        console.log('You are interested in: ', nextSendTo);
        setSendTo(nextSendTo)
    }

    return (
        <div>
            <h1 style={{ padding: '2rem' }}>Send Coupons</h1>
            <div style={{ width: '250px', padding: '2rem' }}>
                <strong>Coupon Value (free minutes)</strong>
                {freeMinute.map(tag => (
                    <CheckableTag
                        style={{ padding:'2px',textAlign:'center',width: '80px', cursor: 'pointer', border: 'solid 1px', margin: '5px 5px 0 5px' }}
                        key={tag}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={checked => handleChange(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))}
            </div>
            <div style={{ width: '250px', padding: '2rem' }}>
                <strong >Send to:</strong>
                {sendto.map(tag => (
                    <CheckableTag
                        style={{ width: '170px',padding:'2px',textAlign:'center', cursor: 'pointer', border: 'solid 1px', margin: '5px 5px 0 5px' }}
                        key={tag}
                        checked={sendTo.indexOf(tag) > -1}
                        onChange={checked => handleChangeSendTo(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))}
            </div>
            <Button type="primary" style={{ margin: "2rem" }}> Send Free Minutes</Button>
            <div>
            </div>
        </div>
    )
}

export default SendCoupons
