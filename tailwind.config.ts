import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./app/**/*.@(css|ts|tsx)", "./components/**/*.@(css|ts|tsx)"],
};

export default config;
