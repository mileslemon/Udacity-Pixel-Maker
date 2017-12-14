// document is ready
$(function () {

    // creates a grid using sizes inputted by the user.
    function makeGrid() {
        var pixelCanvas = $('#pixel_canvas');
        var gridHeight = $('#input_height').val();
        var gridWidth = $('#input_width').val();

        


        // clears any existing pixel canvas
        pixelCanvas.empty();

        // creates the table grid
        for (var r = 0; r < gridHeight; r++) {
        var row = $('<tr class="canvasRow"></tr>').appendTo(pixelCanvas);
            for (var c = 0; c < gridWidth; c++) {
                $('<td class="canvasCol"></td>').appendTo(row);
            }
        }
    }

    function paintCanvas() {
        // assumes mouse isnt clicked
        var clicked = false;
        var shiftClicked = false;
        var currentColor = $('#colorPicker').val();

        // checks if mouse is clicked
        $('.canvasCol').mousedown(function (event) {
            // prevents the user from dragging the table
            event.preventDefault();
            clicked = true;
            // checks if shift is held while clicking
            if (event.shiftKey) {
                clicked = false;
                shiftClicked = true;
                $(this).css('background-color', "#1b1014"); 
            }
            
        }).mouseup(function () {
            clicked = false;
            shiftClicked = false;

        }).mousemove(function () {
            var brushSize = $('#brush_Size').val();
            var $this = $(this);
            var cellIndex = $this.index();
            
            // object containing cell locations
            var cells = [
                // brush 1
                { cell : $this }, // origin point
                // brush 2
                { cell : $this.closest('td').next('td') }, // right
                { cell : $this.closest('tr').next().children().eq(cellIndex) }, // bottom
                { cell : $this.closest('tr').next().children().eq(cellIndex).closest('td').next('td') }, // bottom right
                // // brush 3
                { cell : $this.closest('td').prev('td') }, // left
                { cell : $this.closest('tr').next().children().eq(cellIndex).closest('td').prev('td') }, // bottom left
                { cell : $this.closest('tr').prev().children().eq(cellIndex) }, // top
                { cell : $this.closest('tr').prev().children().eq(cellIndex).closest('td').next('td') }, // top right
                { cell : $this.closest('tr').prev().children().eq(cellIndex).closest('td').prev('td') } // top left
            ];

            // prevents painting if mouse is released off canvas
            $('body').mouseup(function (){
                clicked = false;
            })

            // if mouse is clicked and dragged, paints the cell the mouse is over
            if(brushSize === '1' && clicked){
                var color = $('#colorPicker').val();
                cells[0].cell.css('background-color', color);
            } else if (brushSize === '2' && clicked) {
                for (var i = 0; i < 4; i++) {
                    var currentColor = $('#colorPicker').val();
                    cells[i].cell.css('background-color', currentColor);
                }  
            } else if (brushSize === '3' && clicked) {
                for (var i = 0; i < 9; i++) {
                    var currentColor = $('#colorPicker').val();
                    cells[i].cell.css('background-color', currentColor);
                }
            // if shiftclicked paints the cell to the default color
            } else if (shiftClicked) {
                $(this).css('background-color', "#1b1014"); 
            }
        });
    }
    
    // resets the canvas
    $('#reset').click(function () {
        $('.canvasCol').css('background-color', "#1b1014");
    });

    // toggles grid
    $('#toggleGrid').click(function () {
        $('tr, td').toggleClass('toggleGrid');
    });

    // calls the makeGrid function on form submission
    // prevents the page from refreshing when submitted
    $('#submitGrid').click(function (event) {
        event.preventDefault();
        makeGrid();
        paintCanvas();
    });

});