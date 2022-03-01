import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from 'enzyme';

import Home from '../Components/Home';
import SearchBar from "../Components/SearchBar";


configure({ adapter: new Adapter() });

describe("<Home />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it("deberia renderizar 1 componente <SearchBar />", () => {
    expect(wrapper.find(SearchBar)).toHaveLength(1);
  });

  it('El componente SearchBar deberia recibir como prop className con el valor "estilos.boton1"', () => {
    expect(wrapper.contains(<SearchBar className="estilos.boton1" />)).toEqual(true);
  });
});