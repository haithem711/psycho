import React from "react";
import { List } from 'antd';
import CommentItem from "../comment/CommentItem"
import "./comments-list.scss"



const CommentLists = (props)  => (
    <List
        className={"comments-list"}
        dataSource={props.comments}
        header={`${props.comments.length} ${props.comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <CommentItem {...props} />}
    />
);



export default  CommentLists;