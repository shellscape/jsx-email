import { render } from '../src';

import { Preview } from './fixtures/preview';
import { Template } from './fixtures/template';

import AirbnbEmail from '../../../apps/demo/emails/airbnb-review';
import PlaidEmail from '../../../apps/demo/emails/plaid-verify-identity';
import VercelEmail from '../../../apps/demo/staged/vercel-invite-user';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('converts a React component into HTML', () => {
    const result = render(<Template firstName="Jim" />);
    expect(result).toMatchSnapshot();
  });

  it('converts a React component into PlainText', () => {
    const result = render(<Template firstName="Jim" />, { plainText: true });
    expect(result).toMatchSnapshot();
  });

  it('converts to plain text and removes reserved ID', () => {
    const result = render(<Preview />, { plainText: true });
    expect(result).toMatchSnapshot();
  });

  it('renders the airbnb demo template', () => {
    expect(render(<AirbnbEmail />)).toMatchSnapshot();
    expect(render(<AirbnbEmail />, { pretty: true })).toMatchSnapshot();
  });

  it('renders the plaid demo template', () => {
    expect(render(<PlaidEmail />)).toMatchSnapshot();
    expect(render(<PlaidEmail />, { pretty: true })).toMatchSnapshot();
  });

  it('renders the vercel demo template', () => {
    expect(render(<VercelEmail />)).toMatchSnapshot();
    expect(render(<VercelEmail />, { pretty: true })).toMatchSnapshot();
  });
});
