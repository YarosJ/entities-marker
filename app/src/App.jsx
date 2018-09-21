import React, {Component} from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import Document from './components/Document';
import { initializeIcons } from '@uifabric/icons';
import DOCKS from '../../kramvoda';
initializeIcons(undefined, { disableWarnings: true });

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dockIndex: 0,
    };

    this.next = this.next.bind(this);
  }

  next() {
    this.setState({dockIndex: ++this.state.dockIndex});
  }

  render() {
    return (
      <Fabric style={{ width: '100%', height: '100%' }}>
        <div style={{
          float: 'left',
          width: '7%',
          textAlign: 'center',
          height: '100%',
        }}
        >
        <DefaultButton
          onClick={() => this.state.dockIndex > 0 && this.setState({dockIndex: --this.state.dockIndex})}
          style={{ width: '100%', background: 'blue' }}
        >
          Previous
        </DefaultButton>
        <TextField
          value={this.state.dockIndex}
          onChange={(e) => {
            const dockIndex = parseInt(e.target.value);
            if (dockIndex >= DOCKS.length) return;
            this.setState({
              dockIndex: dockIndex || 0,
            });
          }}
        />
        <TextField
          value={DOCKS.length}
          readOnly={true}
          disabled={true}
        />
        <DefaultButton
          onClick={() => this.next()}
          style={{ width: '100%', background: 'blue' }}
        >
          Next
        </DefaultButton>
        </div>
        <div
          style={{
            float: 'right',
            width: '92%',
            height: '100%',
          }}
        >
          <Document next={this.next} dock={DOCKS[this.state.dockIndex].text} />
        </div>
      </Fabric>
    )
  }
}
