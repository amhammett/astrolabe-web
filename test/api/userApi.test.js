import * as userApi from '../../src/api/userApi';

const mockFeatures = jest.fn();
jest.mock('../../src/config/settings', () => ({
  get features() {
    return mockFeatures();
  },
}));
const mockApi = jest.fn();
jest.mock('../../src/config/api', () => ({
  get visitedEndpoint() {
    return mockApi();
  },
}));
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ locations: { foo: 'bar' } }),
  })
);

afterEach(() => {
  jest.clearAllMocks();
});

describe('api disabled', () => {
  test('visitedGet disabled api feature', () => {
    mockFeatures.mockReturnValue({
      FEATURE_API_ENABLE: false,
    });
    mockApi.mockReturnValue('https://local.test/locations/user');
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    const setSyncingMock = jest.fn();

    userApi.visitedGet(setSyncingMock);

    expect(getItemSpy).not.toBeCalled();
    expect(setSyncingMock).toBeCalledWith(false);
  });

  test('visitedPut disabled api feature', () => {
    mockFeatures.mockReturnValue({
      FEATURE_API_ENABLE: false,
    });
    mockApi.mockReturnValue('https://local.test/locations/user');
    const setItemMock = jest.spyOn(Storage.prototype, 'setItem');
    const setHasChangesMock = jest.fn();
    const visited = [];

    userApi.visitedPut(visited, setHasChangesMock);

    expect(setItemMock).toBeCalled();
    expect(setHasChangesMock).toBeCalledWith(false);
  });
});
