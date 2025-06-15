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
      showLogin();
    } else if (e.target.textContent.includes("ĐĂNG KÝ")) {
      showRegister();
    }
  });
});

// Chuyển giữa phim đang chiếu và phim sắp chiếu
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
    btnNow.classList.remove("active-btn");   // Dòng này quan trọng!
    btnUpcoming.classList.add("active-btn");
  }
}


// Hiển thị form đăng nhập
function showLogin() {
  document.getElementById("login-form").style.display = "flex";
  document.getElementById("register-form").style.display = "none";
}

// Hiển thị form đăng ký
function showRegister() {
  document.getElementById("register-form").style.display = "flex";
  document.getElementById("login-form").style.display = "none";
}

// Đăng nhập
function login() {
  const username = document.getElementById("login-username").value.trim();
  if (username) {
    localStorage.setItem("user", username);
    updateAuthUI();
  }
}

// Đăng ký
function register() {
  const username = document.getElementById("register-username").value.trim();
  if (username) {
    localStorage.setItem("user", username);
    updateAuthUI();
  }
}

// Cập nhật UI sau khi đăng nhập
function updateAuthUI() {
  const username = localStorage.getItem("user");
  const auth = document.querySelector(".auth");

  if (username) {
    auth.innerHTML = `
      <span>Xin chào, <strong>${username}</strong></span> / 
      <a href="#" onclick="logout()">Đăng xuất</a>
    `;
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "none";
  }
}

// Đăng xuất
function logout() {
  localStorage.removeItem("user");
  location.reload(); // hoặc gọi updateAuthUI();
}

// Đóng form đăng nhập/đăng ký
function closeModal() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "none";
}

function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("show");
}

