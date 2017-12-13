// add layer
$('#upload-image').change(function (e) {
  var reader = new FileReader();

  reader.onload = function (event) {
    var img = new Image();
    img.src = event.target.result;

    img.onload = function () {
      var title = $('.file-path').val();
      var layer = new Layer(img, title);
      layers.push(layer);
      redrawCanvas();

      updateLayers();
      updateSelected(layers.length - 1);
    }
  }
  reader.readAsDataURL(e.target.files[0]);
});

// select layer
$('.layer-list').on('click', '.layer', function () {
  updateSelected($(this).attr('data-id'));
});

// shift up layer
$('#shift-up').on('click', function () {
  if (selectedId != null && selectedId < layers.length - 1) {
    var temp = layers[selectedId + 1];
    layers[selectedId + 1] = layers[selectedId];
    layers[selectedId] = temp;
    redrawCanvas();

    updateLayers();
    updateSelected(selectedId + 1);
  }
});

// shift down layer
$('#shift-down').on('click', function () {
  if (selectedId != null && selectedId > 0) {
    var temp = layers[selectedId - 1];
    layers[selectedId - 1] = layers[selectedId];
    layers[selectedId] = temp;
    redrawCanvas();

    updateLayers();
    updateSelected(selectedId - 1);
  }
});

// remove layer
$('#remove').on('click', function () {
  if (selectedId != null) {
    layers.splice(selectedId, 1);
    redrawCanvas();

    updateLayers();
    updateSelected(null);
  }
});

// update layer list
function updateLayers() {
  $('.layer-list li').remove();
  for (i in layers) {
    $('.layer-list').prepend('<li id="layer_' + i + '" class="layer truncate" data-id="' + i + '">' + layers[i].title + '</li>');
  }
}

// update selected layer
function updateSelected(i) {
  $('.layer-list .layer').removeClass('selected');

  if (i == null) {
    selectedId = null;
    return;
  }

  selectedId = Number(i);
  $('#layer_' + selectedId).addClass('selected');
  $('#opacity').val(layers[selectedId].opacity);
  $('#angle').val(layers[selectedId].angle);
  $('#scale-x').val(layers[selectedId].scaleX);
  $('#scale-y').val(layers[selectedId].scaleY);
};

// opacity
$('#opacity').on('change', function (e) {
  var inputValue = Number(this.value);
  if (inputValue >= 0 && inputValue <= 1 && selectedId != null) {
    layers[selectedId].opacity = inputValue;
    redrawCanvas();
  }
});

// rotation
$('#angle').on('change', function (e) {
  var inputValue = Number(this.value);
  if (inputValue >= 0 && inputValue <= 360 && selectedId != null) {
    layers[selectedId].angle = inputValue;
    redrawCanvas();
  }
});

// x-scale
$('#scale-x').on('change', function (e) {
  var inputValue = Number(this.value);
  if (inputValue >= 0 && inputValue <= 2 && selectedId != null) {
    layers[selectedId].scaleX = inputValue;
    redrawCanvas();
  }
});

// y-scale
$('#scale-y').on('change', function (e) {
  var inputValue = Number(this.value);
  if (inputValue >= 0 && inputValue <= 2 && selectedId != null) {
    layers[selectedId].scaleY = inputValue;
    redrawCanvas();
  }
});

// -------------------------------
// CANVAS
// -------------------------------
var canvas = $('#canvas')[0];
var context = canvas.getContext('2d');
var canvasOffsetX = $("#canvas").offset().left;
var canvasOffsetY = $("#canvas").offset().top;
var canvasMouseX = 0;
var canvasMouseY = 0;

var layers = new Array();
var selectedId = null;
var mouseDown = false;

$('#canvas').prop('width', $('#canvas').parent().width());
$('#canvas').prop('height', $('#canvas').parent().width());

$(window).resize(function () {
  $('#canvas').prop('width', $('#canvas').parent().width());
  $('#canvas').prop('height', $('#canvas').parent().width());
});

canvas.addEventListener('mousemove', handleMouseMove, false);
canvas.addEventListener('mouseout', handleMouseOut, false);
canvas.addEventListener('mouseup', handleMouseOut, false);
canvas.addEventListener('mouseleave', handleMouseOut, false);
canvas.addEventListener('mousedown', handleMouseDown, false);

function handleMouseDown(e) {
  mouseDown = true;
};

function handleMouseOut(e) {
  mouseDown = false;
};

function handleMouseMove(e) {
  if (mouseDown && selectedId != null) {
    canvasMouseX = e.pageX - canvasOffsetX;
    canvasMouseY = e.pageY - canvasOffsetY;
    redrawCanvas();
  }
};

function redrawCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (i in layers) {
    context.save();

    var posX = canvasMouseX == 0 ? layers[i].canvas.width / 2 : canvasMouseX;
    var posY = canvasMouseY == 0 ? layers[i].canvas.height / 2 : canvasMouseY;

    context.translate(posX, posY);
    context.globalAlpha = layers[i].opacity;
    context.rotate(layers[i].angle * Math.PI / 180);
    context.scale(layers[i].scaleX, layers[i].scaleY);

    context.drawImage(layers[i].getCanvas(), 0 - (layers[i].canvas.width / 2), 0 - (layers[i].canvas.height / 2));
    context.restore();
  }
};

// -------------------------------
// LAYER
// -------------------------------
function Layer(img, title) {
  this.img = img;
  this.title = title;
  this.opacity = 1;
  this.angle = 0;
  this.scaleX = 1;
  this.scaleY = 1;

  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');
  this.canvas.width = img.naturalWidth;
  this.canvas.height = img.naturalHeight;

  this.getCanvas = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    return this.canvas;
  }
};