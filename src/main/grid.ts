import { BANDE, COLOSSE, HEROS, HOSTILE, INITIE, PATRON, PATRON_COLOSSE, RECRUE, SALOPARD } from './Npc';

const GRID = {
	[HOSTILE]: {
		[RECRUE]: {
			"aspects": {
				"min": 12,
				"max": 24,
				"limit": 8
			},
			"aspects_exceptionals": {
				"min": 2,
				"max": 6,
				"limit": 3,
				"major_min": 0,
				"major_max": 0
			},
			"health": {
				"min": 1,
				"max": 30
			},
			"armor": {
				"min": 0,
				"max": 0
			},
			"forcefield": {
				"min": 0,
				"max": 0
			},
			"shield": {
				"min": 0,
				"max": 0
			},
			"energy": {
				"min": 10,
				"max": 10
			},
      "resilience": 0,
			"capacities": 2
		},
		[INITIE]: {
			"aspects": {
				"min": 25,
				"max": 42,
				"limit": 12
			},
			"aspects_exceptionals": {
				"min": 3,
				"max": 8,
				"limit": 6,
				"major_min": 0,
				"major_max": 0
			},
			"health": {
				"min": 30,
				"max": 60
			},
			"armor": {
				"min": 1,
				"max": 10
			},
			"forcefield": {
				"min": 5,
				"max": 5
			},
			"shield": {
				"min": 5,
				"max": 5
			},
			"energy": {
				"min": 20,
				"max": 20
			},
      "resilience": 0,
			"capacities": 3
		},
		[HEROS]: {
			"aspects": {
				"min": 43,
				"max": 52,
				"limit": 14
			},
			"aspects_exceptionals": {
				"min": 9,
				"max": 15,
				"limit": 9,
				"major_min": 1,
				"major_max": 1
			},
			"health": {
				"min": 40,
				"max": 80
			},
			"armor": {
				"min": 10,
				"max": 40
			},
			"forcefield": {
				"min": 10,
				"max": 10
			},
			"shield": {
				"min": 10,
				"max": 10
			},
			"energy": {
				"min": 20,
				"max": 40
			},
      "resilience": 0,
			"capacities": 5
		}
	},
	[SALOPARD]: {
		[RECRUE]: {
			"aspects": {
				"min": 33,
				"max": 40,
				"limit": 12
			},
			"aspects_exceptionals": {
				"min": 7,
				"max": 13,
				"limit": 6,
				"major_min": 1,
				"major_max": 1
			},
			"health": {
				"min": 60,
				"max": 100
			},
			"armor": {
				"min": 0,
				"max": 40
			},
			"forcefield": {
				"min": 5,
				"max": 5
			},
			"shield": {
				"min": 0,
				"max": 0
			},
			"energy": {
				"min": 20,
				"max": 30
			},
      "resilience": 0,
			"capacities": 3
		},
		[INITIE]: {
			"aspects": {
				"min": 41,
				"max": 52,
				"limit": 14
			},
			"aspects_exceptionals": {
				"min": 8,
				"max": 16,
				"limit": 8,
				"major_min": 1,
				"major_max": 1
			},
			"health": {
				"min": 100,
				"max": 150
			},
			"armor": {
				"min": 40,
				"max": 60
			},
			"forcefield": {
				"min": 10,
				"max": 10
			},
			"shield": {
				"min": 5,
				"max": 10
			},
			"energy": {
				"min": 30,
				"max": 50
			},
      "resilience": 0,
			"capacities": 4
		},
		[HEROS]: {
			"aspects": {
				"min": 52,
				"max": 70,
				"limit": 16
			},
			"aspects_exceptionals": {
				"min": 9,
				"max": 19,
				"limit": 10,
				"major_min": 2,
				"major_max": 2
			},
			"health": {
				"min": 150,
				"max": 300
			},
			"armor": {
				"min": 60,
				"max": 100
			},
			"forcefield": {
				"min": 15,
				"max": 30
			},
			"shield": {
				"min": 15,
				"max": 20
			},
			"energy": {
				"min": 50,
				"max": 100
			},
      "resilience": 0,
			"capacities": 6
		}
	},
	[PATRON]: {
		[RECRUE]: {
			"aspects": {
				"min": 52,
				"max": 70,
				"limit": 20
			},
			"aspects_exceptionals": {
				"min": 12,
				"max": 37,
				"limit": 10,
				"major_min": 2,
				"major_max": 4
			},
			"health": {
				"min": 160,
				"max": 600
			},
			"armor": {
				"min": 40,
				"max": 100
			},
			"forcefield": {
				"min": 10,
				"max": 10
			},
			"shield": {
				"min": 10,
				"max": 10
			},
			"energy": {
				"min": 10,
				"max": 50
			},
      "resilience": 0.033,
			"capacities": 5
		},
		[INITIE]: {
			"aspects": {
				"min": 71,
				"max": 90,
				"limit": 20
			},
			"aspects_exceptionals": {
				"min": 18,
				"max": 45,
				"limit": 10,
				"major_min": 2,
				"major_max": 4
			},
			"health": {
				"min": 300,
				"max": 700
			},
			"armor": {
				"min": 100,
				"max": 200
			},
			"forcefield": {
				"min": 10,
				"max": 20
			},
			"shield": {
				"min": 10,
				"max": 30
			},
			"energy": {
				"min": 50,
				"max": 100
			},
      "resilience": 0.05,
			"capacities": 7
		},
		[HEROS]: {
			"aspects": {
				"min": 90,
				"max": 100,
				"limit": 20
			},
			"aspects_exceptionals": {
				"min": 25,
				"max": 50,
				"limit": 10,
				"major_min": 3,
				"major_max": 5
			},
			"health": {
				"min": 400,
				"max": 1000
			},
			"armor": {
				"min": 150,
				"max": 300
			},
			"forcefield": {
				"min": 20,
				"max": 50
			},
			"shield": {
				"min": 20,
				"max": 40
			},
			"energy": {
				"min": 100,
				"max": 200
			},
      "resilience": 0.1,
			"capacities": 9
		}
	},
	[PATRON_COLOSSE]: {
		[RECRUE]: {
			"aspects": {
				"min": 52,
				"max": 70,
				"limit": 20
			},
			"aspects_exceptionals": {
				"min": 12,
				"max": 37,
				"limit": 10,
				"major_min": 2,
				"major_max": 4
			},
			"health": {
				"min": 160,
				"max": 600
			},
			"armor": {
				"min": 40,
				"max": 100
			},
			"forcefield": {
				"min": 10,
				"max": 10
			},
			"shield": {
				"min": 10,
				"max": 10
			},
			"energy": {
				"min": 10,
				"max": 50
			},
      "resilience": 0.1,
			"capacities": 5
		},
		[INITIE]: {
			"aspects": {
				"min": 71,
				"max": 90,
				"limit": 20
			},
			"aspects_exceptionals": {
				"min": 18,
				"max": 45,
				"limit": 10,
				"major_min": 2,
				"major_max": 4
			},
			"health": {
				"min": 300,
				"max": 700
			},
			"armor": {
				"min": 100,
				"max": 200
			},
			"forcefield": {
				"min": 10,
				"max": 20
			},
			"shield": {
				"min": 10,
				"max": 30
			},
			"energy": {
				"min": 50,
				"max": 100
			},
      "resilience": 0.2,
			"capacities": 7
		},
		[HEROS]: {
			"aspects": {
				"min": 90,
				"max": 100,
				"limit": 20
			},
			"aspects_exceptionals": {
				"min": 25,
				"max": 50,
				"limit": 10,
				"major_min": 3,
				"major_max": 5
			},
			"health": {
				"min": 400,
				"max": 1000
			},
			"armor": {
				"min": 150,
				"max": 300
			},
			"forcefield": {
				"min": 20,
				"max": 50
			},
			"shield": {
				"min": 20,
				"max": 40
			},
			"energy": {
				"min": 100,
				"max": 200
			},
      "resilience": 0.3,
			"capacities": 9
		}
	},
	[BANDE]: {
		[RECRUE]: {
			"aspects": {
				"min": 18,
				"max": 37,
				"limit": 10
			},
			"aspects_exceptionals": {
				"min": 0,
				"max": 8,
				"limit": 8,
				"major_min": 1,
				"major_max": 1
			},
			"health": {
				"min": 50,
				"max": 150
			},
			"armor": {
				"min": 0,
				"max": 0
			},
			"forcefield": {
				"min": 0,
				"max": 0
			},
			"shield": {
				"min": 0,
				"max": 0
			},
			"energy": {
				"min": 0,
				"max": 0
			},
      "resilience": 0,
			"capacities": 2,
			"outbreak": {
				"min": 4,
				"max": 9,
				"effects_min": 0,
				"effects_max": 1
			}
		},
		[INITIE]: {
			"aspects": {
				"min": 38,
				"max": 46,
				"limit": 12
			},
			"aspects_exceptionals": {
				"min": 0,
				"max": 10,
				"limit": 8,
				"major_min": 1,
				"major_max": 1
			},
			"health": {
				"min": 200,
				"max": 400
			},
			"armor": {
				"min": 0,
				"max": 0
			},
			"forcefield": {
				"min": 0,
				"max": 0
			},
			"shield": {
				"min": 0,
				"max": 0
			},
			"energy": {
				"min": 0,
				"max": 0
			},
      "resilience": 0,
			"capacities": 3,
			"outbreak": {
				"min": 8,
				"max": 12,
				"effects_min": 1,
				"effects_max": 2
			}
		},
		[HEROS]: {
			"aspects": {
				"min": 39,
				"max": 56,
				"limit": 15
			},
			"aspects_exceptionals": {
				"min": 4,
				"max": 18,
				"limit": 8,
				"major_min": 1,
				"major_max": 2
			},
			"health": {
				"min": 400,
				"max": 600
			},
			"armor": {
				"min": 0,
				"max": 0
			},
			"forcefield": {
				"min": 5,
				"max": 10
			},
			"shield": {
				"min": 5,
				"max": 10
			},
			"energy": {
				"min": 0,
				"max": 0
			},
      "resilience": 0,
			"capacities": 5,
			"outbreak": {
				"min": 8,
				"max": 15,
				"effects_min": 2,
				"effects_max": 4
			}
		}
	},
	[COLOSSE]: {
		[RECRUE]: {
			"aspects": {
				"min": 28,
				"max": 37,
				"limit": 14
			},
			"aspects_exceptionals": {
				"min": 4,
				"max": 10,
				"limit": 8,
				"major_min": 1,
				"major_max": 1
			},
			"health": {
				"min": 100,
				"max": 200
			},
			"armor": {
				"min": 20,
				"max": 40
			},
			"forcefield": {
				"min": 0,
				"max": 0
			},
			"shield": {
				"min": 0,
				"max": 0
			},
			"energy": {
				"min": 0,
				"max": 0
			},
      "resilience": 0.1,
			"capacities": 2
		},
		[INITIE]: {
			"aspects": {
				"min": 38,
				"max": 52,
				"limit": 16
			},
			"aspects_exceptionals": {
				"min": 10,
				"max": 20,
				"limit": 10,
				"major_min": 2,
				"major_max": 2
			},
			"health": {
				"min": 200,
				"max": 400
			},
			"armor": {
				"min": 30,
				"max": 50
			},
			"forcefield": {
				"min": 5,
				"max": 5
			},
			"shield": {
				"min": 5,
				"max": 10
			},
			"energy": {
				"min": 10,
				"max": 50
			},
      "resilience": 0.2,
			"capacities": 4
		},
		[HEROS]: {
			"aspects": {
				"min": 52,
				"max": 70,
				"limit": 18
			},
			"aspects_exceptionals": {
				"min": 20,
				"max": 30,
				"limit": 10,
				"major_min": 3,
				"major_max": 3
			},
			"health": {
				"min": 400,
				"max": 600
			},
			"armor": {
				"min": 50,
				"max": 100
			},
			"forcefield": {
				"min": 10,
				"max": 10
			},
			"shield": {
				"min": 10,
				"max": 20
			},
			"energy": {
				"min": 50,
				"max": 100
			},
      "resilience": 0.3,
			"capacities": 6
		}
	}
};

export default GRID;