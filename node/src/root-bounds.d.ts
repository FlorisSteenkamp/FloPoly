declare let rootBounds: {
    rootMagnitudeUpperBound_fujiwara: (p: number[]) => number;
    positiveRootUpperBound_LMQ: (p: number[]) => number;
    positiveRootLowerBound_LMQ: (p: number[]) => number;
    negativeRootUpperBound_LMQ: (p: number[]) => number;
    negativeRootLowerBound_LMQ: (p: number[]) => number;
    rootMagnitudeUpperBound_rouche: (p: number[]) => number;
};
export default rootBounds;
