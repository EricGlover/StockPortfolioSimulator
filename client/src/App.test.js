// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
//
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

//configure enzyme for React 16
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, render } from "enzyme";
import App from "./App";

it("renders without crashing", () => {
  shallow(<App />);
});
