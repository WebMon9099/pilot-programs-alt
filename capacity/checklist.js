const checklist = [
    [
        "TURN LH GEN ON",
        "TURN LH BATT OFF",
        "TURN C3 OFF",
        "TURN C4 ON",
        "TURN C5 ON",
        "TURN RH BATT ON",
    ],
    [
        "TURN RH GEN ON",
        "TURN RH BATT OFF",
        "TURN C4 OFF",
        "TURN C3 ON",
        "TURN C5 ON",
        "TURN LH BATT ON",
    ],
    [
        "TURN RH STBY ON",
        "TURN C2 ON",
        "TURN C4 OFF",
        "TURN RH BATT OFF",
        "TURN C5 ON",
    ],
    [
        "LH STBY ON",
        "TURN C1 ON",
        "TURN C3 OFF",
        "TURN LH BATT OFF",
        "TURN C5 ON",
    ],
    [
        "TURN LH STBY ON",
        "TURN LH GEN OFF",
        "TURN C1 ON",
        "TURN C3 ON",
        "TURN LH BATT ON",
    ],
    [
        "TURN RH STBY ON",
        "TURN RH GEN OFF",
        "TURN C2 ON",
        "TURN C4 ON",
        "TURN RH BATT ON",
    ],
    [
        "TURN LH GEN ON",
        "TURN RH BATT ON",
        "TURN C1 ON",
        "TURN C3 OFF",
        "TURN C5 ON",
        "TURN C4 ON",
    ],
    [
        "TURN RH GEN ON",
        "TURN LH BATT ON",
        "TURN C2 ON",
        "TURN C4 OFF",
        "TURN C5 ON",
        "TURN C3 ON",
    ],
    [
        "TURN LH STBY ON",
        "TURN C1 ON",
        "TURN LH BATT ON",
        "TURN C3 ON",
        "TURN C5 ON",
    ],
    [
        "TURN RH STBY ON",
        "TURN C2 ON",
        "TURN RH BATT ON",
        "TURN C4 ON",
        "TURN C5 ON",
    ]
];

const waypointList = ["AWI", "AER", "BAQ", "CEF", "DGF", "EVY", "FGH", "GYR", "HLO", "ITE", "JAS"];

const q_frequencyList = [
    {txt: "Express Airways 101, change to frequency 131.450.", file: "131_450", val: {rad: 131, freq: 450}},
    {txt: "Express Airways 101, change to frequency 130.350.", file: "130_350", val: {rad: 130, freq: 350}},
    {txt: "Express Airways 101, change to frequency 129.950.", file: "129_950", val: {rad: 129, freq: 950}},
    {txt: "Express Airways 101, change to frequency 128.850.", file: "128_850", val: {rad: 128, freq: 850}},
    {txt: "Express Airways 101, change to frequency 127.750.", file: "127_750", val: {rad: 127, freq: 750}},
    {txt: "Express Airways 101, change to frequency 126.650.", file: "126_650", val: {rad: 126, freq: 650}},
    {txt: "Express Airways 101, change to frequency 125.550.", file: "125_550", val: {rad: 125, freq: 550}},
    {txt: "Express Airways 101, change to frequency 124.450.", file: "124_450", val: {rad: 124, freq: 450}},
    {txt: "Express Airways 101, change to frequency 123.350.", file: "123_350", val: {rad: 123, freq: 350}},
];

const q_waypointList = [
    {txt: "Express Airways 101, new waypoint is AWI.", file: "AWI", val: "AWI"},
    {txt: "Express Airways 101, new waypoint is AER.", file: "AER", val: "AER"},
    {txt: "Express Airways 101, new waypoint is BAQ.", file: "BAQ", val: "BAQ"},
    {txt: "Express Airways 101, new waypoint is CEF.", file: "CEF", val: "CEF"},
    {txt: "Express Airways 101, new waypoint is DGF.", file: "DGF", val: "DGF"},
    {txt: "Express Airways 101, new waypoint is EVY.", file: "EVY", val: "EVY"},
    {txt: "Express Airways 101, new waypoint is FGH.", file: "FGH", val: "FGH"},
    {txt: "Express Airways 101, new waypoint is GYR.", file: "GYR", val: "GYR"},
    {txt: "Express Airways 101, new waypoint is HLO.", file: "HLO", val: "HLO"},
    {txt: "Express Airways 101, new waypoint is ITE.", file: "ITE", val: "ITE"},
    {txt: "Express Airways 101, new waypoint is JAS.", file: "JAS", val: "JAS"},
];

