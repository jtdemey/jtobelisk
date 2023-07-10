export const rollScenario = () => {
	const gen = (title, roles) => ({ title, roles });
  const scenarios = [
		gen('Animal Hospital', [
			'veterinarian',
			'anesthesiologist',
			'janitor',
			'surgeon',
			'receptionist',
			'biologist',
			'medical intern',
			'medical engineer',
			'pharmacologist',
			'nurse'
		]),
    gen('Bank Robbery', [
			'the mastermind',
			'the demolitionist',
			'the getaway driver',
			'the weapon specialist',
			'the technology specialist',
			'the vault-driller',
			'the distraction',
			'the recon specialist',
			'the hostage-taker',
			'the money bagger'
		]),
    gen('CIA Headquarters', [
			'the director',
			'war-planner',
			'loan maker',
			'tech support agent',
			'intelligence gatherer',
			'undercover agent',
			'internal affairs officer',
			'human resource agent',
			'analyst',
			'mole'
		]),
    gen('Diamond Mine', [
			'the mine Administrator',
			'geologist',
			'elevator engineer',
			'surveyor',
			'inspector',
			'miner',
			'documentary filmer',
			'geologist',
			'geologist',
			'researcher'
		]),
    gen('Jungle Safari', [
			'expeditionist',
			'biologist',
			'survivalist',
			'botanist',
			'hunter',
			'journalist',
			'explorer',
			'translator',
			'biologist',
			'photographer'
		]),
    gen('Polar Expedition', [
			'the head Researcher',
			'assistant Researcher',
			'meteorologist',
			'surveyor',
			'biologist',
			'journalist',
			'explorer',
			'researcher',
			'survivalist',
			'photographer'
		]),
    gen('Rich House Party', [
			'governor',
			'aristocrat',
			'snob',
			'entrepreneur',
			'duke',
			'duchess',
			'the monopoly guy',
			'overseer',
			'senator',
			'baron'
		]),
    gen('Forest Hobo Camp', [
			'hobo king',
			'drifter',
			'beggar',
			'hippie',
			'hobo',
			'drifter',
			'beggar',
			'homesteader',
			'farmer',
			'hobo'
		]),
    gen('Bandit Camp', [
			'interrogator',
			'executioner',
			'captain',
			'demolitionist',
			'mercenary',
			'thief',
			'bruiser',
			'prisoner of war',
			'captured journalist',
			'deserter'
		]),
    gen('Art Museum', [
			'art snob',
			'artist',
			'art admirer',
			'security guard',
			'curator',
			'art critic',
			'art collector',
			'tourist',
			'art enthusiast',
			'artist'
		]),
    gen('Movie Set', [
			'director',
			'actor',
			'producer',
			'makeup artist',
			'costume designer',
			'camera operator',
			'the celebrity cameo',
			'boom operator',
			'intern',
			'stunt double'
		]),
    gen('Psychiatric Hospital', [
			'doctor',
			'nurse',
			'nurse',
			'schizophrenic',
			'patient',
			'criminal',
			'psychiatrist',
			'guard',
			'guard',
			'patient'
		]),
    gen('Construction Site', [
			'foreman',
			'laborer',
			'operator',
			'inspector',
			'superintendent',
			'laborer',
			'operator',
			'laborer',
			'lost kid',
			'worker'
		]),
    gen('High Security Prison', [
			'serial killer',
			'guard',
			'guard',
			'robber',
			'jewel thief',
			'laborer',
			'overseer',
			'cook',
			'contraband trader',
			'hustler'
		]),
    gen('College Lecture Hall', [
			'professor',
			'student',
			'student',
			'student',
			'delinquent',
			'sleepy student',
			'slacker',
			'gamer',
			'weeb',
			`professor's pet`
		]),
    gen('Public Hanging', [
			'executioner',
			'accused',
			'accuser',
			'jeering peasant',
			'town crier',
			'priest',
			'king',
			'queen',
			'jester',
			'knight'
		]),
    gen('Cannabis Dispensary', [
			'bud tender',
			'old person',
			'stoner',
			'stoner',
			'employee',
			'patient',
			'ATM mechanic',
			'cannabis enthusiast',
			'patient',
			'cashier'
		]),
    gen('Open Heart Surgery', [
			'surgeon',
			'nurse',
			'surgeon',
			'anesthesiologist',
			'medical student',
			'medical student',
			'nurse',
			'surgical tech',
			'medical aid',
			'physician assistant'
		]),
    gen('Fight Club', [
			'the boss',
			'brawler',
			'kickboxer',
			'worker',
			'bouncer',
			'boxer',
			'martial artist',
			'veteran',
			'fighter',
			'grappler'
		]),
    gen('Rock Concert', [
			'guitarist',
			'drummer',
			'bassist',
			'singer',
			'lighting tech',
			'audio tech',
			'the band manager',
			'fan',
			'mosher',
			'raving fan'
		]),
    gen('Baptist Church', [
			'preacher',
			'old lady',
			'old man',
			'avid Christian',
			'acolyte',
			'choir singer',
			'the choir director',
			'the organist',
			'usher',
			'bored kid'
		])
  ];
  const conditions = [
    `everyone's injured`,
    `everyone's old`,
    `everyone has an indiscernable accent`,
    `everyone's sick`,
    `it's way too hot`,
    `it's way too cold`,
    `you forgot to do something important`,
    `it smells like shit`,
    `you're nearly deaf`,
    `everyone's tripping balls`,
    `there's a persistent, annoying humming sound`,
    `there's a roach infestation`
  ];
  const scenarioRes = scenarios[Math.floor(Math.random() * scenarios.length)];
  const conditionRes = conditions[Math.floor(Math.random() * conditions.length)];
  const scenarioList = scenarios.map(s => s.title);
  return {
    scenario: scenarioRes.title,
    scenarioList,
    condition: conditionRes,
    roles: scenarioRes.roles
  };
};