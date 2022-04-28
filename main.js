const canvas = document.getElementById("canvas");
canvas.width = document.getElementById("canvas-container").clientWidth - 40;
canvas.height = 600;

w = canvas.width;
h = canvas.height;
let context = canvas.getContext("2d");
let start_background_colour = "white";
context.fillStyle = start_background_colour;
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "1";
let draw_opacity = "0.3";
let is_drawing = false;

let restore_array = [];
let index = -1;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(e) {
    console.log(draw_color);
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;

    is_drawing = true;
    context.beginPath();

    context.strokeStyle = draw_color; //LINES COLOR
    context.fillStyle = draw_color; //LINES COLOR
    context.lineWidth = "1";

    if (document.getElementById('circle').checked) {

        if (document.getElementById('fill').checked) {
            context.arc(x, y, 50, 0, Math.PI * 2, true); // CIRCLE
            context.fill();
        } else {
            context.arc(x, y, 50, 0, Math.PI * 2, true); // CIRCLE
        }
    } else if (document.getElementById('square').checked) {

        if (document.getElementById('fill').checked) {
            //SQUARE
            context.clearRect(x, y, 100, 100);
            context.fillRect(x, y, 100, 100);
        } else {
            //SQUARE
            context.strokeStyle = draw_color; //LINES COLOR
            context.rect(x, y, 100, 100);
        }
    } else if (document.getElementById('star').checked) {

        if (document.getElementById('fill').checked) {
            context.beginPath();
            //STAR
            context.moveTo(x, y);
            context.lineTo(x + 33 / 2, y + 70 / 2);
            context.lineTo(x + 110 / 2, y + 78.3 / 2);
            context.lineTo(x + 54 / 2, y + 131 / 2);
            context.lineTo(x + 67 / 2, y + 205 / 2);
            context.lineTo(x, y + 170 / 2);
            context.lineTo(x - 66.8 / 2, y + 205 / 2);
            context.lineTo(x - 53 / 2, y + 131 / 2);
            context.lineTo(x - 107 / 2, y + 78 / 2);
            context.lineTo(x - 33 / 2, y + 68 / 2);
            context.lineTo(x, y);
            context.closePath();
            context.fill();
        } else {
            //STAR
            context.moveTo(x, y);
            context.lineTo(x + 33 / 2, y + 70 / 2);
            context.lineTo(x + 110 / 2, y + 78.3 / 2);
            context.lineTo(x + 54 / 2, y + 131 / 2);
            context.lineTo(x + 67 / 2, y + 205 / 2);
            context.lineTo(x, y + 170 / 2);
            context.lineTo(x - 66.8 / 2, y + 205 / 2);
            context.lineTo(x - 53 / 2, y + 131 / 2);
            context.lineTo(x - 107 / 2, y + 78 / 2);
            context.lineTo(x - 33 / 2, y + 68 / 2);
            context.lineTo(x, y);
        }

    } else if (document.getElementById('heart').checked) {

        if (document.getElementById('fill').checked) {
            //HEART SHAPE
            context.moveTo(x, y);
            context.bezierCurveTo(x, y, x - 5, y - 12, x - 25, y - 12);
            context.bezierCurveTo(x - 55, y - 12, x - 55, y + 25.5, x - 55, y + 25.5);
            context.bezierCurveTo(x - 55, y + 43, x - 35, y + 65, x, y + 83);
            context.bezierCurveTo(x + 35, y + 65, x + 55, y + 43, x + 55, y + 25.5);
            context.bezierCurveTo(x + 55, y + 25.5, x + 55, y - 12, x + 25, y - 12);
            context.bezierCurveTo(x + 10, y - 12, x, y, x, y + 3);
            context.fill(); //TO FILL THE HEART
        } else {
            //HEART SHAPE
            context.moveTo(x, y);
            context.bezierCurveTo(x, y, x - 5, y - 12, x - 25, y - 12);
            context.bezierCurveTo(x - 55, y - 12, x - 55, y + 25.5, x - 55, y + 25.5);
            context.bezierCurveTo(x - 55, y + 43, x - 35, y + 65, x, y + 83);
            context.bezierCurveTo(x + 35, y + 65, x + 55, y + 43, x + 55, y + 25.5);
            context.bezierCurveTo(x + 55, y + 25.5, x + 55, y - 12, x + 25, y - 12);
            context.bezierCurveTo(x + 10, y - 12, x, y, x, y + 3);
        }
    } else if (document.getElementById('smile').checked) {
        if (document.getElementById('fill').checked) {
            let contrast = invertColor(draw_color);
            context.strokeStyle = contrast;
            //SMILE
            context.beginPath();
            context.arc(x, y, 50, 0, Math.PI * 2, true); // Outer circle
            context.moveTo(x + 35, y);
            context.closePath();
            context.fill();
            context.arc(x, y, 35, 0, Math.PI, false); // Mouth (clockwise)
            context.moveTo(x - 10, y - 10);
            context.arc(x - 15, y - 10, 5, 0, Math.PI * 2, true); // Left eye
            context.moveTo(x + 20, y - 10);
            context.arc(x + 15, y - 10, 5, 0, Math.PI * 2, true); // Right eye
        } else {
            //SMILE
            context.arc(x, y, 50, 0, Math.PI * 2, true); // Outer circle
            context.moveTo(x + 35, y);
            context.arc(x, y, 35, 0, Math.PI, false); // Mouth (clockwise)
            context.moveTo(x - 10, y - 10);
            context.arc(x - 15, y - 10, 5, 0, Math.PI * 2, true); // Left eye
            context.moveTo(x + 20, y - 10);
            context.arc(x + 15, y - 10, 5, 0, Math.PI * 2, true); // Right eye
        }
    } else {
        context.moveTo(x, y);
    }

    //     //TRIANGLE
    //     context.moveTo(x, y)
    //     context.lineTo(x+50, y-50)
    //     context.lineTo(x+100, y)
    //     context.lineTo(x, y)

    e.preventDefault();
}

