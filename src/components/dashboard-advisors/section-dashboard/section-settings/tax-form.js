import React from 'react'
import {
    Icon,
    Button, 
    Upload,
    message
} from 'antd';
const TaxForm = () => {
     return (
        <div style={{width:'100%'}} >
            <Upload listType="picture">
                <Button style={{ marginTop: '10px' }}>
                    <Icon type="upload" /> Choose Tax Form
               </Button>
            </Upload>
            <p style={{ marginTop: '40px' }}>Download W-9 form if you are a US tax resident from <strong> <a href='https://www.irs.gov/pub/irs-pdf/fw9.pdf'>here</a> </strong></p>
            <p style={{ marginTop: '10px' }}>Download W-8 form if you are not a US tax resident from <strong><a href='https://www.irs.gov/pub/irs-pdf/fw8ben.pdf'>here</a> </strong></p>
        </div>
    )
}

export default TaxForm
