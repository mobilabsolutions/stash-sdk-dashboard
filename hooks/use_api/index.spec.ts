import { apiCall, oauthApi, Method } from '.'
import { FetchMock } from 'jest-fetch-mock'

const fetchMock = fetch as FetchMock
const TOKEN = 'f726h8-239hr02847hf-3720f'
const refresh = () =>
  oauthApi('/api/v1/oauth/token', {
    grant_type: 'refresh_token',
    client_id: 'payment-dashboard-client',
    refresh_token: 'refresh-frneyvfuwiybvqi837he0138'
  }).then(({ access_token }) => {
    return access_token
  })
const PATH = 'get/fake/data'
const CONTENT = {
  fake: 'data',
  more: 'fake data'
}

describe('Api flow', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  test('should GET the data', async () => {
    expect.assertions(1)
    fetchMock.mockResponse(JSON.stringify({ any: 'data' }))
    const resp = await apiCall(TOKEN, refresh, Method.GET, PATH, CONTENT)
    expect(resp).toMatchSnapshot()
  })

  test('should reconnect and GET the data', async () => {
    expect.assertions(2)
    const mockedRefresh = jest.fn(refresh)

    /** Responses:
     * 1. First the call fails with 401
     * 2. Then a call is done to renew the access token
     * 3. The first call is done again but with the new token
     */
    fetchMock.mockResponses(
      [JSON.stringify({ message: 'Access Not' }), { status: 401 }],
      [
        JSON.stringify({
          access_token: 'new_acces_t',
          refresh_token: 'new_refresh_t'
        }),
        { status: 200 }
      ],
      [JSON.stringify({ any: 'data' }), { status: 200 }]
    )
    const resp = await apiCall(TOKEN, mockedRefresh, Method.GET, PATH, CONTENT)
    expect(fetchMock).toHaveBeenLastCalledWith('get/fake/data', {
      body: '{"fake":"data","more":"fake data"}',
      credentials: 'include',
      headers: {
        Authorization: 'Bearer new_acces_t',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    expect(resp).toMatchSnapshot()
  })
})
