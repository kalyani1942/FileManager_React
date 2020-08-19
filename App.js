import React from 'react';

import FileManager, { Permissions } from 'file_managment'
import RemoteFileSystemProvider from 'file_management/remote_provider';
import { Popup } from 'devextreme-react/popup';

const remoteProvider = new RemoteFileSystemProvider({
  endpointUrl: 'https://file-manager-file-system-images'
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPath: 'Widescreen',
      popupVisible: false,

    };


    this.onCurrentDirectoryChanged = this.onCurrentDirectoryChanged.bind(this);
  }

  displayImagePopup(e) {
    this.setState({
      popupVisible: true,
      imageItemToDisplay: {
        name: e.fileItem.name,
        url: e.fileItem.dataItem.url
      }
    });
  }


  onCurrentDirectoryChanged(e) {
    this.setState({
      currentPath: e.component.option('currentPath')
    });
  }

  render() {
    return (
      <div>
        <FileManager
          currentPath={this.state.currentPath}
          fileSystemProvider={remoteProvider}
          onSelectedFileOpened={this.displayImagePopup}
          onCurrentDirectoryChanged={this.onCurrentDirectoryChanged}>
          <Permissions
            create={true}
            copy={true}
            move={true}
            delete={true}
            rename={true}
            upload={true}
            download={true}>
          </Permissions>
        </FileManager>

        <Popup
          maxHeight={600}
          closeOnOutsideClick={true}
          title={this.state.imageItemToDisplay.name}
          visible={this.state.popupVisible}

          className="content">

          <img src={this.state.imageItemToDisplay.url} className="content" />
        </Popup>
      </div>
    );
  }
}

export default App;
