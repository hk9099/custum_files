$(function () {
    var App = {
        init: function () {
            Quagga.init(this.state, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                Quagga.start();
            });
        },
        state: {
            inputStream: {
                type: "LiveStream",
                constraints: {
                    width: { min: 640 },
                    height: { min: 480 },
                    aspectRatio: { min: 1, max: 100 },
                    facingMode: "environment" // or "user" for the front camera
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                readers: ["ean_reader", "ean_8_reader", "code_128_reader", "qr_reader"]
            },
            locate: true
        },
        lastResult: null
    };

    App.init();

    Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
            }

            if (result.codeResult && result.codeResult.code) {
                App.lastResult = result.codeResult.code;
            }
        }
    });

    Quagga.onDetected(function (result) {
        var code = result.codeResult.code;
        if (App.lastResult !== code) {
            App.lastResult = code;
            alert("Barcode detected and processed : [" + code + "]", result);
        }
    });
});


