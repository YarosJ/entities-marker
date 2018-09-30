import React, { Component } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import Modal from 'react-modal';
import Selection from '../Selection';
import fs from 'fs';

Modal.setAppElement('#modal');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    border: 'solid',
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      text: this.props.dock,
      selections: [],
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  addEntitySelection(newSelection) {
    this.setState({
      selections: [...this.state.selections, newSelection],
    });
  }

  deleteEntitySelection(deleteSelection, index) {
    const selections = [...this.state.selections];
    selections.splice(index, 1);
    this.setState({ selections });
  }

  writeFile(data) {
    data.text = this.props.dock;
    fs.appendFileSync('NER_Kramvoda.txt', `${JSON.stringify(data)}, `);
    this.setState({ selections: [] });
    this.props.next();
  }

  render() {
    return (
      <Fabric style={{ width: '100%', height: '100%' }}>
        <textarea
          readOnly
          value={this.props.dock}
          style={{ width: '100%', height: '50%' }}
        />
        <div style={{
          width: '100%',
          border: 'solid red',
          textAlign: 'center',
          marginBottom: '5px',
        }}
        >
          {this.state.selections.map(
            (s, index) => (
              <div>
                {s.selectionStart} - {s.selectionEnd} | {s.selection} ===>>> {s.selectedType}
                <DefaultButton onClick={()=> this.deleteEntitySelection(s, index)}>
                  Delete Entity
                </DefaultButton>
              </div>
            ),
          )}
          <DefaultButton
            onClick={this.openModal}
            style={{ background: 'yellow' }}
          >
            AddSelection
          </DefaultButton>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Select entity"
          >
            <DefaultButton
              onClick={this.closeModal}
              style={{
                float: 'right',
                marginBottom: '10px',
              }}
            >
              X
            </DefaultButton>
            <Selection
              dock={this.props.dock}
              addEntitySelection={this.addEntitySelection.bind(this)}
            />
          </Modal>
        </div>
        <DefaultButton
          onClick={() => this.writeFile(this.state)}
          style={{border: 'solid'}}
        >
          Confirm
        </DefaultButton>
      </Fabric>
    );
  }
}
