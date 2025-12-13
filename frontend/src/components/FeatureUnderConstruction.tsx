import Image from 'next/image'

export default function FeatureUnderConstruction() {
	return (
		<div className="w-full max-w-md mx-auto p-6 flex flex-col items-center text-center">
			<div className="relative w-full aspect-video mb-6 group">
				<div className="absolute inset-0 bg-purple-600 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>

				<div className="relative rounded-2xl overflow-hidden border border-[#2d2f45] shadow-2xl">
					<Image
						src="/mascot-wip.png"
						alt="Coding Cat"
						width={200}
						height={200}
						className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
					/>
				</div>
			</div>

			<h3 className="text-xl font-bold text-white mb-2">
				The feature is under development!
			</h3>

			<p className="text-gray-400 text-sm mb-6 leading-relaxed">
				The Wizard Cat is coding day and night to perfect this feature.
				Please check back later!
			</p>

			<div className="bg-[#1e2036] border border-[#4f4d8c] rounded-xl p-4 w-full relative overflow-hidden">
				<div className="absolute top-0 left-0 bg-[#4f4d8c] px-2 py-1 rounded-br-lg text-[10px] font-bold text-white tracking-wider">
					IDIOM OF THE DAY
				</div>

				<div className="mt-2">
					<p className="text-lg font-bold text-purple-300 font-serif italic">
						&quot;Rome wasn&apos;t built in a day&quot;
					</p>
					<div className="h-px w-16 bg-gray-600 mx-auto my-2"></div>

					<p className="text-xs text-gray-500 mt-1">
						Meaning: Big things take time to accomplish.
					</p>
				</div>
			</div>
		</div>
	)
}
