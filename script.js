document.addEventListener('DOMContentLoaded', () => {
    const guestNameElement = document.getElementById('guest-name');
    const greetingElement = document.getElementById('greeting');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('guest') || '';

    let greetingStyle = 'friendly'; // default

    fetch('guests.json')
        .then(response => response.json())
        .then(guests => {
            const guest = guests[guestId];
            const guestName = guest ? guest.name : 'bạn';
            greetingStyle = guest ? guest.style : 'formal';
            const honorific = guest ? guest.title : 'bạn';

            guestNameElement.textContent = guestName;

            if (greetingStyle === 'friendly') {
                greetingElement.innerHTML = `Chào ${honorific} <span id="guest-name">${guestName}</span>! 👋`;
            } else {
                greetingElement.innerHTML = `Kính mời ${honorific} <span id="guest-name">${guestName}</span>.`;
            }
        })
        .catch(() => {
            greetingElement.innerHTML = `Kính mời <span id="guest-name">bạn</span>`;
        });

    // === Utility for random response ===
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // === Response templates ===
    const responses = {
        time: [
            "Lễ bắt đầu lúc <strong>10 giờ sáng</strong> ngày 28/10/2025 nha! Tới sớm tí cho vui nè ⏰",
            "Tầm <strong>10 giờ sáng</strong> là có mặt là đẹp nhất đó, kẻo lỡ phần chính nha 😆",
            "10h sáng nghen, đừng ngủ nướng nhaaa ☀️",
            "Khoảng 10 giờ sáng đó, rảnh thì qua sớm tám chơi nè.",
            "10 giờ sáng là khai lễ, nhớ tới sớm chụp hình đẹp nữa 😎"
        ],
        location: [
            "Ở <strong>Hội trường A5</strong>, Đại học Bách Khoa - ĐHQG TPHCM (268 Lý Thường Kiệt, Q.10, HCM) nha 📍",
            "Địa điểm là <strong>Hội trường A5</strong> Bách Khoa đó, ngay đường Lý Thường Kiệt luôn á!",
            "Tới <strong>Hội trường A5</strong> của Bách Khoa nghen, nhìn to lắm không sợ lạc đâu 😄",
            "Tổ chức tại <strong>Hội trường A5</strong> – Bách Khoa, nơi tụi mình cực khổ suốt mấy năm nè 😅",
            "Ở Bách Khoa đó, <strong>Hội trường A5</strong> – có biển chỉ dẫn đàng hoàng luôn!"
        ],
        major: [
            "Mình học <strong>Khoa học Máy tính</strong>, chuyên ngành <strong>Trí tuệ nhân tạo ứng dụng</strong> nha 🤖",
            "Học <strong>Khoa học Máy tính</strong> đó, AI là món tủ luôn 😎",
            "Mình dân <strong>AI</strong> chính hiệu, ngành <strong>Computer Science</strong> đó!",
            "Theo ngành <strong>Khoa học máy tính</strong>, mê AI từ hồi chưa trend luôn 😄",
            "Học <strong>Trí tuệ nhân tạo</strong> bạn ơi, giờ ra trường rồi mà vẫn code tiếp nè 💻"
        ],
        dresscode: [
            "Cứ mặc lịch sự là đẹp nha, áo dài hay sơ mi gì cũng được 👔👗",
            "Dress code thoải mái lắm, miễn đừng mặc đồ ngủ là được 😆",
            "Cứ trang nhã, lịch sự là ok hết á ✨",
            "Không cần quá cầu kỳ đâu, quan trọng là vui vẻ đến với nhau thôi ❤️"
        ],
        congrats: [
            "Cảm ơn nhiều nghen, xúc động ghê á 🥹💐",
            "Trời ơi cảm ơn nhaaa, mong gặp bạn ở lễ 🎓",
            "Cảm ơn nhiều nè, lên hình chụp chung nghen 📸",
            "Cảm ơn nha, ngày đó mình chắc cười banh miệng mất 😁",
            "Cảm ơn lời chúc nha, hẹn gặp bạn ở hội trường 💖"
        ],
        hardship: [
            "Khổ chứ 😭 deadline dí, project cháy liên miên luôn!",
            "Bách Khoa là trường rèn ý chí mà, ra trường cái mạnh mẽ liền 😅",
            "Cực lắm, cà phê và nước mắt là bạn thân suốt mấy năm đó ☕💧",
            "Khổ vừa vừa thôi, nhưng vui nhiều hơn – đúng kiểu vừa học vừa sống 😆",
            "Ừ thì khổ nhưng mà đáng, học xong cảm thấy đời sáng hẳn 🤣"
        ],
        job: [
            "Giờ mình đang làm <strong>AI Engineer ở Zalo</strong> nè 🤖",
            "Giờ đang làm bên <strong>Zalo</strong>, nghiên cứu và triển khai mấy mô hình AI đó 😎",
            "Mình làm AI Engineer ở Zalo nha, vẫn còn mê code lắm 💻",
            "Hiện đang ở team AI bên Zalo, làm vui lắm, toàn người giỏi 😄",
            "Mình đang làm AI Engineer, chuyên về NLP và speech đó 🎙️"
        ],
        afterparty: [
            "Chưa có plan gì hết, chỉ đợi ai rủ đi chơi thôi 😆",
            "Chắc về ngủ bù, hoặc ai rủ đi đâu thì đi đó 😂",
            "Tui đợi lên kèo nè, rủ đi đâu cũng đi hết 😎",
            "Lễ xong chắc tụ tập tám chuyện thôi chứ chưa có kèo 😅",
            "Tạm thời chưa, nhưng có ai rủ là có liền 🤭"
        ],
        unknown: [
            "Ơ mình không hiểu gì hết chơn luôn á 😅",
            "Ủa ủa, bạn nói gì vậy, mình lú rồi 😆",
            "Tui nghe mà không hiểu gì hết, nói lại được hông 😅",
            "Hổng hiểu thiệt luôn á, nói lại đi nè 🤔",
            "Câu này khó quá, mình chịu luôn 😵",
            "Bug rồi :))) thông cảm nha 😅",
            "Vô đây hỏi nè fen <a href='google.com'>click zô</a> may ra biết 🤣"
        ]
    };

    // === Matching logic ===
    const findResponse = (msg) => {
        msg = msg.toLowerCase();

        const match = (patterns, type) =>
            patterns.some(p => msg.includes(p)) ? pick(responses[type]) : null;

        // Friendly tone vs Formal tone difference
        const isFormal = greetingStyle === 'formal';

        if (match(['mấy giờ', 'giờ nào', 'bắt đầu', 'đi lúc nào', 'đi mấy giờ', 'đến lúc nào'], 'time'))
            return isFormal ? "Buổi lễ sẽ bắt đầu vào lúc <strong>10 giờ sáng</strong> ngày 28/10/2025. Rất mong quý khách sắp xếp thời gian tham dự. 🙏" : pick(responses.time);
        if (match(['ở đâu', 'địa điểm', 'chỗ nào', 'hội trường', 'nơi tổ chức'], 'location'))
            return isFormal ? "Buổi lễ được tổ chức tại <strong>Hội trường A5</strong>, Đại học Bách Khoa - ĐHQG TP.HCM. 📍" : pick(responses.location);
        if (match(['học gì', 'ngành gì', 'major', 'chuyên ngành'], 'major'))
            return isFormal ? "Tôi tốt nghiệp ngành <strong>Khoa học Máy tính</strong>, chuyên ngành <strong>Trí tuệ nhân tạo ứng dụng</strong>. 🤖" : pick(responses.major);
        if (match(['mặc gì', 'trang phục', 'dress'], 'dresscode'))
            return isFormal ? "Quý khách vui lòng lựa chọn trang phục lịch sự, phù hợp với không khí trang trọng của buổi lễ. 👔" : pick(responses.dresscode);
        if (match(['chúc mừng', 'congrat', 'grats'], 'congrats'))
            return isFormal ? "Xin chân thành cảm ơn lời chúc tốt đẹp của quý khách. 🎓" : pick(responses.congrats);
        if (match(['bách khoa khổ', 'học khổ', 'học cực', 'khó không'], 'hardship'))
            return isFormal ? "Quả thật, quá trình học tập có nhiều thử thách, nhưng cũng là những trải nghiệm đáng quý. 📚" : pick(responses.hardship);
        if (match(['làm gì', 'đang làm ở đâu', 'làm ở đâu', 'công việc'], 'job'))
            return isFormal ? "Hiện tại tôi đang công tác tại <strong>Zalo</strong> với vai trò Kỹ sư Trí tuệ Nhân tạo. 🤖" : pick(responses.job);
        if (match(['lễ xong', 'xong rồi đi đâu', 'đi chơi không', 'có kèo không'], 'afterparty'))
            return isFormal ? "Sau buổi lễ, hiện tôi chưa có kế hoạch cụ thể. Rất vui nếu được giao lưu cùng quý khách. 🎉" : pick(responses.afterparty);

        return pick(responses.unknown);
    };

    const displayMessage = (sender, message, isBot = false) => {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        if (isBot) {
            messageElement.style.background = '#e3f2fd';
            messageElement.style.borderLeft = '4px solid #0052CC';
            messageElement.style.padding = '8px';
            messageElement.style.borderRadius = '8px';
        }
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const handleUserInput = () => {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;
        displayMessage('Bạn', userMessage);
        const botResponse = findResponse(userMessage);
        setTimeout(() => displayMessage('Thế Hiểu', botResponse, true), 500);
        userInput.value = '';
    };

    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });
});
