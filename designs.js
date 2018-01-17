// Select color input
// Select size input
$(function() {
  
  let height, width, color, erase, brush, gridLines, drawing, linesVisible, canvasColor;

  height = 16;
  width = 16;
  color = '#000';
  gridLines = '#bbb';
  erase = false;
  brush = true;
  drawing = false;
  linesVisible = true;
  canvasColor = '#fff'
  const canvas = $('#pixel_canvas');
  const button = $('#button');
  const palette = $('.palette');
  const eraseElement = $('.eraser');
  const brushElement = $('.brush');
  const hideGridLines = $('#hideGrid');
  let canvasSaveName = 'Untitled 1';
  const list = $('.load-canvases');
  const savedCanvases = JSON.parse(localStorage.getItem('savedCanvases')) || [];
  
  // toggle button for the tools
  eraseElement.click( function(e) {
    erase = true;
    brush = false;
    $(this).addClass('active');
    brushElement.removeClass('active');
  });

  brushElement.click( function(e) {
    brush = true;
    erase = false;
    $(this).addClass('active');
    eraseElement.removeClass('active');
  });


  // on form submit, create the grid
  button.click(function(e) {
    makeGrid(height, width);
    e.preventDefault();
  });

  // When size is submitted by the user, call makeGrid()

  function makeGrid(height, width) {

    canvas.empty();

    for (var x = 1; x <= height; x++) {
      var row = $('<tr></tr>');
      for (var y = 1; y <= width; y++) {
        row.append('<td></td>');
      }
      canvas.append(row);
    }
  }

  // paint or remove color on click
  function paint(pixel) { 
    if (!drawing) return;

      if (erase) {
        $(pixel).css('background-color', 'transparent');
      } else {
        $(pixel).css('background-color', color);
      }
  };

  function addPalette() {
    palette.find('li').each( function() {
      var colorSwatch = $(this).attr('data-color');
      $(this).css('background-color', colorSwatch);
      if (colorSwatch === color) {
        $(this).addClass('active');
      }
    });
    updateCurrentSwatch();
  };

  function colorGridLines(lineColor) {
    canvas.css('color', lineColor);
  }

  function updateCurrentSwatch() {
    $('.selected-color').css('background-color', color);
  }

  // save canvas
  function saveCanvas() {
    const drawing = JSON.stringify(canvas.html());
    let nameExists;
    const savedCanvas = {
      name: canvasSaveName,
      settings: {
        canvasWidth: width,
        canvasHeight: height,
        gridLines: gridLines,
        canvasColor: canvasColor,
        drawing: drawing
      }
    }

    let i = savedCanvases.length;

    while(i--) {
      if(canvasSaveName == savedCanvases[i].name) {
        nameExists = i;
        break;
      }
    }

    if (nameExists !== undefined) {
      savedCanvases.splice(i, 1);
      savedCanvases.push(savedCanvas);
      localStorage.setItem('savedCanvases', JSON.stringify(savedCanvases));
    } else {
      savedCanvases.push(savedCanvas);
      localStorage.setItem('savedCanvases', JSON.stringify(savedCanvases));
    }
    createCanvasList();
  }

  // create the list of saved items from local storage for loading/removing
  function createCanvasList() {
    $(list).empty();
    for (var i = savedCanvases.length - 1; i >= 0; i--) {
      let itemName = savedCanvases[i].name;
      $(list).append(`<li data-item="${i}"><span>${itemName}</span> <span class="remove">Delete</span></li>`);
    }
  }

  // load a saved canvas from local storage
  function loadCanvas(i) {
    const canvasToLoad = savedCanvases[i];

    height = canvasToLoad.settings.canvasHeight;
    width = canvasToLoad.settings.canvasWidth;
    gridLines = canvasToLoad.settings.gridLines;
    canvasColor = canvasToLoad.settings.canvasColor;
    canvas.html(JSON.parse(canvasToLoad.settings.drawing));
    canvasSaveName = canvasToLoad.name;

    updateUI();
  }

  // update ui to match settings from saved canvas
  function updateUI() {
    $('#input_width').val(width);
    $('#input_height').val(height);
    $('#grid-lines').val(gridLines);
    colorGridLines(gridLines);
    $('.canvas').css('background-color', canvasColor);
    $('#saveName').val(canvasSaveName);
  }


  // create a fresh canvas with default settings
  function freshCanvas() {
    height = 16;
    width = 16;
    gridLines = '#bbb';
    canvasColor = '#f3f3f3';
    makeGrid(width, height);
    canvasSaveName = `Untitled ${savedCanvases.length + 1}`;

    updateUI();
  }

  // remove canvas from local storage
  function removeCanvas(i) {
    if (savedCanvases.length <= 1) {
      savedCanvases.splice(i, 1);
      freshCanvas();
    } else {
      savedCanvases.splice(i, 1);
      loadCanvas(savedCanvases.length - 1);
    }
    localStorage.setItem('savedCanvases', JSON.stringify(savedCanvases));
    createCanvasList();
  }

  // load most recently added canvas on page load
  function loadLastCanvas() {
    const numberOfCanvases = savedCanvases.length - 1;
    loadCanvas(numberOfCanvases);
  }


  // event listeners
  $('#input_width').change( function() {
    width = $(this).val();
  });

  $('#input_height').change( function() {
    height = $(this).val();
  });

  // canvas color
  $('#canvas-color').change( function() {
    canvasColor = $(this).val();
    $('.canvas').css('background-color', canvasColor);
  });

  // colour of the grid lines
  $('#grid-lines').change(function() {
    gridLines = $(this).val();
    colorGridLines(gridLines);
  });

  // remove colour from the grid lines
  hideGridLines.on('click', function(e) {
    e.preventDefault();
    if (linesVisible) {
      colorGridLines('transparent');
      $(this).val('Show grid');
      linesVisible = false;
    } else {
      colorGridLines(gridLines);
      $(this).val('Hide grid');
      linesVisible = true;
    }
  });

  // custom colour picker
  $('#colorPicker').change(function() {
    color = $(this).val();
    updateCurrentSwatch();
  });

  // palette colour picker
  palette.on('click', 'li', function(e) {
    color = $(e.target).attr('data-color');
    updateCurrentSwatch();
  });

  // watch canvas for drawing
  canvas.on('mousedown', 'td', function(e) {
    e.preventDefault();
    drawing = true;
    paint(e.target);
    $("#colorPicker").spectrum("hide");
  });

  canvas.on('mouseup', 'td', function(e) {
    drawing = false;
  });

  canvas.on('mousemove', 'td', function(e) {
    paint(e.target);
  });

  // save name change listener
  $('#saveName').change(function() {
    canvasSaveName = $(this).val();
  })


  // keyboard events for paint and erase
  $(document).keydown( function(e) {
    if (e.metaKey || e.ctrlKey) {
      switch (e.keyCode) {
        case 69:
          erase = true;
          brush = false;
          eraseElement.addClass('active');
          brushElement.removeClass('active');
          break;
        case 66:
          brush = true;
          erase = false;
          brushElement.addClass('active');
          eraseElement.removeClass('active');
          break;
      }
    }
  });

  // save canvas event
  $('#saveCanvas').click(function() {
    saveCanvas();
  });

  // list of saved items listener
  $(list).on('click', 'li span', function(e) {
    const i = $(this).parent('li').attr('data-item');

    if ($(e.target).hasClass('remove')) {
      removeCanvas(i);
    } else {
      loadCanvas(i);
    }
  });

  // create new document
  $('#newCanvas').click( function() {
    freshCanvas();
  });


  //  ---- setup ----
  if (savedCanvases.length !== 0) {
    loadLastCanvas();
    createCanvasList();
  } else {
    makeGrid(16, 16);
    updateUI();
  }
  
  // create the palette
  addPalette();
});
