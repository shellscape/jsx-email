import { render } from 'jsx-email';

import { Template } from './templates/email';

export default {
	async fetch(request, env, ctx): Promise<Response> {
    const result = await render(<Template email={'batman'} name={'batman'} />, { pretty: true });
		return new Response(result);
	},
} satisfies ExportedHandler<Env>;
