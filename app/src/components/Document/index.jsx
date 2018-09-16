import React, { Component } from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: undefined,
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
      <Fabric>
        <textarea
          readOnly
          value={this.props.dock}
          style={{ width: '100%' }}
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
          border: 'solid red',
          textAlign: 'center',
        }}
        >
          {`${selectionStart}-${selectionEnd}`}
          {' '}
|
          {selection}
          <Dropdown
            placeHolder="Select an Option"
            defaultSelectedKey="ORG"
            onChange={this.selectType}
            options={[
              { key: 'LOC', text: 'LOC' },
              { key: 'ORG', text: 'ORG' },
              { key: 'PER', text: 'PER' },
            ]}
          />
          <DefaultButton>Delete</DefaultButton>
        </div>
        <DefaultButton onClick={() => console.log(this.state)}>
          Confirm
        </DefaultButton>
      </Fabric>
    );
  }
}
