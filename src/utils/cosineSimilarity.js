export default async function cosineSimilarity(trainer, user) {
    const v1 = await getVector(trainer);
    const v2 = await getUserVector(user);

    var score = await getScore(v1, v2) * 100 / 8;
    console.log(score);
    return score;
}

function getScore(v1, v2) {
    var score = cosine(v1, v2);
    return score;
}

function cosine(v1, v2) {
    var score = 0;

    for (var i = 0; i < 8; i++) {
        score += ((v1[i].x * v2[i].x) + (v1[i].y * v2[i].y)) / (getWeight(v1[i]) * getWeight(v2[i]));
    }
    return score;
}

function getWeight(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

function getVector(json) {
    const keyPoint = json.keyPoint;
    var vector = [];

    for (var i = keyPoint.length - 1; i >= 7; i--) {
        if (i === 12 || i === 11) {
            continue;
        }
        var point = {
            "x": parseFloat(keyPoint[i].x) - parseFloat(keyPoint[i - 2].x),
            "y": parseFloat(keyPoint[i].y) - parseFloat(keyPoint[i - 2].y)
        };
        vector.push(point);
    }
    return vector;
}

async function getUserVector(json) {
    const keyPoint = json.keypoints;
    var vector = [];
    
    for (var i = keyPoint.length - 1; i >= 7; i--) {
        if (i === 12 || i === 11) {
            continue;
        }
        var point = {
            "x": parseFloat(keyPoint[i].position.x) - parseFloat(keyPoint[i - 2].position.x),
            "y": parseFloat(keyPoint[i].position.y) - parseFloat(keyPoint[i - 2].position.y)
        };
        vector.push(point);
    }
    return vector;
}