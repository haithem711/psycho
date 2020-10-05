import React from 'react';
import { Typography} from "antd";
import {Link} from "react-router-dom";
import "./speciality-link.scss"
const SpecialityLink = (props) => {
    return (
        <Link to={props.link} className={"speciality-link"}>
            <div className={"speciality-link"}>
                {props.icon}
                <Typography.Text level={4}>{props.title}</Typography.Text>
            </div>
        </Link>
    );
};

export default SpecialityLink;
