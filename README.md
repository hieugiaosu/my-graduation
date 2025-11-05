# 🎓 Graduation Ceremony Invitation Website

A modern website to invite friends to my graduation ceremony.
Features personalized greetings with honorific titles, intelligent chatbot, and HCMUT blue & white color scheme.

---

## 📅 My Information

* **Name:** Phạm Thế Hiểu
* **Date:** 28/10/2025, 10:00 AM
* **Place:** Hội trường A5, Trường Đại học Bách Khoa - ĐHQG TPHCM
* **Address:** 268 Lý Thường Kiệt, Phường Diên Hồng, TP.HCM
* **Coordinates:** 10.772944, 106.657957
* **Major:** Khoa học máy tính
* **Specialization:** Trí tuệ nhân tạo ứng dụng

---

## ✨ Features

* 🎨 HCMUT blue and white color scheme
* 🎯 Personalized greetings with Vietnamese honorifics (anh/chị/bạn)
* 🤖 Intelligent chatbot (answered by Thế Hiểu)
* 📱 Responsive two-column layout
* 🗺️ Embedded Google Maps
* 🎉 Modern animations and icons
* 📸 Clear photo placeholder

---

## 🛠️ Run Locally

1. Clone the project:

   ```bash
   git clone https://github.com/<your-username>/graduation-invitation.git
   cd graduation-invitation
   ```

2. Start a local server:

   ```bash
   python3 -m http.server 8080
   ```

3. Test with different guests:

   **For guest Khánh Giang (friendly, bạn):**
   ```
   http://localhost:8080?guest=giangphan
   ```
   
   **For guest Minh Nguyễn (formal, anh):**
   ```
   http://localhost:8080?guest=minhnguyen
   ```
   
   **For guest Thúy Trần (formal, chị):**
   ```
   http://localhost:8080?guest=thuytran
   ```
   
   **Default (no guest parameter, formal, bạn):**
   ```
   http://localhost:8080
   ```

---

## 🌐 Deployment & Sharing

### GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Share links like:
   - `https://yourusername.github.io/invitation?guest=giangphan`
   - `https://yourusername.github.io/invitation?guest=minhnguyen`

### Netlify/Vercel
1. Deploy from GitHub
2. Share links like:
   - `https://yoursite.netlify.app?guest=giangphan`
   - `https://yoursite.netlify.app?guest=thuytran`

### Custom Domain
If you have `invitation.com`:
   - `https://invitation.com?guest=giangphan`
   - `https://invitation.com?guest=linhpham`

---

## 🎨 Customization

### Adding Your Photo

Replace the image URL in `index.html`:
```html
<img id="guest-image" src="path/to/your/graduation-photo.jpg" alt="Your Image">
```

### Adding New Guests

Edit `guests.json`:

```json
{
  "newguest": {
    "name": "Tên Khách",
    "style": "formal",
    "title": "anh"
  }
}
```

**Style options:**
- `"formal"` → "Kính mời [title] [name]"
- `"friendly"` → "Chào [title] [name]! 👋"

**Title options:**
- `"anh"` → For older male or male peers
- `"chị"` → For older female or female peers  
- `"bạn"` → For friends/equals

**Share the link:**
```
https://yoursite.com?guest=newguest
```

### Adding Chat Responses

Edit `chatResponses` array in `script.js` to add more Q&A patterns.

---

## 🎓 Color Scheme

Website uses official HCMUT colors:
- **Primary Blue:** #0052CC (university blue)
- **Dark Blue:** #003D99 (accent)
- **White:** #FFFFFF (main background)
- **Light Blue:** #f0f7ff, #e6f2ff (section backgrounds)

---

## 📁 File Structure

```
index.html       # Main HTML with two-column layout
style.css        # Blue & white HCMUT styling
script.js        # Query parameter routing + chatbot
guests.json      # Guest data with honorifics
README.md        # This file
```

---

## 💡 Example Usage

Create personalized links for each guest:

```
Khánh Giang:  ?guest=giangphan
Minh Nguyễn:  ?guest=minhnguyen
Thúy Trần:    ?guest=thuytran
Hoàng Lê:     ?guest=hoangle
Linh Phạm:    ?guest=linhpham
```

Each link will show their personalized greeting with the correct honorific! 🎉