const q_altitudeList = [
    {txt: "Express Airways 101, climb to 35,000 feet.", file: "climb_35000", val: 35000},
    {txt: "Express Airways 101, descend to 35,000 feet.", file: "descend_35000", val: 35000},
    {txt: "Express Airways 101, climb to 32,000 feet.", file: "climb_32000", val: 32000},
    {txt: "Express Airways 101, descend to 32,000 feet.", file: "descend_32000", val: 32000},
    {txt: "Express Airways 101, climb to 30,000 feet.", file: "climb_30000", val: 30000},
    {txt: "Express Airways 101, descend to 30,000 feet.", file: "descend_30000", val: 30000},
    {txt: "Express Airways 101, climb to 27,000 feet.", file: "climb_27000", val: 27000},
    {txt: "Express Airways 101, descend to 27,000 feet.", file: "descend_27000", val: 27000},
    {txt: "Express Airways 101, climb to 25,000 feet.", file: "climb_25000", val: 25000},
    {txt: "Express Airways 101, descend to 25,000 feet.", file: "descend_25000", val: 25000},
    {txt: "Express Airways 101, climb to 23,000 feet.", file: "climb_23000", val: 23000},
    {txt: "Express Airways 101, descend to 23,000 feet.", file: "descend_23000", val: 23000},
];

