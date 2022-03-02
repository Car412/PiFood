import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Card from "../Components/Card"

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  describe("Card debe renderizar", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <Card
          name="prueba"
          img="prueba"          
          diets={["prueba"]}
        />
      );
    });
    it("Renderiza un div", () => {
      expect(wrapper.find("div")).toHaveLength(1);
    });
    it("Renderiza un h2", () => {
      expect(wrapper.find("h2")).toHaveLength(1);
    });

    it("Renderiza una imagen", () => {
      expect(wrapper.find("img")).toHaveLength(1);
    });
  });
});