import cosineSimilarity from './cosineSimilarity'
import mockData from './mockData'
import curFrame from '../components/Player'


function getFrame() {
    return curFrame;
}

export default async function estimate(a) {
    var frame = await getFrame();
    console.log(frame);

    if (a[0] != null && frame >= 0) {
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