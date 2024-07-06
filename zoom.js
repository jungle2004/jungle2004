function setZoom() {
    const baseWidth = 1024;
    const baseHeight = 768;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleX = windowWidth / baseWidth;
    const scaleY = windowHeight / baseHeight;
    const scale = Math.min(scaleX, scaleY);
    document.querySelector('.content').style.zoom = scale;
  }

  window.onload = setZoom;
  window.onresize = setZoom;