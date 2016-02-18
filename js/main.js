;(function () {

  var Editor = function (canvasId) {
    var canvas = document.getElementById(canvasId);
    this.ctx = canvas.getContext('2d');

    var self = this;
    var tick = function () {
      self.update();
      self.render();
      requestAnimationFrame(tick);
    }

    setTimeout(tick, 500);
  }
  Editor.prototype = {
    update: function () {

    },
    render: function () {

    }
  }

  window.onload = function () {
    editor = new Editor("editor");
  }
})();
