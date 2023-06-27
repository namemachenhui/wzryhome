const select = document.querySelector(".select");
const bgNav = document.querySelector(".bg-nav");
const navOptions = document.querySelectorAll(".bg-nav li");
const subscripts = document.querySelectorAll(".bg-nav em");
const warp = document.querySelector(".warp");
bgNav.addEventListener("mouseenter", () => {
  select.style.display = "block";
});
warp.addEventListener("mouseleave", function (event) {
  // console.log(1);
  select.style.display = "none";
});
for (let index = 0; index < navOptions.length; index++) {
  const navOption = navOptions[index];
  navOption.addEventListener("mouseenter", (event) => {
    subscripts[index].style.display = "block";
  });
  navOption.addEventListener("mouseleave", (event) => {
    subscripts[index].style.display = "none";
  });
}

//json数据请求
let data = null;
function getData() {
  let xhr = new XMLHttpRequest();
  xhr.open("get", "./wangzhe.json", false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      data = JSON.parse(xhr.response);
    }
  };
  xhr.send(null);
}
getData();
const seul = document.querySelector(".bg-select>ul");
// console.log(seul);
//console.log(data);
function render() {
  // debugger;
  data[0].forEach((item, index) => {
    // console.log(item);
    // console.log(index);
    let seli = document.createElement("li");
    item.forEach((item, index) => {
      //console.log(item);
      let { title, link, i, em, b } = item;
      str = `<ul><a href="${link}">${i ? i : ""}${em ? em : ""}
      ${b ? b : ""}${title}</a></ul>`;

      seli.innerHTML += str;
    });
    seul.appendChild(seli);
  });
}
render();

//轮播图

let activity = document.querySelector(".activity");
let activityImg = document.querySelector(".activity-img");
let Imgs = document.querySelectorAll(".activity-img img");
let activityLis = document.querySelectorAll(".activity ul li");
let imgWidth = activity.offsetWidth;
let step = 0;
let count = Imgs.length;
let timer = null;

function autoPlay() {
  step++;
  if (step > count - 1) {
    activityImg.style.transitionDuration = "0s";
    step = 0;
    activityImg.style.left = `0px`;
    activityImg.offsetWidth;
    activityImg.style.transitionDuration = "0.3s";
    step = 1;
  }
  activityImg.style.left = `-${step * imgWidth}px`;
  activityShow();
}
timer = setInterval(autoPlay, 3000);

//滑过文字效果
activity.onmouseover = function (e) {
  if (e.target.tagName == "LI") {
    let index = +e.target.getAttribute("index");
    //e.target.tagName.className="activity-li";
    if (index == step || (step == count - 1 && index == 0)) {
      return;
    }
    step = index;
    //activityImg.style.transitionDuration='0s';
    activityImg.style.left = `-${step * imgWidth}px`;
  }
  clearInterval(timer);
  timer = null;
  activityShow();
};
/* activity.onmouseout = function (e){
  timer = setInterval(autoPlay, 3000);
} */
//轮播标签激活
function activityShow() {
  let temp = step;
  if (step == count - 1) {
    temp = 0;
  }
  activityLis.forEach((item) => {
    let index = +item.getAttribute("index");
    if (index == temp) {
      item.className = "activity-li";
    } else {
      item.className = "";
    }
  });
}
//滑入图片效果
activity.onmouseout = function () {
  clearInterval(timer);
  timer = null;
};

//滑出图片效果
activity.onmouseout = function () {
  timer = setInterval(autoPlay, 3000);
};

//公告选项卡
//数据渲染
const noticeSmall = document.querySelector(".notice-small");
 //console.log(noticesmall);
function noticeTab() {
  data[1].forEach((item, index) => {
    const {
      title,
      em1,
      em2,
      em3,
      em4,
      em5,
      em6,
      em7,
      span1,
      span2,
      span3,
      span4,
      span5,
      span6,
      span7,
      i1,
      i2,
      i3,
      i4,
      i5,
      i6,
      i7,
    } = item;
    str1 = `<ul >
              <h6><a href="">${title}</a></h6>
              <li><a href=""><em>${em1}</em><span>${span1}</span><i>${i1}</i></a></li>
              <li><a href=""><em>${em2}</em><span>${span2}</span><i>${i2}</i></a></li>
              <li><a href=""><em>${em3}</em><span>${span3}</span><i>${i3}</i></a></li>
              <li><a href=""><em>${em4}</em><span>${span4}</span><i>${i4}</i></a></li>
              <li><a href=""><em>${em5}</em><span>${span5}</span><i>${i5}</i></a></li>
              <li><a href=""><em>${em6}</em><span>${span6}</span><i>${i6}</i></a></li>
              <li><a href=""><em>${em7}</em><span>${span7}</span><i>${i7}</i></a></li>
          </ul>`;
          noticeSmall.innerHTML += str1;
  });
  
}
noticeTab()
// console.log(noticesmall);

