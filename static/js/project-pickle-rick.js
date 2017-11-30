// // base pickle
var layer1 = $('#layer1')[0];
var ctx1 = layer1.getContext('2d');

var pickleImg = new Image();
pickleImg.src = '/static/img/project-pickle-rick.jpg';
pickleImg.onload = function () {
  layer1.width = this.width;
  layer1.height = this.height;
  ctx1.drawImage(this, 0, 0);
};

// uploaded image
var layer2 = $('#layer2')[0];
var ctx2 = layer2.getContext('2d');

$('#your-face').change(function () {
  var firstFile = this.files[0];
  if (firstFile) {
    ctx2.clearRect(0, 0, 300, 300);
    renderImage(firstFile);
  }
});

function renderImage(file) {
  var reader = new FileReader();
  reader.onload = function (event) {
    faceImg = new Image();
    faceImg.onload = function () {
      ctx2.drawImage(this, 0, 0, layer2.width, layer2.height);
    }
    faceImg.src = event.target.result;
  }
  reader.readAsDataURL(file);
};

// such a drag
// var canvas = document.getElementById("layer2");
// var ctx = canvas.getContext("2d");
var faceImg;
var canvasOffsetX = $("#layer2").offset().left;
var canvasOffsetY = $("#layer2").offset().top;
var mouseDown = false;

layer2.addEventListener('mousemove', handleMouseMove, false);
layer2.addEventListener('mouseout', handleMouseOut, false);
layer2.addEventListener('mouseup', handleMouseOut, false);
layer2.addEventListener('mouseleave', handleMouseOut, false);
layer2.addEventListener('mousedown', handleMouseDown, false);

function handleMouseDown(e) {
  mouseDown = true;
}

function handleMouseOut(e) {
  mouseDown = false;
}

function handleMouseMove(e) {
  if (mouseDown) {
    mouseX = e.pageX - canvasOffsetX;
    mouseY = e.pageY - canvasOffsetY;

    ctx2.clearRect(0, 0, layer2.width, layer2.height);
    ctx2.drawImage(faceImg, mouseX - 300 / 2, mouseY - 300 / 2, 300, 300);
  }
}

