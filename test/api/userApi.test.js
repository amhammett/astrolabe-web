import * as userApi from '../../src/api/userApi';

describe('api user calls', () => {
  test('visitedGet disabled api feature', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    const setSyncingMock = jest.fn();

    userApi.visitedGet(setSyncingMock);

    expect(getItemSpy).not.toBeCalled();
    expect(setSyncingMock).toBeCalledWith(false);
  });

  test('visitedPut disabled api feature', () => {
    const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
    const setHasChangesMock = jest.fn();
    const visited = [];

    userApi.visitedPut(visited, setHasChangesMock);

    expect(setItemMock).toBeCalled();
    expect(setHasChangesMock).toBeCalledWith(false);
  });
});
