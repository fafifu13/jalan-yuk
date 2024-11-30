document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const sunIcon = document.getElementById("sunIcon");
    const questionContainer = document.getElementById("questionContainer");
    const calendar = document.getElementById("calendar");
    const datePicker = document.getElementById("datePicker");
    const sendWhatsApp = document.getElementById("sendWhatsApp");
    const yesSound = document.getElementById("yesSound");
    const noSound = document.getElementById("noSound");
    const footer = document.getElementById("footer");

    let hasMoved = false; // Status apakah tombol sudah bergerak
    let userInteracted = false; // Status apakah interaksi sudah terjadi

    // Fungsi untuk memutar suara setelah interaksi
    const playSound = async (soundElement) => {
        try {
            await soundElement.play(); // Memutar suara
        } catch (e) {
            console.error('Suara gagal diputar:', e);
        }
    };

    // Jika tombol "Iya" diklik
    yesButton.addEventListener("click", () => {
        if (!userInteracted) {
            userInteracted = true;
        }

        // Mainkan suara jika sudah berinteraksi
        playSound(yesSound);

        // Sembunyikan container pertanyaan
        questionContainer.classList.add("hidden");

        // Tambahkan kelas 'rotate' ke ikon matahari untuk memulai animasi
        sunIcon.classList.add("rotate");

        // Tampilkan kalender
        calendar.classList.remove("hidden");

        // Mengubah teks footer menjadi "Terima kasih cantik!" dan mulai mengetik
        footer.innerHTML = "<p>Terima kasih cantik!</p>"; // Teks muncul dulu
        footer.classList.add("thankyou"); // Memulai animasi mengetik
    });

    // Tombol "Ga" bergerak saat di-hover, namun tanpa suara
    noButton.addEventListener("mouseover", () => {
        if (!userInteracted) {
            userInteracted = true;
        }

        if (!hasMoved) {
            console.log("Tombol Ga mulai bergerak...");
            hasMoved = true; // Tandai bahwa tombol sudah bergerak
        }
        moveButton(noButton);
    });

    // Jika tombol "Ga" diklik, tanpa suara
    noButton.addEventListener("click", () => {
        if (hasMoved && userInteracted) {
            console.log("Tombol Ga diklik setelah bergerak...");
        }
    });

    // Kirim pesan ke WhatsApp
    sendWhatsApp.addEventListener("click", () => {
        const selectedDate = datePicker.value;
        if (selectedDate) {
            const phoneNumber = "081259543473";
            const message = `Hai! Saya mau jalan tanggal ${selectedDate}.`;
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        } else {
            alert("Silakan pilih tanggal terlebih dahulu!");
        }
    });

    // Fungsi untuk menggerakkan tombol secara acak
    function moveButton(button) {
        const randomX = Math.random() * (window.innerWidth - button.offsetWidth);
        const randomY = Math.random() * (window.innerHeight - button.offsetHeight);

        button.style.position = "absolute";
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
    }
});
