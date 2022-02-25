import { filterByTypes, orderByName, orderByScore} from '../Redux/actions'

describe("Action Creators", () => {
  it('Debería retornar una action con las propiedades type "FILTER_TYPES" y payload: Este contiene lo que recibe como argumento la funcion', () => {
    const payload = { title: "ejercicio" };
    expect(filterByTypes(payload)).toEqual({
      type: "FILTER_TYPES",
      payload
    });
  });
  it('Debería retornar una action con las propiedades type "ORDER_NAME" y payload, su valor lo recibe por argumento:', () => {
    expect(orderByName(2)).toEqual({
      type: "ORDER_NAME",
      payload: 2,
    });
  });
  it('Debería retornar una action con las propiedades type "ORDER_SCORE" y payload, su valor lo recibe por argumento:', () => {
    expect(orderByScore(3)).toEqual({
      type: "ORDER_SCORE",
      payload: 3,
    });
  });
});