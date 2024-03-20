import { Search } from "@/components/search";

interface IndexPageProps {
	searchParams: Record<string, Array<string> | string>;
}

export default function IndexPage(props: IndexPageProps) {
	const { searchParams } = props;

	return (
		<main className="mx-auto grid w-full max-w-screen-md content-start gap-8 p-8">
			<h1>StarWars Search</h1>
			<Search searchParams={searchParams} />
		</main>
	);
}
