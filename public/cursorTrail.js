class Leaf {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.node = (function () {
      var div = document.createElement("div");

      var rand = Math.round(Math.random() * 3);
      if (rand == 1)
        div.className = "MouseTrail";
      else if (rand == 2)
        div.className = "MouseTrail01";
      else if (rand == 3)
        div.className = "MouseTrail02";
      else
        div.className = "MouseTrail03";

      document.body.appendChild(div);
      return div;
    })();

    this.draw();
    this.fall();
  }

  draw() {
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
  }

  fall() {
    const animation = this.node.animate(
      [
        { transform: "translateY(0px) rotate(0deg)", opacity: 1 },
        { transform: "translateY(200px) rotate(90deg)", opacity: 0 },
      ],
      {
        duration: 1500 + Math.random() * 1000,
        easing: "ease-out",
        fill: "forwards",
      }
    );
    animation.onfinish = () => this.node.remove();
  }
}

document.addEventListener("mousemove", function (ev) {
  var rand = Math.round(Math.random());
  if (rand == 1)
    new Leaf(ev.pageX, ev.pageY);
});
