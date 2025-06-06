/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SERVICES MODAL ===============*/
// Get the modal
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

// When the user clicks on the button, open the modal
let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");

function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/

let swiperTestimonial = new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the light / icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal(`.nav__menu`, {
  delay: 100,
  scale: 0.1,
  origin: "bottom",
  distance: "300px",
});

sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, {
  delay: 100,
});

sr.reveal(`.home__social, .home__scroll`, {
  delay: 100,
  origin: "bottom",
});

sr.reveal(`.about__img`, {
  delay: 100,
  origin: "left",
  scale: 0.9,
  distance: "30px",
});

sr.reveal(`.about__data, .about__description, .about__button-contact`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.skills__content`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.services__title, services__button`, {
  delay: 100,
  scale: 0.9,
  origin: "top",
  distance: "30px",
});

sr.reveal(`.work__card`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.testimonial__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.contact__info, .contact__title-info`, {
  delay: 100,
  scale: 0.9,
  origin: "left",
  distance: "30px",
});

sr.reveal(`.contact__form, .contact__title-form`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.footer, footer__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

// 卡片物理排斥效果
document.addEventListener('DOMContentLoaded', function() {
    // 选择所有卡片元素，排除按钮
    const cards = document.querySelectorAll('.about__box, .services__card, .work__card, .contact__card, .testimonial__card, .skills__content');
    const mouse = { x: 0, y: 0 };
    const cardsData = new Map();

    // 初始化卡片数据
    cards.forEach(card => {
        cardsData.set(card, {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            originalX: 0,
            originalY: 0
        });
    });

    // 更新鼠标位置
    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // 物理参数
    const REPULSION_RADIUS = 300;  // 排斥半径
    const REPULSION_FORCE = 0.3;   // 排斥力
    const FRICTION = 0.85;         // 摩擦力
    const SPRING_FORCE = 0.08;     // 回弹力
    const MAX_VELOCITY = 15;       // 最大速度
    const MAX_DISPLACEMENT = 50;   // 最大位移限制

    // 动画循环
    function animate() {
        cards.forEach(card => {
            const data = cardsData.get(card);
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            // 计算与鼠标的距离
            const dx = cardCenterX - mouse.x;
            const dy = cardCenterY - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 如果在排斥半径内，施加排斥力
            if (distance < REPULSION_RADIUS) {
                const force = Math.pow((REPULSION_RADIUS - distance) / REPULSION_RADIUS, 2);
                const angle = Math.atan2(dy, dx);
                data.vx += Math.cos(angle) * force * REPULSION_FORCE;
                data.vy += Math.sin(angle) * force * REPULSION_FORCE;
            }

            // 应用回弹力（让卡片回到原位）
            data.vx += (data.originalX - data.x) * SPRING_FORCE;
            data.vy += (data.originalY - data.y) * SPRING_FORCE;

            // 限制最大速度
            const speed = Math.sqrt(data.vx * data.vx + data.vy * data.vy);
            if (speed > MAX_VELOCITY) {
                data.vx = (data.vx / speed) * MAX_VELOCITY;
                data.vy = (data.vy / speed) * MAX_VELOCITY;
            }

            // 应用摩擦力
            data.vx *= FRICTION;
            data.vy *= FRICTION;

            // 更新位置
            data.x += data.vx;
            data.y += data.vy;

            // 限制最大位移
            const displacement = Math.sqrt(data.x * data.x + data.y * data.y);
            if (displacement > MAX_DISPLACEMENT) {
                const scale = MAX_DISPLACEMENT / displacement;
                data.x *= scale;
                data.y *= scale;
            }

            // 应用变换
            card.style.transform = `translate(${data.x}px, ${data.y}px)`;
        });

        requestAnimationFrame(animate);
    }

    // 初始化卡片原始位置
    cards.forEach(card => {
        const data = cardsData.get(card);
        data.originalX = 0;
        data.originalY = 0;
    });

    // 开始动画
    animate();
});

// 首页人像浮动效果
document.addEventListener('DOMContentLoaded', function() {
    const handle = document.querySelector('.home__handle');
    const img = document.querySelector('.home__img');
    const mouse = { x: 0, y: 0 };
    
    // 更新鼠标位置
    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // 物理参数
    const REPULSION_RADIUS = 500;  // 更大的排斥半径
    const REPULSION_FORCE = 0.15;  // 更小的排斥力
    const FRICTION = 0.92;         // 更大的阻尼
    const SPRING_FORCE = 0.05;     // 更小的回弹力
    const MAX_VELOCITY = 8;        // 更小的最大速度
    const MAX_DISPLACEMENT = 80;   // 更大的最大位移
    const BACKGROUND_FACTOR = 0.3; // 背景移动系数

    let handleData = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0
    };

    // 动画循环
    function animate() {
        const rect = handle.getBoundingClientRect();
        const handleCenterX = rect.left + rect.width / 2;
        const handleCenterY = rect.top + rect.height / 2;

        // 计算与鼠标的距离
        const dx = handleCenterX - mouse.x;
        const dy = handleCenterY - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 如果在排斥半径内，施加排斥力
        if (distance < REPULSION_RADIUS) {
            const force = Math.pow((REPULSION_RADIUS - distance) / REPULSION_RADIUS, 2);
            const angle = Math.atan2(dy, dx);
            handleData.vx += Math.cos(angle) * force * REPULSION_FORCE;
            handleData.vy += Math.sin(angle) * force * REPULSION_FORCE;
        }

        // 应用回弹力
        handleData.vx += (0 - handleData.x) * SPRING_FORCE;
        handleData.vy += (0 - handleData.y) * SPRING_FORCE;

        // 限制最大速度
        const speed = Math.sqrt(handleData.vx * handleData.vx + handleData.vy * handleData.vy);
        if (speed > MAX_VELOCITY) {
            handleData.vx = (handleData.vx / speed) * MAX_VELOCITY;
            handleData.vy = (handleData.vy / speed) * MAX_VELOCITY;
        }

        // 应用摩擦力
        handleData.vx *= FRICTION;
        handleData.vy *= FRICTION;

        // 更新位置
        handleData.x += handleData.vx;
        handleData.y += handleData.vy;

        // 限制最大位移
        const displacement = Math.sqrt(handleData.x * handleData.x + handleData.y * handleData.y);
        if (displacement > MAX_DISPLACEMENT) {
            const scale = MAX_DISPLACEMENT / displacement;
            handleData.x *= scale;
            handleData.y *= scale;
        }

        // 应用变换
        handle.style.transform = `translate(${handleData.x}px, ${handleData.y}px)`;
        // 背景反向移动
        img.style.transform = `translate(${-handleData.x * BACKGROUND_FACTOR}px, ${-handleData.y * BACKGROUND_FACTOR}px)`;

        requestAnimationFrame(animate);
    }

    // 开始动画
    animate();
});

// 彩色指针效果
document.addEventListener('DOMContentLoaded', function() {
    // 创建指针元素
    const pointer = document.createElement('div');
    pointer.className = 'custom-pointer';
    document.body.appendChild(pointer);

    // 创建指针内部元素
    const pointerInner = document.createElement('div');
    pointerInner.className = 'pointer-inner';
    pointer.appendChild(pointerInner);

    // 添加SVG箭头
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('height', '24');
    svg.setAttribute('width', '24');
    svg.style.transform = 'rotate(-70deg)';
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z');
    path.setAttribute('fill', 'currentColor');
    svg.appendChild(path);
    pointerInner.appendChild(svg);

    let isActive = false;
    let currentX = 0;
    let currentY = 0;
    let aimX = 0;
    let aimY = 0;

    // 更新鼠标位置
    document.addEventListener('mousemove', e => {
        aimX = e.clientX;
        aimY = e.clientY;
        if (!isActive) {
            isActive = true;
            pointer.style.opacity = '1';
        }
    });

    // 鼠标离开页面
    document.addEventListener('mouseleave', () => {
        isActive = false;
        pointer.style.opacity = '0';
    });

    // 动画循环
    function animate() {
        // 提高跟随速度，从0.2增加到0.5
        currentX += (aimX - currentX) * 0.5;
        currentY += (aimY - currentY) * 0.5;

        // 应用变换
        pointer.style.transform = `translate(${currentX}px, ${currentY}px)`;

        requestAnimationFrame(animate);
    }

    // 开始动画
    animate();
});

// 人像图片3D悬浮效果
document.addEventListener('DOMContentLoaded', function() {
    const aboutImg = document.querySelector('.about__img');
    if (!aboutImg) return;

    // 创建容器
    const container = document.createElement('div');
    container.className = 'about__img-container';
    aboutImg.parentNode.insertBefore(container, aboutImg);
    container.appendChild(aboutImg);

    let isMouseEntered = false;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    // 鼠标移动处理
    function handleMouseMove(e) {
        if (!isMouseEntered) return;
        
        const rect = container.getBoundingClientRect();
        // 增加旋转角度到30度
        targetRotationX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * 30;
        targetRotationY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 30;
    }

    // 鼠标进入处理
    function handleMouseEnter() {
        isMouseEntered = true;
        container.style.transition = 'none';
        aboutImg.style.transform = 'scale(1.1)';
    }

    // 鼠标离开处理
    function handleMouseLeave() {
        isMouseEntered = false;
        container.style.transition = 'transform 0.5s ease';
        targetRotationX = 0;
        targetRotationY = 0;
        aboutImg.style.transform = 'scale(1)';
    }

    // 平滑动画循环
    function animate() {
        // 添加阻尼效果
        const damping = 0.1; // 阻尼系数
        currentRotationX += (targetRotationX - currentRotationX) * damping;
        currentRotationY += (targetRotationY - currentRotationY) * damping;

        // 应用变换
        container.style.transform = `rotateX(${-currentRotationX}deg) rotateY(${currentRotationY}deg)`;

        requestAnimationFrame(animate);
    }

    // 添加事件监听
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 开始动画循环
    animate();
});

// 流星雨特效
document.addEventListener('DOMContentLoaded', function() {
    // 创建流星容器
    const meteorsContainer = document.createElement('div');
    meteorsContainer.className = 'meteors-container';
    document.body.appendChild(meteorsContainer);

    // 流星参数
    const config = {
        number: 20,          // 流星数量
        minDelay: 0.2,       // 最小延迟
        maxDelay: 1.2,       // 最大延迟
        minDuration: 2,      // 最小持续时间
        maxDuration: 10,     // 最大持续时间
        angle: 215          // 流星角度
    };

    // 创建流星
    function createMeteors() {
        // 检查是否为暗色模式
        if (document.body.classList.contains('light-theme')) {
            meteorsContainer.style.display = 'none';
            return;
        }
        
        meteorsContainer.style.display = 'block';
        meteorsContainer.innerHTML = ''; // 清空现有流星
        
        for (let i = 0; i < config.number; i++) {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            
            // 随机位置
            meteor.style.left = `${Math.random() * 100}%`;
            
            // 随机延迟
            const delay = Math.random() * (config.maxDelay - config.minDelay) + config.minDelay;
            meteor.style.animationDelay = `${delay}s`;
            
            // 随机持续时间
            const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
            meteor.style.animationDuration = `${duration}s`;
            
            // 添加动画
            meteor.style.animation = `meteor ${duration}s linear ${delay}s infinite`;
            
            meteorsContainer.appendChild(meteor);
        }
    }

    // 监听主题切换
    const themeButton = document.getElementById('theme-button');
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            // 等待主题切换完成
            setTimeout(createMeteors, 100);
        });
    }

    // 初始化流星
    createMeteors();

    // 定期重新创建流星以保持效果
    setInterval(() => {
        if (!document.body.classList.contains('light-theme')) {
            createMeteors();
        }
    }, config.maxDuration * 1000);
});

// 粒子特效
document.addEventListener('DOMContentLoaded', function() {
    // 创建粒子容器
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);

    // 创建canvas元素
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    particlesContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let circles = [];
    let mouse = { x: 0, y: 0 };
    let canvasSize = { w: 0, h: 0 };
    let animationFrameId = null;

    // 粒子参数
    const config = {
        quantity: 100,        // 粒子数量
        staticity: 50,        // 静态程度
        ease: 50,            // 缓动系数
        size: 0.4,           // 粒子大小
        color: '#8b5cf6',    // 主题紫色
        brownianSpeed: 0.05,  // 布朗运动速度（降低）
        brownianRange: 0.2    // 布朗运动范围（降低）
    };

    // 初始化canvas
    function initCanvas() {
        canvasSize.w = window.innerWidth;
        canvasSize.h = window.innerHeight;
        canvas.width = canvasSize.w;
        canvas.height = canvasSize.h;
        
        // 清空现有粒子
        circles = [];
        // 创建新粒子
        for (let i = 0; i < config.quantity; i++) {
            circles.push(createCircle());
        }
    }

    // 创建单个粒子
    function createCircle() {
        return {
            x: Math.random() * canvasSize.w,
            y: Math.random() * canvasSize.h,
            translateX: 0,
            translateY: 0,
            size: Math.random() * 2 + config.size,
            alpha: 0,
            targetAlpha: Math.random() * 0.6 + 0.1,
            dx: (Math.random() - 0.5) * 0.05,  // 降低初始速度
            dy: (Math.random() - 0.5) * 0.05,  // 降低初始速度
            magnetism: 0.1 + Math.random() * 4,
            brownianX: 0,
            brownianY: 0,
            brownianAngle: Math.random() * Math.PI * 2
        };
    }

    // 绘制粒子
    function drawCircle(circle) {
        ctx.beginPath();
        ctx.arc(
            circle.x + circle.translateX,
            circle.y + circle.translateY,
            circle.size,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = `rgba(139, 92, 246, ${circle.alpha})`;
        ctx.fill();
    }

    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);
        
        circles.forEach((circle, i) => {
            // 处理透明度
            const edge = [
                circle.x + circle.translateX - circle.size,
                canvasSize.w - circle.x - circle.translateX - circle.size,
                circle.y + circle.translateY - circle.size,
                canvasSize.h - circle.y - circle.translateY - circle.size
            ];
            const closestEdge = Math.min(...edge);
            const remapClosestEdge = Math.max(0, Math.min(1, closestEdge / 20));
            
            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) {
                    circle.alpha = circle.targetAlpha;
                }
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }

            // 更新布朗运动（降低变化频率）
            if (Math.random() < 0.1) {  // 只有10%的概率更新方向
                circle.brownianAngle += (Math.random() - 0.5) * config.brownianRange;
            }
            circle.brownianX += Math.cos(circle.brownianAngle) * config.brownianSpeed;
            circle.brownianY += Math.sin(circle.brownianAngle) * config.brownianSpeed;

            // 限制布朗运动范围（减小范围）
            circle.brownianX = Math.max(-1, Math.min(1, circle.brownianX));
            circle.brownianY = Math.max(-1, Math.min(1, circle.brownianY));

            // 更新位置（增加鼠标影响权重）
            const mouseInfluence = 1.2;  // 增加鼠标影响系数
            circle.x += circle.dx + circle.brownianX;
            circle.y += circle.dy + circle.brownianY;
            circle.translateX += (mouse.x / (config.staticity / circle.magnetism) - circle.translateX) / config.ease * mouseInfluence;
            circle.translateY += (mouse.y / (config.staticity / circle.magnetism) - circle.translateY) / config.ease * mouseInfluence;

            drawCircle(circle);

            // 检查粒子是否超出边界
            if (
                circle.x < -circle.size ||
                circle.x > canvasSize.w + circle.size ||
                circle.y < -circle.size ||
                circle.y > canvasSize.h + circle.size
            ) {
                circles[i] = createCircle();
            }
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    // 更新鼠标位置
    function updateMousePosition(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left - canvasSize.w / 2;
        mouse.y = e.clientY - rect.top - canvasSize.h / 2;
    }

    // 监听主题切换
    const themeButton = document.getElementById('theme-button');
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            setTimeout(() => {
                if (document.body.classList.contains('light-theme')) {
                    particlesContainer.style.display = 'block';
                    meteorsContainer.style.display = 'none';
                    if (!animationFrameId) {
                        initCanvas();
                        animate();
                    }
                } else {
                    particlesContainer.style.display = 'none';
                    meteorsContainer.style.display = 'block';
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                }
            }, 100);
        });
    }

    // 初始化
    if (document.body.classList.contains('light-theme')) {
        initCanvas();
        animate();
    } else {
        particlesContainer.style.display = 'none';
    }

    // 事件监听
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('resize', () => {
        initCanvas();
    });
});

/*=============== 模态窗口 ===============*/
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
document.body.appendChild(modalOverlay);

const modalContent = document.createElement('div');
modalContent.className = 'modal-content';
modalOverlay.appendChild(modalContent);

// 预加载图片函数
async function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { alpha: false });
      canvas.width = 300;  // 恢复宽度到300px
      canvas.height = 200; // 恢复高度到200px
      
      const scale = Math.max(300 / img.width, 200 / img.height);
      const width = img.width * scale;
      const height = img.height * scale;
      const x = (300 - width) / 2;
      const y = (200 - height) / 2;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, x, y, width, height);
      
      // 使用最高质量的JPEG压缩
      resolve(canvas.toDataURL('image/jpeg', 1.0)); // 提高JPEG质量到1.0
    };
    img.onerror = reject;
    img.src = src;
  });
}

// 优化轮播内容创建
async function createMarqueeContent() {
  const container = document.createElement('div');
  container.className = 'marquee-container';
  
  const imageUrls = {
    top: [
      'assets/img/portfolio/1 (1).jpg',
      'assets/img/portfolio/1 (2).jpg',
      'assets/img/portfolio/1 (3).jpg',
      'assets/img/portfolio/1 (4).jpg',
      'assets/img/portfolio/1 (5).jpg',
      'assets/img/portfolio/1 (6).jpg',
      'assets/img/portfolio/1 (7).jpg',
      'assets/img/portfolio/1 (8).jpg'
    ],
    bottom: [
      'assets/img/portfolio/1 (9).jpg',
      'assets/img/portfolio/1 (10).jpg',
      'assets/img/portfolio/1 (11).jpg',
      'assets/img/portfolio/1 (12).jpg',
      'assets/img/portfolio/1 (13).jpg',
      'assets/img/portfolio/1 (14).jpg',
      'assets/img/portfolio/1 (15).jpg',
      'assets/img/portfolio/1 (16).jpg',
      'assets/img/portfolio/1 (17).jpg'
    ]
  };

  // 预加载所有图片
  const preloadedImages = {
    top: await Promise.all(imageUrls.top.map(src => preloadImage(src))),
    bottom: await Promise.all(imageUrls.bottom.map(src => preloadImage(src)))
  };

  // 创建两行轮播
  for (const [rowType, urls] of Object.entries(preloadedImages)) {
    const row = document.createElement('div');
    row.className = 'marquee-row';
    
    const content = document.createElement('div');
    content.className = `marquee-content ${rowType === 'bottom' ? 'reverse' : ''}`;
    
    const fragment = document.createDocumentFragment();
    
    // 创建图片元素
    urls.forEach(imgSrc => {
      const item = document.createElement('div');
      item.className = 'marquee-item';
      
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = 'Portfolio Image';
      img.loading = 'lazy';
      
      item.appendChild(img);
      fragment.appendChild(item);
    });
    
    // 添加原始图片组
    content.appendChild(fragment.cloneNode(true));
    // 添加克隆的图片组用于无缝循环
    content.appendChild(fragment.cloneNode(true));
    
    row.appendChild(content);
    container.appendChild(row);
  }
  
  return container;
}

// 优化模态窗口显示
let isModalLoading = false;
let currentModalContent = null;
let isClosing = false;
let preloadedContent = null;

// 预加载轮播内容
async function preloadMarqueeContent() {
  if (!preloadedContent) {
    preloadedContent = await createMarqueeContent();
  }
  return preloadedContent;
}

// 只监听"项目与作品"按钮
document.querySelectorAll('.about__box').forEach(box => {
  const title = box.querySelector('.about__title');
  if (title && title.textContent === '项目与作品') {
    box.addEventListener('click', async () => {
      if (isModalLoading || isClosing) return;
      isModalLoading = true;
      
      // 显示模态窗口
      modalOverlay.classList.add('active');
      modalContent.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      try {
        // 使用预加载的内容或创建新内容
        const marqueeContent = preloadedContent || await createMarqueeContent();
        currentModalContent = marqueeContent;
        
        // 使用 requestAnimationFrame 优化DOM更新
        requestAnimationFrame(() => {
          modalContent.innerHTML = `
            <i class="bx bx-x modal-close"></i>
            <div class="modal-body">
              ${marqueeContent.outerHTML}
            </div>
          `;
        });
        
        // 预加载下一组内容
        if (!preloadedContent) {
          preloadMarqueeContent();
        }
      } catch (error) {
        console.error('Error loading content:', error);
        modalContent.innerHTML = `
          <i class="bx bx-x modal-close"></i>
          <div class="modal-body">
            <div class="loading">加载失败，请重试</div>
          </div>
        `;
      } finally {
        isModalLoading = false;
      }
    });
  }
});

// 优化关闭模态窗口的逻辑
const closeModal = () => {
  if (isClosing) return;
  isClosing = true;
  
  // 先移除active类
  modalOverlay.classList.remove('active');
  modalContent.classList.remove('active');
  
  // 等待过渡动画完成后再清理资源
  setTimeout(() => {
    document.body.style.overflow = '';
    
    // 清理当前内容
    if (currentModalContent) {
      currentModalContent = null;
    }
    
    isClosing = false;
  }, 400); // 与CSS过渡时间匹配
};

// 点击关闭按钮关闭模态窗口
modalContent.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-close')) {
    closeModal();
  }
});

// 点击模态窗口外部关闭
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// 按ESC键关闭模态窗口
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

/*=============== 图片轮播功能 ===============*/
async function initCarousel() {
    const carouselTrack = document.querySelector('.carousel__track');
    if (!carouselTrack) return;

    try {
        // 使用与项目与作品相同的图片列表
        const imageUrls = {
            top: [
                'assets/img/portfolio/1 (1).jpg',
                'assets/img/portfolio/1 (2).jpg',
                'assets/img/portfolio/1 (3).jpg',
                'assets/img/portfolio/1 (4).jpg',
                'assets/img/portfolio/1 (5).jpg',
                'assets/img/portfolio/1 (6).jpg',
                'assets/img/portfolio/1 (7).jpg',
                'assets/img/portfolio/1 (8).jpg'
            ],
            bottom: [
                'assets/img/portfolio/1 (9).jpg',
                'assets/img/portfolio/1 (10).jpg',
                'assets/img/portfolio/1 (11).jpg',
                'assets/img/portfolio/1 (12).jpg',
                'assets/img/portfolio/1 (13).jpg',
                'assets/img/portfolio/1 (14).jpg',
                'assets/img/portfolio/1 (15).jpg',
                'assets/img/portfolio/1 (16).jpg',
                'assets/img/portfolio/1 (17).jpg'
            ]
        };

        // 预加载所有图片
        const preloadedImages = {
            top: await Promise.all(imageUrls.top.map(src => preloadImage(src))),
            bottom: await Promise.all(imageUrls.bottom.map(src => preloadImage(src)))
        };

        // 创建两行轮播
        for (const [rowType, urls] of Object.entries(preloadedImages)) {
            const row = document.createElement('div');
            row.className = 'marquee-row';
            
            const content = document.createElement('div');
            content.className = `marquee-content ${rowType === 'bottom' ? 'reverse' : ''}`;
            
            const fragment = document.createDocumentFragment();
            
            // 创建图片元素
            urls.forEach(imgSrc => {
                const item = document.createElement('div');
                item.className = 'marquee-item';
                
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = 'Portfolio Image';
                img.loading = 'lazy';
                
                item.appendChild(img);
                fragment.appendChild(item);
            });
            
            // 添加原始图片组
            content.appendChild(fragment.cloneNode(true));
            // 添加克隆的图片组用于无缝循环
            content.appendChild(fragment.cloneNode(true));
            
            row.appendChild(content);
            carouselTrack.appendChild(row);
        }
    } catch (error) {
        console.error('Error initializing carousel:', error);
        carouselTrack.innerHTML = '<div class="loading">加载失败，请刷新页面重试</div>';
    }
}

// 在页面加载完成后初始化轮播
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});
