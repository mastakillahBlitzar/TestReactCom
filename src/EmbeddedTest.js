/* eslint-disable no-undef */
import React from "react";

function EmbeddedTest() {
  let [bridge, setBridge] = React.useState(null);
  let [name, setName] = React.useState(null);
  let [log, setLog] = React.useState(null);

  let callback = (arg, intArg) => {
    setLog(
      (prev) =>
        (prev ? prev : "") +
        `javascript callback called with:  ${arg}, secondParam: ${intArg}\n`
    );

    return true;
  };

  React.useEffect(() => {
    if (chrome?.webview?.hostObjects?.bridge) {
      const bridge = chrome.webview.hostObjects.bridge;
      setName(chrome.webview.hostObjects.sync.bridge.Name);

      bridge.NativeFunction("Start Callback").then((value) => {
        setLog(
          (prev) =>
            (prev ? prev : "") + `Calling native function done:  ${value}\n`
        );
      });

      bridge.NativeFunctionWithCallBack(callback).then((value) => {
        setLog(
          (prev) =>
            (prev ? prev : "") +
            `Calling native with callback function done:  ${value}\n`
        );
      });

      setBridge(bridge);
    }

    if (window.CefSharp) {
      async function startBridge() {
        await CefSharp.BindObjectAsync("bridge");

        setName(await window.bridge.getName());

        let value = await window.bridge.nativeFunction("This is a test");
        setLog(
          (prev) =>
            (prev ? prev : "") + `Calling native function done:  ${value}\n`
        );
        let value2 = await window.bridge.nativeFunctionWithCallBack(callback);

        setLog(
          (prev) =>
            (prev ? prev : "") +
            `Calling native with callback function done:  ${value2}\n`
        );
      }

      startBridge();
    }
  }, []);

  return (
    <>
      {" "}
      <h1>This is an embedded test</h1>
      {name && <h2>Embedded framework name: {name}</h2>}
      {log && (
        <h3 class="log">
          <pre>{log}</pre>
        </h3>
      )}
    </>
  );
}

export default EmbeddedTest;
