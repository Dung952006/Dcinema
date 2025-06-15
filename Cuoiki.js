document.addEventListener("DOMContentLoaded", function () {
  let index = 0;
  const totalSlides = 4;
  const slideWrapper = document.getElementById("slide-wrapper");

  setInterval(() => {
    index = (index + 1) % totalSlides;
    slideWrapper.style.transform = `translateX(-${index * 100}%)`;
  }, 4000);

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

  window.switchTab('phim');
});

document.addEventListener("DOMContentLoaded", function () {
  const ngayList = document.querySelectorAll('.ngay');
  const lichList = document.querySelectorAll('.lichchieu-ngay');

  ngayList.forEach(item => {
    item.addEventListener('click', function () {
      // Bỏ active tất cả
      ngayList.forEach(i => i.classList.remove('active'));
      this.classList.add('active');

      const selectedDay = this.getAttribute('data-day');

      // Ẩn tất cả lịch chiếu
      lichList.forEach(lich => {
        lich.style.display = 'none';
      });

      // Hiện lịch chiếu tương ứng
      const activeLich = document.querySelector(`.lichchieu-ngay[data-day="${selectedDay}"]`);
      if (activeLich) activeLich.style.display = 'block';
    });
  });
});

function showMovies(type) {
  const now = document.getElementById("movie-now");
  const upcoming = document.getElementById("movie-upcoming");
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
