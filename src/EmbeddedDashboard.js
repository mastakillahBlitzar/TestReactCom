import React from "react";

const { SisenseFrame, enums } = window["sisense.embed"];

class EmbeddedDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.iframe_ref = React.createRef();
  }

  checkSisense() {
    if (!this.sisenseFrame) {
      this.sisenseFrame = new SisenseFrame({
        // Sisense application URL, including protocol and port if required
        url: "https://commure.sisensepoc.com",
        // OID of dashboard to load initially
        dashboard: "5ff7547aaf6bc2002b4f7f78",
        // Which panels to show in the iFrame
        settings: {
          showToolbar: false,
          showLeftPane: false,
          showRightPane: false,
        },
        // Existing iFrame DOM element
        element: this.iframe_ref.current,
      });

      this.sisenseFrame.render().then(() => {
        debugger;
        console.log("Sisense iFrame ready!");
      });
    }
  }

  componentDidMount() {
    this.checkSisense();
  }

  render() {
    return <iframe id="sisense-iframe" ref={this.iframe_ref}></iframe>;
  }
}

export default EmbeddedDashboard;
