import React, { Component } from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

export default class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: 'LOC',
      selectionStart: undefined,
      selectionEnd: undefined,
      selection: undefined,
    };

    this.selectType = (_this, item) => {
      this.setState({ selectedType: item.key });
    };
  }

  render() {
    const { selectionStart, selectionEnd, selection } = this.state;
    return (
      <Fabric style={{ width: '100%', height: '92%' }}>
        <textarea
          readOnly
          value={this.props.dock}
          style={{ width: '100%', height: '80%' }}
          onMouseUp={(e) => {
            this.setState({
              selectionStart: e.target.selectionStart,
              selectionEnd: e.target.selectionEnd,
              selection: window.getSelection().toString(),
            });
          }}
        />
        <div style={{
          width: '100%',
          textAlign: 'center',
          marginBottom: 5,
        }}
        >
          {`${selectionStart}-${selectionEnd}`}
          {' '}
          |
          {selection}
          <Dropdown
            placeHolder="Select an Option"
            defaultSelectedKey="LOC"
            onChange={this.selectType}
            options={[
              { key: 'LOC', text: 'LOC' },
              { key: 'ORG', text: 'ORG' },
              { key: 'PER', text: 'PER' },
            ]}
          />
        </div>
        <DefaultButton
          onClick={
            () => this.props.addEntitySelection(this.state)
          }
        >
          Confirm
        </DefaultButton>
      </Fabric>
    );
  }
}
