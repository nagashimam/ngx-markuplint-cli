#!/usr/bin/env node

import { runMarkuplintAgainstTemplateFile } from "ngx-html-bridge-markuplint";
import { readFileSync } from "node:fs";

const files: string[] = process.argv.slice(2);

if (!files || files.length < 1) {
	console.error("Please provide a file or glob pattern.");
	process.exit(1);
}

const run = async () => {
	const settingsJson = readFileSync("./.vscode/settings.json", "utf8");
	const settings = JSON.parse(settingsJson);
	const includedAttributes = settings?.ngxMarkuplint
		? settings.ngxMarkuplint.includedAttributes
		: settings["ngxMarkuplint.includedAttributes"];

	const results: { file: string; violations: any[] }[] = [];
	for (const file of files) {
		const rawResults = await runMarkuplintAgainstTemplateFile(file, {
			includedAttributes,
		});
		rawResults
			.map((result) => {
				const violations = result.violations.map(
					(violation) => (violation as any).message,
				);
				return {
					violations,
					file,
				};
			})
			.forEach((formattedResult) => results.push(formattedResult));
	}
	console.log(JSON.stringify({ results }));
	const exitCode = results.length > 0 ? 3 : 0;
	process.exit(exitCode);
};

try {
	run();
} catch (err) {
	console.error(err);
	process.exit(2);
}
