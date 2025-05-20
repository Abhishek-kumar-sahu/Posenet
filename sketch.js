let capture;
let posenet;
let poses = [];
let actor_img;
let specs, smoke;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent('video-holder');
    capture = createCapture(VIDEO);
    capture.size(800, 500);
    capture.hide();

    console.log('ml5 version:', ml5.version);

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);

    actor_img = loadImage('images/shahrukh.png', img => console.log('Actor image loaded'));
    specs = loadImage('images/spects.png', img => console.log('Specs image loaded'));
    smoke = loadImage('images/cigar.png', img => console.log('Smoke image loaded'));
}

function receivedPoses(results) {
    poses = results;
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    clear();
    image(capture, 0, 0, 800, 500); 

    for (let i = 0; i < poses.length; i++) {
        let singlePose = poses[i].pose;
        let skeleton = poses[i].skeleton;
        console.log(`Pose ${i}:`, singlePose);

        fill(255, 0, 0);
        for (let j = 0; j < singlePose.keypoints.length; j++) {
            ellipse(singlePose.keypoints[j].position.x, singlePose.keypoints[j].position.y, 20);
        }

        stroke(255, 255, 255);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        let noseX = singlePose.keypoints[0].position.x;
        let noseY = singlePose.keypoints[0].position.y;
        let leyeX = singlePose.keypoints[1].position.x;
        let leyeY = singlePose.keypoints[1].position.y;
        let reyeX = singlePose.keypoints[2].position.x;
        let reyeY = singlePose.keypoints[2].position.y;



        let eyeDist = dist(leyeX, leyeY, reyeX, reyeY);
        let faceWidth = eyeDist * 2.5;
        let faceHeight = eyeDist * 3;

        
        image(specs, (leyeX + reyeX) / 2 - eyeDist, (leyeY + reyeY) / 2 - eyeDist / 2, eyeDist * 2, eyeDist);

        
    }
}
