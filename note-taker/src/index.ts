/**
 * To implement
 *
 * - [x] handle API request
 * - [x] create db structure
 * - add new note
 * - generate categories
 * - persist notes to db
 * - list notes
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method === "POST") {
			env.DB.prepare;

			return new Response("Create note");
		}

		return new Response("list notes");
	},
} satisfies ExportedHandler<Env>;