//选项卡
const noticeTopLis = document.querySelectorAll(".notice-top>li");
const noticeSmallUl = document.querySelector(".notice-small>ul");
const noticeSmallUls = document.querySelectorAll(".notice-small>ul");
const noticeTopEms = document.querySelectorAll(".notice-top li em");
let noticesmallStep = 0;
//console.log(noticeTopEms);
(function(){
  for (let i = 0; i < noticeTopLis.length; i++) {
  noticeTopLis[i].onmouseover = function (e) {
    for (var n = 0; n < noticeTopLis.length; n++) {
      noticeTopLis[n].className = "";
      noticeSmallUls[n].className = "";
    }
    noticeTopLis[i].className = "tab";
    noticeSmallUls[i].className = "tab";
    //选项卡左右滑动效果
    if(e.target.className == "tab"){
      // if (i == noticesmallStep || (noticesmallStep == noticeSmallUls - 1)) {
      //   return;
      // }
      noticesmallStep = i;
      noticeSmall.style.left = `-${ noticesmallStep * (noticeSmallUl.offsetWidth)}px`;
    }
  };
  noticeTopLis[i].onmouseenter = function () {
    noticeTopEms[i].style.display = "block";
  };
  noticeTopLis[i].onmouseleave = function () {
    noticeTopEms[i].style.display = "none";
  };
}
})()

//content双层选项卡
/* let contentTabs = document.querySelectorAll(".content-tab>span");
let contentTab = document.querySelector(".content-tab>span");
let contentSmalls=document.querySelectorAll('content-big>div')
document.body.addEventListener('mouseenter',function(e){
  contentTabs.forEach((item,index)=>{
    
      contentTabs.forEach((item1,index1)=>{
          contentTabs[index1].className = '';
          contentSmalls[index1].className = "";  
          console.log(index1); 
        })
      contentTabs[index].className = 'bilayer';
      contentSmalls[index].className = "bilayer";
      console.log(index);
      if(e.target.className === "bilayer"){
        contentSmalls[index].style.display = "block";
      };
  })
}) */
/* let contentTabs = document.querySelectorAll(".content-tab>span");
let contentSmalls=document.querySelectorAll('content-big>div');

  for (let i = 0; i < contentTabs.length; i++) {
    contentTabs[i].onmouseover = function (e) {
      for (var n = 0; n < contentTabs.length; n++) {
        // contentTabs[n].className = "";
        // contentSmalls[n].className = "";
        contentTabs[n].classList.add("active");
        contentSmalls[n].classList.add("active");
        console.log(n);

      }
      }
      //contentTabs[i].className = "bilayer";
      //contentSmalls[i].className = "bilayer";
      contentTabs[i].classList.remove("active");
      contentSmalls[i].classList.remove("active");
      if(e.target.className === "active"){
        contentSmalls[i].style.display = "block";
      };
  
} */
let contentTabs = document.querySelectorAll(".content-tab>span");
let contentSmalls = document.querySelectorAll('.content-big>div');
let contentli = document.querySelectorAll('.content-big>div>ol>li')[0];
let contentli2 = document.querySelectorAll('.content-big>div>ol>li')[7]
//console.log(contentli);
for (let i = 0; i < contentTabs.length; i++) {
  contentTabs[i].onmouseover = function (e) {
    for (let n = 0; n < contentTabs.length; n++) {
      contentTabs[n].classList.remove("active");
      contentSmalls[n].classList.remove("active");
    }
    this.classList.add("active");
    contentSmalls[i].classList.add("active");
    contentSmalls.forEach((small, index) => {
      small.style.display = (index === i) ? "block" : "none";
      contentli.style.backgroundColor = "#f2bc46" ;
      contentli.style.color="#f0f1f1" ;
      contentli2.style.backgroundColor = "#f2bc46" ;
      contentli2.style.color="#f0f1f1" ;
      
    });
  }
}

//hero选项卡
let heroTabs  = document.querySelectorAll(".hero-tab span");
let heroBig  = document.querySelector('.hero-big ul');
let heroBigs  = document.querySelectorAll('.hero-big ul');
let herostep = 0;
let heroWidth = heroBig.offsetWidth;
let heroBox = document.querySelector('.hero-big');
(function(){
  for (let i = 0; i < heroTabs.length; i++) {
    heroTabs[i].onmouseover = function (e) {
    for (var n = 0; n < heroTabs.length; n++) {
      heroTabs[n].classList.remove("active1");
      heroBigs[n].classList.remove("active1");
      console.log(heroTabs[n]);
    }
    heroTabs[i].classList.add("active1");
    heroBigs[i].classList.add("active1");
    //选项卡左右滑动效果
    if(e.target.className == "active1"){
      herostep = i;
      heroBox.style.left = `-${ herostep * (heroWidth)}px`;
    }
  };
}
})()