function draw(e) {
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    if (is_drawing) {
        if (document.getElementById('pen-pencil').checked) {

            context.lineTo(x, y)
            context.strokeStyle = draw_color;
            context.lineWidth = draw_width;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
        } else if (document.getElementById('pen-brush').checked) {
            context.lineTo(x, y)
            context.strokeStyle = draw_color;
            context.lineWidth = draw_width;
            context.globalAlpha = draw_opacity;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
        } else if (document.getElementById('eraser').checked) {
            context.lineTo(x, y)
            context.strokeStyle = "white";
            context.lineWidth = draw_width;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
        }
        // context.setLineDash([20, 15]);
    }
    e.preventDefault();
}

function stop(e) {
    if (is_drawing) {

        context.stroke();
        context.closePath();
        is_drawing = false;
        context.globalAlpha = 1.0;
    }
    e.preventDefault();

    if (e.type != 'mouseout') {
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }

}

function undo() {
    if (index <= 0) {
        clear_canvas();
    } else {
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0, 0);
    }
}

function clear_canvas() {
    context.fillStyle = "white";
    context.clearRect(0, 0, w, h);
    context.fillRect(0, 0, w, h);

    restore_array = [];
    index = -1;
}

// Handle Save Button
var saveButton = document.getElementById('save');

saveButton.addEventListener('click', function() {
    var imageName = prompt('Please enter image name');
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'drawing';
    a.click();
});

function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1); // remove #
    color = parseInt(color, 16); // convert to integer
    color = 0xFFFFFF ^ color; // invert three bytes
    color = color.toString(16); // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color; // prepend #
    return color;
}

function changeHighlight() {
    if (document.getElementById("pen-pencil").checked) {
        document.getElementById("pen-li").style.backgroundColor = "#EADFD6";
    } else {
        document.getElementById("pen-li").style.backgroundColor = "white";
    }

    if (document.getElementById("pen-brush").checked) {
        document.getElementById("brush-li").style.backgroundColor = "#EADFD6";
    } else {
        document.getElementById("brush-li").style.backgroundColor = "white";
    }

    if (document.getElementById("eraser").checked) {
        document.getElementById("eraser-li").style.backgroundColor = "#EADFD6";
    } else {
        document.getElementById("eraser-li").style.backgroundColor = "white";
    }

    if (document.getElementById("circle").checked) {
        document.getElementById("circle-li").style.backgroundColor = "#EADFD6";
    } else {
        document.getElementById("circle-li").style.backgroundColor = "white";
    }

    if (document.getElementById("square").checked) {
        document.getElementById("square-li").style.backgroundColor = "#EADFD6";
    } else {
        document.getElementById("square-li").style.backgroundColor = "white";
    }

    if (document.getElementById("star").checked) {
        document.getElementById("star-li").style.backgroundColor = "#EADFD6";
    } else {
        document.getElementById("star-li").style.backgroundColor = "white";
    }

    if (document.getElementById("heart").checked) {
        document.getElementById("heart-li").style.backgroundColor = "#EADFD6";
    } else {
        document.getElementById("heart-li").style.backgroundColor = "white";
    }

    if (document.getElementById("smile").checked) {
        document.getElementById("smile-li").style.backgroundColor = "#EADFD6";
    } else {
        document.getElementById("smile-li").style.backgroundColor = "white";
    }
}
