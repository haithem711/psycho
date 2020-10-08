import React from 'react'
import { Radio, Checkbox ,Select } from 'antd';
import {time} from '../../../../tools/time'
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
const PrivateMessage = () => {
    const [value,setValue]=React.useState('1')
    const [autoReply,setAutoReply]=React.useState(false)
    const [selectedItem]=React.useState([])
    const filteredOptions = time.filter(o => !selectedItem.includes(o));
  const   onChange=(e)=>{
        setValue(e.target.value)
    }
    function onChangeAutoReply(e) {
        console.log(`checked = ${e.target.checked}`);
       setAutoReply(e.target.checked)
       
      }
      function handleChange(value) {
        console.log(`selected ${value}`);
      }
    return (
        <div >
           <Radio.Group onChange={onChange} value={value}>              
              <div style={{display:'flex',width:'200px'}}>
              <Radio style={radioStyle} value={1}/>
                  <div>
                        I will next be online at .<Select onChange={handleChange}
                       style={{width:'90px'}}
                        showSearch={true} defaultValue="12:00 AM">
                        {filteredOptions.map(item => (
                            <Select.Option key={item} value={item}>
                                {item}
                            </Select.Option>
                        ))}
                    </Select>
                 I hope to see you there! </div>
                 </div> 
       
                <div style={{ display: 'flex', marginTop: '30px' }}>
                    <Radio style={radioStyle} value={2} />
                    <div>  I am usually online from<Select onChange={handleChange}
                        style={{ width: '90px' }}
                        showSearch={true} placeholder="12:00 AM">
                        {filteredOptions.map(item => (
                            <Select.Option key={item} value={item}>
                                {item}
                            </Select.Option>
                        ))}
                    </Select>-to <Select onChange={handleChange}
                        style={{ width: '90px' }}
                        showSearch={true} placeholder="12:00 AM">
                            {filteredOptions.map(item => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    most days. Looking forward to our next reading together.</div>
                </div>
           </Radio.Group>
      <Checkbox style={{marginTop:'40px'}} onChange={onChangeAutoReply}>Checkbox</Checkbox>
        </div>
    )
}

export default PrivateMessage
