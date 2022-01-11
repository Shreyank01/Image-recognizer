Webcam.set({
    width:350,
    height:350,
    image_format: "png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri)
    {document.getElementById("output_img").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/2yKjcMtcK/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function show_result() {
    img = document.getElementById("selfie_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }else {
        console.log(results);
        document.getElementById("object_name").innerHTML = results[0].label;
        document.getElementById("object_name_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}