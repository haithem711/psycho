import React from "react";
import {Modal, Button} from 'antd';
import {connect} from "react-redux";
import {dynamicModalClose, dynamicModalOpen} from "../../actions/dynamic-modal/actions";

const DynamicModal = ({isOpen, dynamicModalOpen, children, dynamicModalClose}) => {
  return (
    <div className="re-login-modal">
      <Modal
        visible={isOpen}
        onCancel={dynamicModalClose}
        footer={<Footer close={dynamicModalClose}/>}
      >
        {children}
      </Modal>
    </div>
  );
};
const Footer = ({close}) => {
  return (
    <Button onClick={close}>Close</Button>
  );
};

const mapStateToProps = reduxStore => {
  return {
    isOpen: reduxStore.dynamicModalReducer.isOpen,
  };
};

export default connect(
  mapStateToProps,
  {dynamicModalOpen, dynamicModalClose}
)(DynamicModal);



