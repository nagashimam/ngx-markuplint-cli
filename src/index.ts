#!/usr/bin/env node

import { runMarkuplintAgainstTemplateFile } from "ngx-html-bridge-markuplint";

const files: string[] = process.argv.slice(2);

if (!files || files.length < 1) {
	console.error("Please provide a file or glob pattern.");
	process.exit(1);
}

let hasViolation = false;

const run = async () => {
	const promises = files.map(async (file: string) => {
		const rawResults = await runMarkuplintAgainstTemplateFile(file);
		return rawResults.map((result) => {
			const html = result.variation.plain;
			const violations = result.violations;
			if (violations.length > 0) {
				hasViolation = true;
			}
			return {
				html,
				violations,
				file,
			};
		});
	});
	const results = await Promise.all(promises);
	console.log(JSON.stringify(results));
	const exitCode = hasViolation ? 3 : 0;
	process.exit(exitCode);
};

try {
	run();
} catch (err) {
	console.error(err);
	process.exit(2);
}
