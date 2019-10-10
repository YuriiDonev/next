import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {

  render() {

    const { isOpen, toggleModal, portfolio } = this.props;

    return (
      <div>
        <Modal isOpen={isOpen}>
          <ModalHeader toggle={toggleModal}>{portfolio.title}</ModalHeader>
          <ModalBody>
            {
              portfolio.description
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
