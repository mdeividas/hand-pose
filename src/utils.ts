import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';

export const calculateDistance = (x1: number, x2: number, y1: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

// This function's objective is to find which centroid is closer to the provided point.
export const findNearestCentroid = (distances: number[], centroids: number[][]) => {
    let nearestCentroidIndex = 0;
    let minDistance = Infinity;

    centroids.forEach((centroid, index) => {
        let distance = 0;
        for (let i = 0; i < centroid.length; i++) {
            distance += Math.pow(centroid[i] - distances[i], 2);
        }
        distance = Math.sqrt(distance);

        if (distance < minDistance) {
            minDistance = distance;
            nearestCentroidIndex = index;
        }
    });

    return nearestCentroidIndex;
};

export const KMeansCentroidsSearch = (distances: number[]) => {
    const centroids = [
        [29.32492239539394, 23.845205768121215, 20.593983924303032, 18.657128788848485, 18.35031249363636],
        [31.964079364565215, 46.65739722507246, 49.34809334449275, 46.588967348405795, 39.55344674731884],
    ];

    return findNearestCentroid(distances, centroids);
};

export const createKeyMap = (handPoseEstimations: handPoseDetection.Keypoint[]) =>
    handPoseEstimations.reduce<Record<string, handPoseDetection.Keypoint>>((acc, item) => {
        acc[item.name!] = item;
        return acc;
    }, {});

export const getHandPoseEstimationsDistances = (data: Record<string, handPoseDetection.Keypoint>) => {
    const wristThumbDistance = calculateDistance(data.wrist.x, data.thumb_tip.x, data.wrist.y, data.thumb_tip.y);
    const wristIndexDistance = calculateDistance(
        data.wrist.x,
        data.index_finger_tip.x,
        data.wrist.y,
        data.index_finger_tip.y
    );
    const wristMiddleDistance = calculateDistance(
        data.wrist.x,
        data.middle_finger_tip.x,
        data.wrist.y,
        data.middle_finger_tip.y
    );
    const wristRingDistance = calculateDistance(
        data.wrist.x,
        data.ring_finger_tip.x,
        data.wrist.y,
        data.ring_finger_tip.y
    );
    const wristPinkyDistance = calculateDistance(
        data.wrist.x,
        data.pinky_finger_tip.x,
        data.wrist.y,
        data.pinky_finger_tip.y
    );

    return [wristThumbDistance, wristIndexDistance, wristMiddleDistance, wristRingDistance, wristPinkyDistance];
};
