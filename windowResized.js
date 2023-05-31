
function windowResized() {
  console.log("Resizing Window");
  resizeCanvas(windowWidth, windowHeight);
  resizeThings();
  gridSizeW = width - (gridGX);
  gridSizeH = height - (gridGY);
  shapeSizeW = gridSizeW / gridCountX;
  shapeSizeH = gridSizeH / gridCountY;
  newSSW = shapeSizeW - (gridGX);
  newSSH = shapeSizeH - (gridGY);
}

function resizeThings() {
  parentGrid.update();
  if (width > height) {
    poppy.resize(0, height);
  } else {
    poppy.resize(width, 0);
  }
  gridA = functionA(poppy.width, poppy.height, 10, 10, 0, poppy);
  flatGridA = gridA.flat();
  graphPanels.forEach(panel => {
    panel.update();
  }
  )
}

