;(function () {

  var Editor = function (canvasId, changeColorId, numOfLinesId) {
    var self = this;
    this.changeColor = document.getElementById(changeColorId);
    this.numOfLines = document.getElementById(numOfLinesId);
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.objects = {
      dots: [],
      lines: []
    }
    this.color = "#ddaaff";
    this.numPrev = 2;

    this.canvas.onclick = function (e) {
      self.newdot(self.objects, e.pageX, e.pageY, self.color, self.numPrev);
    }
    this.changeColor.onchange = function () {
      self.color = self.changeColor.value;
    }
    this.numOfLines.onchange = function () {
      if (self.numOfLines.value.match(/[0-9]/ig)) {
        self.numPrev = self.numOfLines.value;
      }
    }

    var tick = function () {
      self.render(self.ctx, self.objects, self.canvas.width, self.canvas.height);
      requestAnimationFrame(tick);
    }

    setTimeout(tick, 500);
  }
  Editor.prototype = {
    render: function (ctx, objects, x, y) {
      ctx.clearRect(0, 0, x, y);
      for (var i = 0; i < objects.lines.length; i++) {
        objects.lines[i].render(ctx);
      }
      for (var i = 0; i < objects.dots.length; i++) {
        objects.dots[i].render(ctx);
      }
    },
    newdot: function (objects, x, y, color, numPrev) {
      var tempCoords = {};
      if (objects.dots.length) {
        if (numPrev >= objects.dots.length) {
          for (var i = objects.dots.length - 1; i >= 0; i--) {
            tempCoords = {
              x: objects.dots[i].x,
              y: objects.dots[i].y
            }
            objects.lines.push(new Line(color, x, y, tempCoords));
          }
        } else {
          for (var i = objects.dots.length - 1; i >= objects.dots.length - numPrev; i--) {
            tempCoords = {
              x: objects.dots[i].x,
              y: objects.dots[i].y
            }
            objects.lines.push(new Line(color, x, y, tempCoords));
          }
        }
      }
      objects.dots.push(new Dot(color, x, y));
    }
  }

  var Dot = function (color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.timeParam = 10;
  }
  Dot.prototype = {
    render: function (ctx) {
      if (this.timeParam < 20) {
        this.timeParam++;
        ctx.fillStyle = "rgba(220,220,220,.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.timeParam, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 8, 0, Math.PI*2, false);
      ctx.closePath();
      ctx.fill();
    }
  }

  var Line = function (color, x, y, prev) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.prev = prev;
    this.timeParam = 0;
  }
  Line.prototype = {
    render: function (ctx) {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      if (this.timeParam < 10) {
        this.timeParam++;
        var tempX = this.prev.x + (this.x - this.prev.x) / 10 * this.timeParam;
        var tempY = this.prev.y + (this.y - this.prev.y) / 10 * this.timeParam;

        ctx.beginPath();
        ctx.moveTo(this.prev.x, this.prev.y);
        ctx.lineTo(tempX, tempY);
        ctx.stroke();
        ctx.closePath();

      } else {

        ctx.beginPath();
        ctx.moveTo(this.prev.x, this.prev.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.closePath();

      }
    }
  }

  window.onload = function () {
    editor = new Editor("editor", "color-change", "num-of-lines");
  }
})();
