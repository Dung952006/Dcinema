document.addEventListener("DOMContentLoaded", function () {
  let index = 0;
  const totalSlides = 4;
  const slideWrapper = document.getElementById("slide-wrapper");

  setInterval(() => {
    index = (index + 1) % totalSlides;
    slideWrapper.style.transform = `translateX(-${index * 100}%)`;
  }, 4000);

  // Chuyển tab
  window.switchTab = function (tabId) {
    if (isModalOpen) return; // Không cho chuyển tab khi modal mở
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => tab.classList.remove("active"));
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) selectedTab.classList.add("active");

    const banner = document.getElementById("banner-wrapper");
    const phim = document.getElementById("phim-wrapper");

    if (tabId === "phim") {
      banner.style.display = "block";
      phim.style.display = "block";
    } else {
      banner.style.display = "none";
      phim.style.display = "none";
    }

    // Tắt menu sau khi chuyển tab
    document.querySelector(".menu").classList.remove("show");
  };

  // Hiển thị mặc định tab phim
  window.switchTab('phim');

  // Chọn ngày trong lịch chiếu
  const ngayList = document.querySelectorAll('.ngay');
  const lichList = document.querySelectorAll('.lichchieu-ngay');

  ngayList.forEach(item => {
    item.addEventListener('click', function () {
      ngayList.forEach(i => i.classList.remove('active'));
      this.classList.add('active');

      const selectedDay = this.getAttribute('data-day');

      lichList.forEach(lich => {
        lich.style.display = 'none';
      });

      const activeLich = document.querySelector(`.lichchieu-ngay[data-day="${selectedDay}"]`);
      if (activeLich) activeLich.style.display = 'block';
    });
  });

  // Cập nhật tên người dùng khi đăng nhập / đăng ký
  updateAuthUI();

  const auth = document.querySelector(".auth");
  auth.addEventListener("click", (e) => {
    if (e.target.textContent.includes("ĐĂNG NHẬP")) {
      handleAuthClick('login');
    } else if (e.target.textContent.includes("ĐĂNG KÝ")) {
      handleAuthClick('register');
    }
  });

  const authMobile = document.querySelector(".auth-mobile");
  if (authMobile) {
    authMobile.addEventListener("click", (e) => {
      if (e.target.textContent.includes("ĐĂNG NHẬP")) {
        handleAuthClick('login');
      } else if (e.target.textContent.includes("ĐĂNG KÝ")) {
        handleAuthClick('register');
      }
    });
  }
});

let isModalOpen = false;

function toggleMenu() {
  if (isModalOpen) return;
  const menu = document.querySelector(".menu");
  menu.classList.toggle("show");
}

function showMovies(type) {
  const now = document.getElementById("now-showing");
  const upcoming = document.getElementById("upcoming-movies");
  const btnNow = document.querySelector(".btn-now");
  const btnUpcoming = document.querySelector(".btn-upcoming");

  if (type === "now") {
    now.style.display = "grid";
    upcoming.style.display = "none";
    btnNow.classList.add("active-btn");
    btnUpcoming.classList.remove("active-btn");
  } else {
    now.style.display = "none";
    upcoming.style.display = "grid";
    btnNow.classList.remove("active-btn");
    btnUpcoming.classList.add("active-btn");
  }
}

function showLogin() {
  isModalOpen = true;
  document.getElementById("login-form").style.display = "flex";
  document.getElementById("register-form").style.display = "none";
  document.querySelector(".menu").classList.remove("show");
}

function showRegister() {
  isModalOpen = true;
  document.getElementById("register-form").style.display = "flex";
  document.getElementById("login-form").style.display = "none";
  document.querySelector(".menu").classList.remove("show");
}

function handleAuthClick(type) {
  if (type === 'login') showLogin();
  else showRegister();
}

function login() {
  const username = document.getElementById("login-username").value.trim();
  if (username) {
    localStorage.setItem("user", username);
    updateAuthUI();
    closeModal();
  }
}

function register() {
  const username = document.getElementById("register-username").value.trim();
  if (username) {
    localStorage.setItem("user", username);
    updateAuthUI();
    closeModal();
  }
}

function updateAuthUI() {
  const username = localStorage.getItem("user");
  const auth = document.querySelector(".auth");
  const authMobile = document.querySelector(".auth-mobile");

  if (username) {
    auth.innerHTML = `<span>Xin chào, <strong>${username}</strong></span> / <a href="#" onclick="logout()">Đăng xuất</a>`;
    if (authMobile) {
      authMobile.innerHTML = `<span>Xin chào, <strong>${username}</strong></span> / <a href="#" onclick="logout()">Đăng xuất</a>`;
    }
    closeModal();
  }
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function closeModal() {
  isModalOpen = false;
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "none";
}
