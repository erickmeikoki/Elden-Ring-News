"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

interface StatAllocation {
	vigor: number;
	mind: number;
	endurance: number;
	strength: number;
	dexterity: number;
	intelligence: number;
	faith: number;
	arcane: number;
}

const BUILD_TYPES = {
	"Pure Strength": "Focus on heavy weapons and high physical damage",
	"Quality": "Balanced strength and dexterity for weapon variety",
	"Dexterity": "Fast weapons and good casting speed",
	"Intelligence": "Sorceries and magic weapons",
	"Faith": "Incantations and holy weapons",
	"Bleed": "Blood loss build with arcane scaling",
	"Paladin": "Strength and faith hybrid",
	"Spellblade": "Intelligence and dexterity hybrid"
} as const;

const STARTING_STATS: StatAllocation = {
	vigor: 10,
	mind: 10,
	endurance: 10,
	strength: 10,
	dexterity: 10,
	intelligence: 10,
	faith: 10,
	arcane: 10
};

export default function BuildCalculator() {
	const [step, setStep] = useState<1 | 2 | 3>(1);
	const [selectedBuild, setSelectedBuild] = useState<
		keyof typeof BUILD_TYPES | null
	>(null);
	const [targetLevel, setTargetLevel] = useState<number>(120);
	const [stats, setStats] = useState<StatAllocation>(STARTING_STATS);
	const { resolvedTheme } = useTheme();

	const calculateStats = (
		build: keyof typeof BUILD_TYPES,
		level: number
	): StatAllocation => {
		const remainingLevels = level - 79; // 79 is the total of starting stats (10 * 8) - 1 for starting level
		let allocation: StatAllocation = { ...STARTING_STATS };

		switch (build) {
			case "Pure Strength":
				allocation = {
					vigor: Math.min(60, 40 + Math.floor(remainingLevels * 0.2)),
					mind: 10,
					endurance: Math.min(40, 25 + Math.floor(remainingLevels * 0.1)),
					strength: Math.min(80, 50 + Math.floor(remainingLevels * 0.5)),
					dexterity: 16,
					intelligence: 10,
					faith: 10,
					arcane: 10
				};
				break;
			case "Quality":
				allocation = {
					vigor: Math.min(60, 40 + Math.floor(remainingLevels * 0.2)),
					mind: 10,
					endurance: Math.min(40, 25 + Math.floor(remainingLevels * 0.1)),
					strength: Math.min(55, 40 + Math.floor(remainingLevels * 0.3)),
					dexterity: Math.min(55, 40 + Math.floor(remainingLevels * 0.3)),
					intelligence: 10,
					faith: 10,
					arcane: 10
				};
				break;
			case "Intelligence":
				allocation = {
					vigor: Math.min(50, 35 + Math.floor(remainingLevels * 0.2)),
					mind: Math.min(40, 30 + Math.floor(remainingLevels * 0.2)),
					endurance: 20,
					strength: 16,
					dexterity: 12,
					intelligence: Math.min(80, 60 + Math.floor(remainingLevels * 0.4)),
					faith: 10,
					arcane: 10
				};
				break;
			// Add more build types here...
			default:
				allocation = { ...STARTING_STATS };
		}

		return allocation;
	};

	const handleBuildSelect = (build: keyof typeof BUILD_TYPES) => {
		setSelectedBuild(build);
		setStep(2);
	};

	const handleLevelSelect = (level: number) => {
		setTargetLevel(level);
		if (selectedBuild) {
			setStats(calculateStats(selectedBuild, level));
		}
		setStep(3);
	};

	return (
		<main className="min-h-screen bg-white dark:bg-gray-900">
			<header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex items-center h-14">
						<Link href="/" className="flex items-center gap-2">
							<div className="relative w-8 h-8">
								<Image
									src="/images/EldenringLogo.jpg"
									alt="Elden Ring Logo"
									fill
									className="object-contain"
									priority
								/>
							</div>
							<h1 className="text-xl font-bold text-gray-900 dark:text-white">
								Build Calculator
							</h1>
						</Link>
					</div>
				</div>
			</header>

			<div className="max-w-4xl mx-auto px-4 py-8">
				<div className="space-y-8">
					{/* Step 1: Build Selection */}
					<div className={step === 1 ? "block" : "hidden"}>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
							Choose Your Build Type
						</h2>
						<div className="grid gap-4 sm:grid-cols-2">
							{Object.entries(BUILD_TYPES).map(([build, description]) => (
								<button
									key={build}
									onClick={() =>
										handleBuildSelect(build as keyof typeof BUILD_TYPES)
									}
									className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-800 transition-colors"
								>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										{build}
									</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
										{description}
									</p>
								</button>
							))}
						</div>
					</div>

					{/* Step 2: Level Selection */}
					<div className={step === 2 ? "block" : "hidden"}>
						<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
							Select Target Level
						</h2>
						<div className="space-y-4">
							{[120, 150, 180].map((level) => (
								<button
									key={level}
									onClick={() => handleLevelSelect(level)}
									className="w-full p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-800 transition-colors"
								>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										Level {level}
									</h3>
									<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
										{level === 120
											? "PvP Meta Level"
											: level === 150
											? "High Level PvE/PvP"
											: "End Game PvE"}
									</p>
								</button>
							))}
						</div>
					</div>

					{/* Step 3: Stats Display */}
					<div className={step === 3 ? "block" : "hidden"}>
						<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
									{selectedBuild} Build
								</h2>
								<span className="text-lg text-gray-500 dark:text-gray-400">
									Level {targetLevel}
								</span>
							</div>
							<div className="grid gap-4 sm:grid-cols-2">
								{Object.entries(stats).map(([stat, value]) => (
									<div
										key={stat}
										className="flex justify-between items-center p-3 rounded bg-gray-50 dark:bg-gray-700"
									>
										<span className="text-gray-700 dark:text-gray-300 capitalize">
											{stat}
										</span>
										<span className="text-lg font-semibold text-gray-900 dark:text-white">
											{value}
										</span>
									</div>
								))}
							</div>
							<button
								onClick={() => setStep(1)}
								className="mt-6 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
							>
								Calculate Another Build
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
