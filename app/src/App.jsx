import React, {Component} from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import Document from './components/Document';

import { initializeIcons } from '@uifabric/icons';

initializeIcons(undefined, { disableWarnings: true });

const DOCKS = [
  'lsdjfjdljlk sjsdflksdfjkfslk lkjlkfsdkj dfskjfsdlk',
  'ljerlijfsdlj dlsjfsljdfldskjfl dflkjfsdlfjsdlihdl dskjfslk',
  ';osdjfsdo;djsv;jsdkj lkjfldkjsflj sdlkjsdfkjsfd sdfflkjdsfkl',
  ';kdso;fks;dok s;kfsd;kfsd;okk.vsdj jlkjsdklj',
];

export default class App extends Component {
  render() {
    return (
      <Fabric>
        {DOCKS.map((dock, key) =>
          <Document key={key} dock={dock} />
        )}
      </Fabric>
    )
  }
}
