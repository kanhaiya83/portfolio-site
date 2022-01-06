





//initial setup

const flames = SVG("#flames");
const flame1 = SVG("#flame-1");
const flame2 = SVG("#flame-2");
const booster1 = SVG("#booster-1");
const boosters = SVG("#boosters");
const booster2 = SVG("#booster-2");
const fueltank = SVG("#fuel-tank");
const rocketBody = SVG("#rocket-body");
const rocket = SVG("#rocket");

const detachTimeline = new SVG.Timeline();

rocketBody.timeline(detachTimeline)

booster1.timeline(detachTimeline);
booster2.timeline(detachTimeline);
fueltank.timeline(detachTimeline);

flame1.timeline(detachTimeline);
flame2.timeline(detachTimeline);

function startFlameAnimation() {
  flame1
    .animate({
      duration: 600,
      delay: 0,
      when: "now",
      times: true,
      swing: true,
    })
    .transform({ scaleY: 0.9, scaleX: 1.2, origin: "top" });

  flame2
    .animate({
      duration: 600,
      delay: 0,
      when: "now",
      times: true,
      swing: true,
    })
    .transform({ scaleY: 0.9, scaleX: 1.2, origin: "top" });
}

const shakeRocket = () => {
  boosters
    .animate({ duration: 200, swing: true, times: true })
    .transform({ translate: [1, -0.5] });
  rocketBody
    .animate({ duration: 200, swing: true, times: true})
    .transform({ translate: [1, -0.5] });
  flames
    .animate({ duration: 200, swing: true, times: true })
    .transform({ translate: [1, -0.5] });
};

const detachBoosters = () => {
  boosters.timeline().stop();
  detachTime = 2000;
  booster1
    .animate(12000, detachTime, "absolute")
    .transform({ translate: [-25, 400], rotate: -20, scale: 0.35 })
    .animate(12000, detachTime, "absolute")
    .opacity(0);
  booster2
    .animate(12000, detachTime, "absolute")
    .transform({ translate: [25, 400], rotate: 20, scale: 0.35 })
    .animate(12000, detachTime, "absolute")
    .opacity(0);
  fueltank
    .animate(12000, detachTime, "absolute")
    .transform({ translate: [0, 400], scale: 0.35 })
    .animate(12000, detachTime, "absolute")
    .opacity(0);
};

function killFlames() {
  flame1.timeline().stop();
  flame2.timeline().stop();
  flames.timeline().stop();
  flame1
    .animate(1200, 0, "absolute")
    .transform({ scale: [0.9, 0.01], origin: "top" })
    .animate(1, 1200, "absolute")
    .transform({ scale: [0, 0], origin: "top" });
  flame2
    .animate(1200, 0, "absolute")
    .transform({ scale: [0.9, 0.01], origin: "top" })
    .animate(1, 1200, "absolute")
    .transform({ scale: [0, 0], origin: "top" });
}

function moveUpRocket(){
rocketBody.animate(500,2000,"now").transform({translateY:-50}).animate({ duration: 200, swing: true, times: true})
.transform({ translate: [1, -49.5] });

}

const lineAnimation = () => {
  const t = new SVG.Timeline();
  const line1 = SVG("#line-1");
  const line2 = SVG("#line-2");
  const line3 = SVG("#line-3");
  const line4 = SVG("#line-4");
  const dur = 100;

  setInterval(() => {
    line1
      .animate({ duration: dur, delay: 0 })
      .attr("stroke-dashoffset", 0)
      .animate({ duration: dur })
      .attr("stroke-dashoffset", -63)
      .after(() => {
        line1.attr("stroke-dashoffset", 63);
      });
    line2
      .animate({ duration: dur, delay: 600 })
      .attr("stroke-dashoffset", 0)
      .animate({ duration: dur })
      .attr("stroke-dashoffset", -63)
      .after(() => {
        line2.attr("stroke-dashoffset", 63);
      });
    line3
      .animate({ duration: dur, delay: 1500 })
      .attr("stroke-dashoffset", 0)
      .animate({ duration: dur })
      .attr("stroke-dashoffset", -63)
      .after(() => {
        line3.attr("stroke-dashoffset", 63);
      });
    line4
      .animate({ duration: dur, delay: 2000 })
      .attr("stroke-dashoffset", 0)
      .animate({ duration: dur })
      .attr("stroke-dashoffset", -63)
      .after(() => {
        line4.attr("stroke-dashoffset", 63);
      });
    line2.attr("stroke-dashoffset", 63);
    line3.attr("stroke-dashoffset", 63);
    line4.attr("stroke-dashoffset", 63);
  }, 1000);
};
initiateDetachment = () => {
  killFlames();
  detachBoosters();
  moveUpRocket()
};

initiate = () => {
  startFlameAnimation();
  shakeRocket();
  
  lineAnimation();

  setTimeout(() => {
    initiateDetachment()
    setTimeout(() => {
      showMoon()
      setTimeout(() => {
        showAstronaut()
      }, 14000);
    }, 6000);
  }, 3000);
};
initiate()

// const moon = SVG("#moon");
// const astronaut = SVG("#astronaut");
// moon.animate({
//   duration: 1,
//   delay: 0,
// }).transform({translate:[100,-300],scale:0.2}).opacity(0)

// function showMoon(){
//   moon.animate({
//     duration: 14000,
//     delay: 0,
// }).transform({translate:[100,-50],scale:1}).opacity(1)
// }

// function decreaseRocketSize(){
//   rocketBody.animate({
//     duration: 6000,
//     when:"now"

// }).transform({scale:0.85})}

// function showAstronaut(){
//   astronaut.animate({
//     duration: 70000,
//     delay: 0,
// }).transform({translate:[400,-100],rotate:100})
// }

