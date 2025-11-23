document.addEventListener('DOMContentLoaded', () => {
    // === CONFIGURATION ===
    // ⚠️ IMPORTANT: Replace this URL with your actual Google Apps Script Web App URL
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx-EaVQTweMF56c6P3RsRHhfyT-BfQHk2-5uq9yg-DLxa9aSCG84R0niTXa7gdZQZUvvQ/exec";

    const wishDisplay = document.getElementById('wish-display');
    const userWishInput = document.getElementById('user-wish');
    const sendWishBtn = document.getElementById('send-wish-btn');
    const greetingElement = document.getElementById('personal-greeting'); // Changed target
    const allWishesList = document.getElementById('all-wishes-list');
    const navBtns = document.querySelectorAll('.nav-btn');
    const mainTabs = document.querySelectorAll('.main-tab');

    let currentGuestName = 'Bạn'; // Default name
    let currentGuestId = '';

    // === Guest Greeting Logic ===
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('guest');

    if (guestId) {
        currentGuestId = guestId;
        fetch('guests.json')
            .then(response => response.json())
            .then(guests => {
                const guest = guests[guestId];
                if (guest) {
                    currentGuestName = guest.name;
                    const honorific = guest.title || 'bạn';

                    // Personalize Greeting (Below Title)
                    if (guest.style === 'friendly') {
                        greetingElement.innerHTML = `Chào ${honorific} ${guest.name}! 👋`;
                    } else {
                        greetingElement.innerHTML = `Kính mời ${honorific} ${guest.name}`;
                    }

                    // Update Envelope Name
                    if (document.getElementById('envelope-guest-name')) {
                        document.getElementById('envelope-guest-name').textContent = guest.name;
                    }

                    // Update wish input placeholder
                    userWishInput.placeholder = `${guest.name} ơi, gửi lời chúc nhé...`;
                }
            })
            .catch(err => console.error('Error loading guests:', err));
    } else {
        // Default Greeting
        greetingElement.innerHTML = `Chào bạn! 👋`;
        if (document.getElementById('envelope-guest-name')) {
            document.getElementById('envelope-guest-name').textContent = "Bạn";
        }
    }

    // === Main Tab Switching ===
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            navBtns.forEach(b => b.classList.remove('active'));
            mainTabs.forEach(t => t.classList.remove('active'));

            // Add active class
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Load wishes if Guestbook is selected
            if (targetId === 'tab-guestbook') {
                loadWishes();
            }
        });
    });

    // === Wish Handling ===
    const addLocalWish = (message, isUser = true) => {
        const wishElement = document.createElement('div');
        wishElement.classList.add('wish-message');

        if (isUser) {
            wishElement.innerHTML = `<strong>${currentGuestName}:</strong> ${message}`;
            wishElement.style.borderLeft = '4px solid #0052CC';
        } else {
            wishElement.innerHTML = `<strong>Thế Hiểu:</strong> ${message}`;
            wishElement.style.background = '#e3f2fd';
            wishElement.style.borderLeft = '4px solid #FFD700';
        }

        wishDisplay.appendChild(wishElement);
        wishDisplay.scrollTop = wishDisplay.scrollHeight;
    };

    const handleSendWish = () => {
        const wishText = userWishInput.value.trim();
        if (!wishText) return;

        // 1. Display locally immediately
        addLocalWish(wishText, true);
        userWishInput.value = '';

        // 2. Send to Google Sheet
        if (WEB_APP_URL && WEB_APP_URL !== "YOUR_WEB_APP_URL_HERE") {
            const data = {
                guestId: currentGuestId,
                name: currentGuestName,
                message: wishText
            };

            fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(() => {
                console.log("Wish sent to sheet");
            }).catch(err => console.error("Error sending wish:", err));
        } else {
            console.warn("Web App URL not set. Wish not saved to database.");
        }

        // 3. Simulate response
        setTimeout(() => {
            const thankYouMessages = [
                "Cảm ơn lời chúc của bạn nhiều nha! ❤️",
                "Xúc động quá, cảm ơn bạn đã chung vui! 🥰",
                "Hẹn gặp bạn ở lễ tốt nghiệp nhé! 🎉",
                "Lời chúc ý nghĩa quá, cảm ơn bạn! ✨",
                "Received with love! Cảm ơn bạn nhiều! 💌"
            ];
            const randomResponse = thankYouMessages[Math.floor(Math.random() * thankYouMessages.length)];
            addLocalWish(randomResponse, false);
        }, 800);
    };

    // === Load Wishes ===
    const loadWishes = () => {
        if (!WEB_APP_URL || WEB_APP_URL === "YOUR_WEB_APP_URL_HERE") {
            allWishesList.innerHTML = '<p style="text-align:center; color:#888;">Chưa kết nối cơ sở dữ liệu (Google Sheet).</p>';
            return;
        }

        allWishesList.innerHTML = '<p class="loading-text">Đang tải lời chúc...</p>';

        fetch(WEB_APP_URL)
            .then(response => response.json())
            .then(data => {
                allWishesList.innerHTML = '';
                if (data.length === 0) {
                    allWishesList.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Chưa có lời chúc nào. Hãy là người đầu tiên! 🥇</p>';
                    return;
                }

                data.forEach(wish => {
                    const div = document.createElement('div');
                    div.classList.add('public-wish');

                    // Format time if available
                    let timeStr = '';
                    if (wish.timestamp) {
                        const date = new Date(wish.timestamp);
                        timeStr = `<span class="time">${date.toLocaleDateString('vi-VN')}</span>`;
                    }

                    // Hide name as requested by user
                    // div.innerHTML = `<strong>${wish.name} ${timeStr}</strong>${wish.message}`;
                    div.innerHTML = `<strong>${timeStr}</strong>${wish.message}`;
                    allWishesList.appendChild(div);
                });
            })
            .catch(err => {
                console.error(err);
                allWishesList.innerHTML = '<p style="text-align:center; color:red;">Lỗi tải dữ liệu.</p>';
            });
    };

    sendWishBtn.addEventListener('click', handleSendWish);
    userWishInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendWish();
    });

    // === Envelope Animation ===
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const envelope = document.querySelector('.envelope');
    const container = document.querySelector('.container');
    const backgroundOverlay = document.querySelector('.background-overlay');
    const envelopeGuestName = document.getElementById('envelope-guest-name');

    // Update envelope name immediately if possible (or default to 'Bạn')
    // We do this inside the fetch block usually, but let's set a default here or wait for fetch
    // The fetch block above already runs on load. We can update the envelope name there too.

    envelopeOverlay.addEventListener('click', () => {
        envelope.classList.add('open');

        // Wait for animation (flap opens + letter slides up)
        setTimeout(() => {
            // Blur background
            backgroundOverlay.classList.add('blurred');

            // Fade out envelope
            envelopeOverlay.style.transition = 'opacity 0.5s';
            envelopeOverlay.style.opacity = '0';

            setTimeout(() => {
                envelopeOverlay.style.display = 'none';

                // Show main container
                container.style.display = 'block'; // Restore display
                // Trigger reflow
                container.offsetHeight;
                container.classList.remove('hidden-initially');
                container.style.opacity = '1';
            }, 500);
        }, 1000); // Adjust timing based on CSS transition
    });
});