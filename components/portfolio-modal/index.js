import React, { Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalPortfolio extends React.Component {

  render() {
    const { isOpen, toggleModal, portfolio } = this.props;

    return (
      <div>
        <Modal isOpen={isOpen}>
          <ModalHeader toggle={toggleModal}>{portfolio.title}</ModalHeader>
          <ModalBody>
            {
              portfolio.imgUrl &&
              <div className="img-container modal-img">
                <img width="100%" src={portfolio.imgUrl} alt="Card image cap"
                  loading="lazy"
                />
              </div>
            }
            {
              portfolio.appGoal &&
              <Fragment>
                <b>{'Application Goal:'}</b>
                <p>{portfolio.appGoal}</p>
              </Fragment>
            }
            <b>{'Description:'}</b>
            <p>{ portfolio.description }</p>
            {
              portfolio.codeUrl &&
              <div className='modal-block'>
                <b>{'App code: '}</b>
                <a href={portfolio.codeUrl} target='_blank'>{portfolio.codeUrl}</a>
              </div>
            }
            {
              portfolio.deployedAppLink &&
              <div className='modal-block'>
                <b>{'Deployed App: '}</b>
                <a href={portfolio.deployedAppLink} target='_blank'>{portfolio.deployedAppLink}</a>
              </div>
            }
            {
              portfolio.language &&
              <Fragment>
                <b>{'Tech Stack:'}</b>
                <p>{portfolio.language}</p>
              </Fragment>
            }
            {
              portfolio.company &&
              <Fragment>
                <b>{'Company:'}</b>
                <p>{portfolio.company}</p>
              </Fragment>
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

export default ModalPortfolio;
