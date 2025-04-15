/**
 * To implement
 *
 * - add new note
 *   - generate categories
 *   - persist notes to db
 * - create db structure
 * - list notes
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method === "POST") {
			return new Response("Create note");
		}

		return new Response("list notes");
	},
} satisfies ExportedHandler<Env>;
