import { Ai } from "@cloudflare/ai";
/**
 * To implement
 *
 * - [x] handle API request
 * - [x] create db structure
 * - [x] add new task
 * - [x] persist notes to db
 * - [x] list notes
 * - generate categories
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method === "POST") {
			const body = await request.json<{ description: string }>();

			console.log("[ai]");
			const ai = new Ai(env.AI);
			const messages = [
				{
					role: "system",
					content:
						"Hello,You are a Categorizer assistent. I'll pass you a task, and you will return a list of 2 or 3 categories for it. BE BRIEF, RETURN ONLY THE CATEGORIES COMMA-SEPARATED VALUES!",
				},
				{ role: "user", content: body.description },
			];

			const inputs = { messages };
			const aiRes = await ai.run("@cf/meta/llama-3-8b-instruct", inputs);

			// generated categories
			const categories = aiRes.response;

			const res = await env.DB.prepare(
				"INSERT INTO tasks (description, categories) VALUES (?, ?)",
			)
				.bind(body.description, categories)
				.run();

			if (!res.success) {
				return new Response("Failed to create task", { status: 400 });
			}

			return new Response("Task created", { status: 201 });
		}

		const tasksRes = await env.DB.prepare("SELECT * FROM tasks").all();
		if (!tasksRes.success) {
			return new Response("Failed to create task", { status: 400 });
		}

		const tasks = tasksRes.results;
		const output = JSON.stringify(tasks, null, 2);

		return new Response(output, {
			headers: {
				"Content-Type": "application/json",
			},
		});
	},
} satisfies ExportedHandler<Env>;
