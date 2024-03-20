"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { z } from "zod";

const searchParamsSchema = z.object({
	q: z.string().min(1).optional().default("").catch(""),
});

interface SearchResult {
	name: string;
	url: string;
}

interface SearchProps {
	searchParams: Record<string, Array<string> | string>;
}

export function Search(props: SearchProps): ReactNode {
	const { searchParams } = props;

	const filters = searchParamsSchema.parse(searchParams);

	const [searchResults, setSearchResults] = useState<Array<SearchResult>>([]);

	useEffect(() => {
		let isCanceled = false;

		async function fetchData(searchTerm: string) {
			const response = await fetch(` https://swapi.dev/api/people/?search=${searchTerm}`);

			if (response.ok) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const data = await response.json();
				if (!isCanceled) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
					setSearchResults(data.results);
				}
			}
		}

		void fetchData(filters.q);

		return () => {
			isCanceled = true;
		};
	}, [filters.q]);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		function onChangeColorScheme() {
			alert("COLOR SCHEME CHANGED");
		}

		mediaQuery.addEventListener("change", onChangeColorScheme);

		return () => {
			mediaQuery.removeEventListener("change", onChangeColorScheme);
		};
	}, []);

	const router = useRouter();

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		// @ts-expect-error No file inputs in form.
		const newSearchParams = new URLSearchParams(formData);

		router.push("?" + String(newSearchParams));
	}

	return (
		<section>
			<form onSubmit={onSubmit}>
				<label>
					<div>Search term</div>
					<input
						className="rounded-md border border-black px-3 py-1 shadow"
						defaultValue={filters.q}
						name="q"
					/>
				</label>

				<button type="submit">Submit</button>
			</form>

			<div>
				<ul role="list">
					{searchResults.map((searchResult) => {
						return (
							<li key={searchResult.url}>
								<article>
									<span>{searchResult.name}</span>
								</article>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
