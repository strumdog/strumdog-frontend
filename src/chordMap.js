export const fingeringForChord = (chord) => {
    switch (chord) {
        case "C":
            return "xxx3";
        case "D":
            return "2225";
        case "Em":
            return "x432";
        case "G":
            return "x232";
        default:
            return "xxxx";
    }
};
