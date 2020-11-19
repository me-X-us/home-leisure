import cosineSimilarity from './cosineSimilarity'
import mockData from './mockData'

const frame = 0;

export default function estimate(a) {
    console.log(a);

    if (a[0] != null) {
        try {
            if (mockData.frames[frame].keyPoint.length === 17 && a[0].keypoints.length === 17) {
                cosineSimilarity(mockData.frames[frame], a[0]);
            } else {
                console.log("전신이 나와야합니다.");
            }
        } catch (e) {
            console.log("전신이 나와야합니다.");
        }
    }
}