const q_ROList = [
    {txt: "Express Airways 101, calculate new rate of descent.\nNew altitude is 24,000 feet. Descent time is 2 minutes.", file: "rod_24000_2m", val: {alt: 24000, time: 2}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 24,000 feet. Climbing time is 2 minutes.", file: "roc_24000_2m", val: {alt: 24000, time: 2}},
    {txt: "Express Airways 101, calculate new rate of descent\n New altitude is 26,000 feet. Descent time is 3 minutes.", file: "rod_26000_3m", val: {alt: 26000, time: 3}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 26,000 feet. Climbing time is 3 minutes.", file: "roc_26000_3m", val: {alt: 26000, time: 3}},
    {txt: "Express Airways 101, calculate new rate of descent.\nNew altitude is 28,000 feet. Descent time is 2 minutes.", file: "rod_28000_2m", val: {alt: 28000, time: 2}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 28,000 feet. Climbing time is 2 minutes.", file: "roc_28000_2m", val: {alt: 28000, time: 2}},
    {txt: "Express Airways 101, calculate new rate of descent.\nNew altitude is 31,000 feet. Descent time is 1 minute 30 seconds.", file: "rod_31000_1m30s", val: {alt: 31000, time: 1.5}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 31,000 feet. Climbing time is 1 minute 30 seconds.", file: "roc_31000_1m30s", val: {alt: 31000, time: 1.5}},
    {txt: "Express Airways 101, calculate new rate of descent.\nNew altitude is 33,000 feet. Descent time is 2 minutes 30 seconds.", file: "rod_33000_2m30s", val: {alt: 33000, time: 2.5}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 33,000 feet. Climbing time is 2 minutes 30 seconds.", file: "roc_33000_2m30s", val: {alt: 33000, time: 2.5}},
    {txt: "Express Airways 101, calculate new rate of descent.\nNew altitude is 36,000 feet. Descent time is 3 minutes 30 seconds.", file: "rod_36000_3m30s", val: {alt: 36000, time: 3.5}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 36,000 feet. Climbing time is 3 minutes 30 seconds.", file: "roc_36000_3m30s", val: {alt: 36000, time: 3.5}},
];

const q_TRKList = [
    {txt: "Express Airways 101, descend to altitude 37,500 ft.\nCalculate miles from top of descent, maintaining descent rate of 600 FPM.", file: "RanTrk1", val: {alt: 37500, rate: 600}},
    {txt: "Express Airways 101, climb to altitude 37,500 ft.\nCalculate miles from top of descent, maintaining climb rate of 600 FPM.", file: "RanTrk2", val: {alt: 37500, rate: 600}},
    {txt: "Express Airways 101, descend to altitude 10,000 ft.\nCalculate miles from top of descent, maintaining descent rate of 800 FPM.", file: "RanTrk3", val: {alt: 10000, rate: 800}},
    {txt: "Express Airways 101, climb to altitude 10,000 ft.\nCalculate miles from top of descent, maintaining climb rate of 800 FPM.", file: "RanTrk4", val: {alt: 10000, rate: 800}},
    {txt: "Express Airways 101, descend to altitude 30,000 ft.\nCalculate miles from top of descent, maintaining descent rate of 400 FPM.", file: "RanTrk5", val: {alt: 30000, rate: 400}},
    {txt: "Express Airways 101, climb to altitude 30,000 ft.\nCalculate miles from top of descent, maintaining climb rate of 400 FPM.", file: "RanTrk6", val: {alt: 30000, rate: 400}},
    {txt: "Express Airways 101, descend to altitude 20,000 ft.\nCalculate miles from top of descent, maintaining descent rate of 700 FPM.", file: "RanTrk7", val: {alt: 20000, rate: 700}},
    {txt: "Express Airways 101, climb to altitude 20,000 ft.\nCalculate miles from top of descent, maintaining climb rate of 700 FPM.", file: "RanTrk8", val: {alt: 20000, rate: 700}},
    {txt: "Express Airways 101, descend to altitude 23,500 ft.\nCalculate miles from top of descent, maintaining descent rate of 600 FPM.", file: "RanTrk9", val: {alt: 23500, rate: 600}},
    {txt: "Express Airways 101, climb to altitude 23,500 ft.\nCalculate miles from top of descent, maintaining climb rate of 600 FPM.", file: "RanTrk10", val: {alt: 23500, rate: 600}},
    {txt: "Express Airways 101, descend to altitude 15,000 ft.\nCalculate miles from top of descent, maintaining descent rate of 700 FPM.", file: "RanTrk11", val: {alt: 15000, rate: 700}},
    {txt: "Express Airways 101, climb to altitude 15,000 ft.\nCalculate miles from top of descent, maintaining climb rate of 700 FPM.", file: "RanTrk12", val: {alt: 15000, rate: 700}},
    {txt: "Express Airways 101, descend to altitude 17,500 ft.\nCalculate miles from top of descent, maintaining descent rate of 400 FPM.", file: "RanTrk13", val: {alt: 17500, rate: 400}},
    {txt: "Express Airways 101, climb to altitude 17,500 ft.\nCalculate miles from top of descent, maintaining climb rate of 400 FPM.", file: "RanTrk14", val: {alt: 17500, rate: 400}},
];

const real_scenarios = [
    [
        {type:'alt', txt:"Express Airways 101, descend to 40,000 feet.", val:40000,file:"a1"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 37,000 feet. Descent time is 3 minutes 30 seconds.",new_alt:37000, val:857,file:"a2"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 34,500 ft. \nCalculate miles from top of descent, maintaining descent rate of 500 FPM.",new_alt:34500,  val:5,file:"a3"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 31,500 ft. \nCalculate miles from top of descent, maintaining descent rate of 750 FPM.",new_alt:31500, val:4,file:"a4"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent. \nNew altitude is 30,000 feet. Descent time is 2 minutes.",new_alt:31500, val:750,file:"a5"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 22,500 ft. \nCalculate miles from top of descent, maintaining descent rate of 600 FPM.",new_alt:22500, val:12.5,file:"a6"},
        {type:'alt', txt:"Express Airways 101, descend to 20,000 feet.",new_alt:20000, val:20000,file:"a7"},
        {type:'alt', txt:"Express Airways 101, descend to 18,500 feet.", val:18500,file:"a8"},
        {type:'alt', txt:"Express Airways 101, descend to 16,000 feet.", val:160000,file:"a9"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 14,500 ft. \nCalculate miles from top of descent, maintaining descent rate of 400 FPM.",new_alt:14500, val:3.8,file:"a10"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent. \nNew altitude is 12,000 feet. Descent time is 3 minutes 30 seconds.",new_alt:12000, val:714,file:"a11"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent. \nNew altitude is 9,500 feet. Descent time is 2 minutes 30 seconds.",new_alt:9500, val:1000,file:"a12"},
        {type:'alt', txt:"Express Airways 101, descend to 8,000 feet.", val:8000,file:"a13"},
        {type:'alt', txt:"Express Airways 101, descend to 7,000 feet.", val:7000,file:"a14"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 5,000 ft. \nCalculate miles from top of descent, maintaining descent rate of 300 FPM.",new_alt:5000, val:6.7,file:"a15"},
    ],
    [
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent. \nNew altitude is 41,000 feet. Descent time is 2 minutes 30 seconds.",new_alt:41000, val:800,file:"b1"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent. \nNew altitude is 38,500 feet. Descent time is 2 minutes.",new_alt:38500, val:1250,file:"b2"},
        {type:'alt', txt:"Express Airways 101, descend to 35,000 feet.", val:35000,file:"b3"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 32,000 ft. \nCalculate miles from top of descent, maintaining descent rate of 600 FPM.",new_alt:32000, val:5,file:"b4"},
        {type:'alt', txt:"Express Airways 101, descend to 30,000 feet.", val:30000,file:"b5"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 27,500 ft. \nCalculate miles from top of descent, maintaining descent rate of 300 FPM.",new_alt:27000, val:8.3,file:"b6"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent. \nNew altitude is 25,500 feet. Descent time is 2 minutes 30 seconds.",new_alt:25500, val:800,file:"b7"},
        {type:'alt', txt:"Express Airways 101, descend to 22,000 feet.", val:22000,file:"b8"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 20,000 ft. \nCalculate miles from top of descent, maintaining descent rate of 700 FPM.",new_alt:20000, val:2.9,file:"b9"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 17,000 ft. \nCalculate miles from top of descent, maintaining descent rate of 800 FPM.",new_alt:17000, val:3.8,file:"b10"},
        {type:'alt', txt:"Express Airways 101, descend to 15,500 feet.", val:15500,file:"b11"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 13,000 feet. Descent time is 1 minute 30 seconds.",new_alt:13000, val:1667,file:"b12"},
        {type:'alt', txt:"Express Airways 101, descend to 10,500 feet.", val:10500, file:"b13"},
        {type:'alt', txt:"Express Airways 101, descend to 8,000 feet.", val:8000, file:"b14"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 5,000 ft. \nCalculate miles from top of descent, maintaining descent rate of 700 FPM.",new_alt:5000, val:4.3,file:"b15"},
    ],

    [
        {type:'alt', txt:"Express Airways 101, descend to 39,000 feet.", val:39000,file:"c1"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 35,000 ft. \nCalculate miles from top of descent, maintaining descent rate of 600 FPM.",new_alt:35000, val:6.7,file:"c2"},
        {type:'alt', txt:"Express Airways 101, descend to 32,500 feet.", val:32500,file:"c3"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 30,000 ft.\n Calculate miles from top of descent, maintaining descent rate of 400 FPM.",new_alt:30000, val:6.3,file:"c4"},
        {type:'alt', txt:"Express Airways 101, descend to 29,500 feet.", val:29500,file:"c5"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent. \nNew altitude is 27,500 feet. Descent time is 1 minute 30 seconds.",new_alt:27500, val:1333,file:"c6"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent. \nNew altitude is 25,000 feet. Descent time is 2 minutes 30 seconds.",new_alt:25000, val:800,file:"c7"},
        {type:'alt', txt:"Express Airways 101, descend to 23,500 feet.", val:23500,file:"c8"},
        {type:'alt', txt:"Express Airways 101, descend to 21,000 feet.", val:21000,file:"c9"},
        {type:'alt', txt:"Express Airways 101, descend to 20,000 feet.", val:20000,file:"c10"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 17,000 ft.\n Calculate miles from top of descent, maintaining descent rate of 400 FPM.",new_alt:17000, val:7.5,file:"c11"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 14,500 feet. Descent time is 3 minutes 30 seconds.",new_alt:14500, val:714,file:"c12"},
        {type:'alt', txt:"Express Airways 101, descend to 12,000 feet.", val:12000, file:"c13"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 10,000 feet. Descent time is 3 minutes 30 seconds.",new_alt:10000, val:571, file:"c14"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 6,000 ft.\n Calculate miles from top of descent, maintaining descent rate of 700 FPM.",new_alt:6000, val:5.7,file:"c15"},
    ],
    [
        {type:'trk', txt:"Express Airways 101, descend to altitude 37,500 ft.\n Calculate miles from top of descent, maintaining descent rate of 600 FPM.",new_alt:37500, val:9.2,file:"d1"},
        {type:'alt', txt:"Express Airways 101, descend to 36,000 feet.", val:36000,file:"d2"},
        {type:'alt', txt:"Express Airways 101, descend to 33,000 feet.", val:33000,file:"d3"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 30,000 ft.\n Calculate miles from top of descent, maintaining descent rate of 400 FPM.",new_alt:30000, val:7.5,file:"d4"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 28,000 feet. Descent time is 3 minutes 30 seconds.",new_alt:28000, val:571,file:"d5"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 26,500 feet. Descent time is 1 minute 30 seconds.",new_alt:26500, val:1000,file:"d6"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 23,000 ft.\n Calculate miles from top of descent, maintaining descent rate of 600 FPM.",new_alt:23000, val:5.8,file:"d7"},
        {type:'alt', txt:"Express Airways 101, descend to 20,000 feet.", val:20000,file:"d8"},
        {type:'alt', txt:"Express Airways 101, descend to 19,000 feet.", val:19000,file:"d9"},
        {type:'alt', txt:"Express Airways 101, descend to 18,500 feet.", val:18500,file:"d10"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 16,500 feet. Descent time is 2 minutes 30 seconds.",new_alt:16500, val:800,file:"d11"},
        {type:'alt', txt:"Express Airways 101, descend to 14,000 feet.", val:14000,file:"d12"},
        {type:'alt', txt:"Express Airways 101, descend to 12,000 feet.", val:12000, file:"d13"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 10,000 ft.\n Calculate miles from top of descent, maintaining descent rate of 800 FPM.",new_alt:10000, val:2.5, file:"d14"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 6,500 ft.\n Calculate miles from top of descent, maintaining descent rate of 400 FPM.",new_alt:6500, val:8.8,file:"d15"},
    ],
    [
        {type:'alt', txt:"Express Airways 101, descend to 42,000 feet.", val:42000,file:"e1"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 40,500 feet. Descent time is 2 minutes.",new_alt:40500, val:750,file:"e2"},
        {type:'alt', txt:"Express Airways 101, descend to 39,000 feet.", val:39000,file:"e3"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 36,000 ft.\n Calculate miles from top of descent, maintaining descent rate of 700 FPM.",new_alt:36000, val:4.3,file:"e4"},
        {type:'alt', txt:"Express Airways 101, descend to 35,000 feet.", val:35000,file:"e5"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 31,000 feet. Descent time is 2 minutes 30 seconds.",new_alt:31000, val:1600,file:"e6"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 28,000 ft.\n Calculate miles from top of descent, maintaining descent rate of 800 FPM.",new_alt:28000, val:3.8,file:"e7"},
        {type:'alt', txt:"Express Airways 101, descend to 25,500 feet.", val:25500,file:"e8"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 21,500 feet. Descent time is 3 minutes 30 seconds.",new_alt:21500, val:1143,file:"e9"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 17,000 ft.\n Calculate miles from top of descent, maintaining descent rate of 400 FPM.",new_alt:17000, val:11.3,file:"e10"},
        {type:'trk', txt:"Express Airways 101, descend to altitude 15,000 ft.\n Calculate miles from top of descent, maintaining descent rate of 700 FPM.",new_alt:15000, val:2.9,file:"e11"},
        {type:'alt', txt:"Express Airways 101, descend to 13,500 feet.", val:13500,file:"e12"},
        {type:'alt', txt:"Express Airways 101, descend to 10,000 feet.", val:10000, file:"e13"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 8,500 feet. Descent time is 1 minute 30 seconds.",new_alt:8500, val:1000, file:"e14"},
        {type:'ro', txt:"Express Airways 101, calculate new rate of descent.\n New altitude is 5,500 feet. Descent time is 3 minutes 30 seconds.",new_alt:5500, val:857,file:"e15"},
    ],
];