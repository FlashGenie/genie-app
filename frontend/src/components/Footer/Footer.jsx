const Footer = () => {
	return (
		<footer className="w-screen bg-white">
			<div className="w-full mx-auto p-4 py-8">
				<hr className="my-8 border-gray-200 mx-6" />
				<div className="flex items-center justify-between mx-12">
					<a href="#" className="flex items-center mb-0 space-x-2">
						<span className="self-center text-2xl font-sans font-bold">Genie.</span>
					</a>
					<span className="block text-sm text-gray-500 text-center">© 2024 <a href="#" className="hover:underline">Genie</a>. All Rights Reserved.</span>
				</div>
			</div>
		</footer>
	);
}

export default Footer;