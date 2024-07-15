// Mẫu dữ liệu lịch hẹn (có thể lấy từ server)
const appointments = [
    { date: '2024-07-15', time: '10:00 AM', doctor: 'Dr. Trấn Thành', service: 'Lấy cao răng' },
    { date: '2024-07-20', time: '02:00 PM', doctor: 'Dr. Anh Tú', service: 'Chỉnh nha' },
    // Thêm các lịch hẹn khác tại đây
  ];
  
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Hàm để hiển thị lịch hẹn
  function renderCalendar(month, year) {
    const calendar = document.getElementById('appointment-calendar');
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
  
    let calendarHTML = '';
  
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
      calendarHTML += `<div class="day-name">${day}</div>`;
    });
  
    for (let i = 0; i < firstDay; i++) {
      calendarHTML += '<div class="day empty"></div>';
    }
  
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const appointment = appointments.find(a => a.date === dateStr);
  
      const date = new Date(dateStr);
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
  
      calendarHTML += `
        <div
          class="day ${appointment ? 'has-appointment' : ''} ${isWeekend ? 'weekend' : ''}"
          data-bs-toggle="modal"
          data-bs-target="#appointmentDetailsModal"
          ${appointment ? `onclick="showAppointmentDetails('${dateStr}')"` : ''}
        >
          ${day}
        </div>
      `;
    }
  
    calendar.innerHTML = calendarHTML;
  
    document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;
  }
  
  // Hàm để hiển thị chi tiết lịch hẹn
  function showAppointmentDetails(dateStr) {
    const appointment = appointments.find(a => a.date === dateStr);
  
    if (appointment) {
      document.getElementById('appointment-time').textContent = appointment.time;
      document.getElementById('appointment-doctor').textContent = appointment.doctor;
      document.getElementById('appointment-service').textContent = appointment.service;
    }
  }
  
  // Chuyển sang tháng trước
  document.getElementById('prevMonth').addEventListener('click', () => {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    renderCalendar(currentMonth, currentYear);
  });
  
  // Chuyển sang tháng sau
  document.getElementById('nextMonth').addEventListener('click', () => {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    renderCalendar(currentMonth, currentYear);
  });
  
  // Khởi tạo lịch khi trang được tải
  document.addEventListener('DOMContentLoaded', () => {
    renderCalendar(currentMonth, currentYear);
  });
  