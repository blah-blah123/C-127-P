song = "";
song2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;


function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
}


function modelLoaded() {
    console.log("PoseNet has been initialized!");
}

function gotPoses(results, error) {
    if (error) {
        console.log("Error, bruh");
    }

    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist - " + scoreLeftWrist);
        console.log("scoreRightWrist - " + scoreRightWrist);

        console.log("leftWristX - " + leftWristX);
        console.log("leftWristY - " + leftWristY);
        console.log("rightWristX - " + rightWristX);
        console.log("rightWristY - " + rightWristY);
    }
}


if (scoreLeftWrist > 0.002 && scoreRightWrist < 0.002) {

    song.stop();
    song2.play();
}

if (scoreRightWrist > 0.2) {

    song.play();
    song2.stop();

}