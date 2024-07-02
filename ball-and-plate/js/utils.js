const rad2Ang = (rad) => (rad * 180) / Math.PI;

const ang2Rad = (ang) => (ang * Math.PI) / 180;

const getRandomVal = (range) => Math.ceil(Math.random() * 100000000) % range;

const isSamePoint = (point1, point2) =>
    point1[0] === point2[0] &&
    point1[1] === point2[1] &&
    point1[2] === point2[2];

const getFixedFloat = (val, len) => Number(val.toFixed(len));
const getRB = (num1, num2) => {
    return Math.random() * Math.abs(num1 - num2) + Math.min(num1, num2);
};
