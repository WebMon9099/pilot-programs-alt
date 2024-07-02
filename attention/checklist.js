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
    {txt: "Express Airways 101, calculate new rate of descent\n New alttude is 26,000 feet. Descent time is 3 minutes.", file: "rod_26000_3m", val: {alt: 26000, time: 3}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 26,000 feet. Climbing time is 3 minutes.", file: "roc_26000_3m", val: {alt: 26000, time: 3}},
    {txt: "Express Airways 101, calculate new rate of descent.\nNew altitude is 28,000 feet. Descent time is 2 minutes.", file: "rod_28000_2m", val: {alt: 28000, time: 2}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 28,000 feet. Climbing time is 2 minutes.", file: "roc_28000_2m", val: {alt: 28000, time: 2}},
    {txt: "Express Airways 101, calculate new rate of descent.\nNew altitude is 31,000 feet. Descent time is 1 minute 30 seconds.", file: "rod_31000_1m30s", val: {alt: 31000, time: 1.5}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 31,000 feet. Climbing time is 1 minute 30 seconds.", file: "roc_31000_1m30s", val: {alt: 31000, time: 1.5}},
    {txt: "Express Airways 101, calculate new rate of descent.\nNew altitude is 33,000 feet. Descent time is 2 minutes 30 seconds.", file: "rod_33000_2m30s", val: {alt: 33000, time: 2.5}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 33,000 feet. Climbing time is 2 minutes 30 seconds.", file: "roc_33000_2m30s", val: {alt: 33000, time: 2.5}},
    {txt: "Express Airways 101, calculate new rate of descent.\nNew altitude is 36,000 feet. Descent time is 3 minutes 30 seconds.", file: "rod_36000_3m30s", val: {alt: 36000, time: 3.5}},
    {txt: "Express Airways 101, calculate new rate of climb.\nNew altitude is 36,000 feet. Climbing time is 3 minutes 30 seconds.", file: "roc_36000_3m30s", val: {alt: 36000, time: 3.5}},
]