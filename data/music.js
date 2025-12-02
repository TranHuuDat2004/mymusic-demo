// data/music.js

const ALL_MUSIC_SECTIONS = [
    {
        id: "Vpop",
        title: "Nhạc Việt Nam",
        songs: [
            // {
            //     id: "fav1",
            //     title: "Bạc Phận",
            //     artistData: "Jack, K-ICM",
            //     displayArtist: { name: "Jack, K-ICM", id: "jack" },
            //     artUrl: "img/bac-phan.jpg",
            //     audioSrc: "audio/bac-phan.mp3",
            //     isFavorite: true,
            //     plays: "416.583.209" // Giữ lại giá trị cũ nếu bạn thích
            // },
            // {
            //     id: "fav2",
            //     title: "Sóng Gió",
            //     artistData: "Jack, K-ICM",
            //     displayArtist: { name: "Jack, K-ICM", id: "jack" },
            //     artUrl: "img/song-gio.png",
            //     audioSrc: "audio/song-gio.mp3",
            //     isFavorite: true,
            //     plays: "550.123.456" // Random
            // },
            {
                id: "fav3",
                title: "Thay Lòng",
                artistData: "Nal",
                displayArtist: { name: "Nal", id: "nal" },
                artUrl: "img/nal.png",
                audioSrc: "audio/thay-long-nal.mp3",
                isFavorite: false, // Ví dụ
                plays: "40.789.123" // Random
            },
            {
                id: "fav4",
                title: "Making My Way",
                artistData: "Sơn Tùng M-TP",
                displayArtist: { name: "Sơn Tùng MTP", id: "son-tung-mtp" },
                artUrl: "img/making-my-way.jpg",
                audioSrc: "audio/making-my-way.mp3",
                isFavorite: false, // Ví dụ
                plays: "85.321.678" // Random
            }

        ]
    },
    {
        id: "VpopRemix",
        title: "Nhạc Remix Cực Căng",
        songs: [

            {
                id: "fav5",
                title: "Tái Sinh Remix",
                artistData: "Tùng Dương",
                displayArtist: { name: "Tùng Dương", id: "tung-duong" },
                artUrl: "img/tai-sinh-remix.webp",
                audioSrc: "audio/tai-sinh-remix.mp3",
                isFavorite: false, // Ví dụ
                plays: "8.321.678" // Random
            },
            {
                id: "fav6",
                title: "Ải hồng nhan Remix",
                artistData: "Cần Vinh, Lee Ken",
                displayArtist: { name: "Cần Vinh, Lee Ken", id: "can-vinh" },
                artUrl: "img/ai-hong-nhan.jpg",
                audioSrc: "audio/ai-hong-nhan-remix.mp3",
                isFavorite: false, // Ví dụ
                plays: "8.456.798" // Random
            },
            {
                id: "fav10",
                title: "Khúc Vương Tình Remix ",
                artistData: "Cần Vinh, Lee Ken",
                displayArtist: { name: "Cần Vinh, Lee Ken", id: "can-vinh" },
                artUrl: "img/Khúc Vương Tình Remix (Cần Vinh, Lee Ken).png",
                audioSrc: "audio/Khúc Vương Tình Remix (Cần Vinh, Lee Ken).mp3",
                isFavorite: false, // Ví dụ
                plays: "8.321.678" // Random
            },
            {
                id: "fav7",
                title: "Nên Chờ Hay Nên Quên Remix",
                artistData: "Cần Vinh, Lee Ken",
                displayArtist: { name: "Chu Thúy Quỳnh", id: "chu-thuy-quynh" },
                artUrl: "img/Nên Chờ Hay Nên Quên Remix.png",
                audioSrc: "audio/Nên Chờ Hay Nên Quên Remix.mp3",
                isFavorite: false, // Ví dụ
                plays: "2.456.789" // Random
            },
            {
                id: "vpop_trucxinh",
                title: "Trúc Xinh",
                artistData: "Minh Vương M4U ft. Việt (ACV Remix)",
                displayArtist: { name: "Minh Vương M4U ft. Việt", id: "minhvuong-m4u-viet" },
                artUrl: "img/Trúc xinh.png", // Tên file từ ảnh bạn cung cấp
                audioSrc: "audio/Trúc xinh.mp3", // Tên file MP3 tương ứng
                isFavorite: false,
                plays: "1.234.567"
            },
            {
                id: "vpop_tralaithanhxuan",
                title: "Trả Lại Thanh Xuân Cho Em",
                artistData: "H2K (H2O Remix)",
                displayArtist: { name: "H2K", id: "h2k" },
                artUrl: "img/Trả Lại Thanh Xuân Cho Em.png",
                audioSrc: "audio/Trả Lại Thanh Xuân Cho Em.mp3",
                isFavorite: false,
                plays: "2.345.678"
            },
            {
                id: "vpop_ruoumung",
                title: "Rượu Mừng Hóa Người Dưng",
                artistData: "TLong (H2O Remix)",
                displayArtist: { name: "TLong", id: "tlong" },
                artUrl: "img/Rượu mừng hóa người dưng.png",
                audioSrc: "audio/Rượu mừng hóa người dưng.mp3",
                isFavorite: false,
                plays: "987.654"
            },
            {
                id: "vpop_nucuoi1820",
                title: "Nụ Cười 18 20",
                artistData: "Đoàn Hiếu (ACV Remix)",
                displayArtist: { name: "Đoàn Hiếu", id: "doan-hieu" },
                artUrl: "img/Nụ cười 18 20.png",
                audioSrc: "audio/nu-cuoi.mp3",
                isFavorite: false,
                plays: "1.876.543"
            },
            {
                id: "vpop_mayremix",
                title: "Mây (Remix)", // File list có "Mây Remix"
                artistData: "Jank & Sỹ Tây (Orinn Remix)",
                displayArtist: { name: "Jank & Sỹ Tây", id: "jank-sy-tay" },
                artUrl: "img/Mây Remix.png", // Giả sử tên file art là Mây Remix.png
                audioSrc: "audio/Mây Remix.mp3",
                isFavorite: false,
                plays: "2.109.876"
            },
            {
                id: "vpop_ketheoduoianhsang",
                title: "Kẻ Theo Đuổi Ánh Sáng",
                artistData: "Huy Vạc X Tiến Nguyễn (Orinn Remix)",
                displayArtist: { name: "Huy Vạc X Tiến Nguyễn", id: "huyvac-tiennguyen" },
                // File list là "Kẻ Theo Đuổi Ánh Sáng (Orinn Remix) - ....png"
                // Tôi sẽ chuẩn hóa tên file art và audio để đơn giản
                artUrl: "img/Kẻ Theo Đuổi Ánh Sáng.png",
                audioSrc: "audio/Kẻ Theo Đuổi Ánh Sáng.mp3",
                isFavorite: false,
                plays: "3.401.298"
            },
            {
                id: "vpop_dunglonhecoanhday",
                title: "Đừng Lo Nhé Có Anh Đây",
                artistData: "Thiên Tú (Orinn Remix)",
                displayArtist: { name: "Thiên Tú", id: "thien-tu" },
                artUrl: "img/Đừng lo nhé có anh đây.png",
                audioSrc: "audio/Đừng lo nhé có anh đây.mp3",
                isFavorite: false,
                plays: "2.567.111"
            },
            {
                id: "vpop_dauconday",
                title: "Đâu Còn Đây",
                artistData: "Lee Ken X Nal (Orinn Remix)",
                displayArtist: { name: "Lee Ken X Nal", id: "leeken-nal" },
                artUrl: "img/Đâu Còn Đây.png",
                audioSrc: "audio/Đâu-Còn-Đây.mp3",
                isFavorite: false,
                plays: "1.999.000"
            }
        ]
    },

    {
        id: "ElectronicEDM", // ID cho thể loại mới
        title: "Electronic & EDM", // Tên hiển thị
        songs: [
            {
                id: "edm_a_moment_apart",
                title: "A Moment Apart",
                artistData: "ODESZA",
                displayArtist: { name: "ODESZA", id: "odesza" }, // Tạo id mới cho ODESZA
                artUrl: "img/A Moment Apart.png",
                audioSrc: "audio/ODESZA - A Moment Apart.mp3",
                isFavorite: false,
                plays: "12.345.678"
            },
            // --- BẮT ĐẦU CÁC BÀI HÁT MỚI ---
            {
                id: "edm_faded",
                title: "Faded",
                artistData: "Alan Walker",
                displayArtist: { name: "Alan Walker", id: "alanwalker" },
                artUrl: "img/faded.png",
                audioSrc: "audio/Alan Walker - Faded (Lyrics).mp3",
                isFavorite: false,
                plays: "1.812.345.678" // ~1.8B
            },
            {
                id: "edm_lily",
                title: "Lily",
                artistData: "Alan Walker, K-391 & Emelie Hollow",
                displayArtist: { name: "Alan Walker", id: "alanwalker" },
                artUrl: "img/lily.jpg",
                audioSrc: "audio/Alan Walker, K-391 & Emelie Hollow - Lily (Lyrics).mp3",
                isFavorite: true,
                plays: "1.523.456.789" // ~1.5B
            },
            {
                id: "edm_spectre",
                title: "The Spectre",
                artistData: "Alan Walker",
                displayArtist: { name: "Alan Walker", id: "alanwalker" },
                artUrl: "img/spectre.jpg",
                audioSrc: "audio/Alan Walker - The Spectre (Lyrics).mp3",
                isFavorite: false,
                plays: "980.123.456" // ~980M
            },
            {
                id: "edm_all_falls_down",
                title: "All Falls Down",
                artistData: "Alan Walker ft. Noah Cyrus",
                displayArtist: { name: "Alan Walker", id: "alanwalker" },
                artUrl: "img/Alan_Walker_All_Falls_Down.jpg",
                audioSrc: "audio/Alan Walker - All Falls Down (feat. Noah Cyrus with Digital Farm Animals).mp3",
                isFavorite: false,
                plays: "550.987.123" // ~550M
            },
            {
                id: "edm_ignite",
                title: "Ignite",
                artistData: "K-391 & Alan Walker",
                displayArtist: { name: "K-391", id: "k391" },
                artUrl: "img/K-391-Ignite.png",
                audioSrc: "audio/K-391 & Alan Walker - Ignite (feat. Julie Bergan & Seungri).mp3",
                isFavorite: false,
                plays: "750.333.222" // ~750M
            },
            {
                id: "edm_on_on",
                title: "On & On",
                artistData: "Cartoon ft. Daniel Levi",
                displayArtist: { name: "Cartoon", id: "cartoon" },
                artUrl: "img/on&on.png",
                audioSrc: "audio/Cartoon, Jéja - On & On (Lyrics) feat. Daniel Levi.mp3",
                isFavorite: true,
                plays: "480.777.888" // ~480M
            },
            {
                id: "edm_way_back_home",
                title: "Way Back Home",
                artistData: "SHAUN ft. Conor Maynard (Sam Feldt Edit)",
                displayArtist: { name: "SHAUN", id: "shaun" },
                artUrl: "img/Way Back Home.jpg",
                audioSrc: "audio/SHAUN feat. Conor Maynard - Way Back Home (Lyrics) Sam Feldt Edit.mp3",
                isFavorite: false,
                plays: "420.123.999" // ~420M
            },
            {
                id: "vpop_ngau_hung",
                title: "Ngẫu Hứng",
                artistData: "Hoaprox",
                displayArtist: { name: "Hoaprox", id: "hoaprox" },
                artUrl: "img/ngau-hung.PNG",
                audioSrc: "audio/WITH YOU (NGẪU HỨNG) - HOAPROX, NICK STRAND & MIO - OFFICIAL MV.mp3",
                isFavorite: false,
                plays: "150.456.789" // ~150M
            },
            {
                id: "vpop_that_girl",
                title: "That Girl",
                artistData: "Olly Murs",
                displayArtist: { name: "Olly Murs", id: "ollymurs" },
                artUrl: "img/that girl.png",
                audioSrc: "audio/[Vietsub + Kara] That Girl - Olly Murs (lyrics) - Tik Tok.mp3",
                isFavorite: false,
                plays: "120.987.654" // ~120M
            }
        ]
    },

    {
        id: "lycorisrecoil", // ID cho thể loại
        title: "Lycoris Recoil OST", // Tên hiển thị cho thể loại
        songs: [
            {
                id: "lyco_alive", // ID bài hát duy nhất
                title: "ALIVE",
                artistData: "ClariS",
                displayArtist: { name: "ClariS", id: "claris" },
                artUrl: "img/ALIVE.png", // Giả sử file ALIVE.PNG của bạn tên là vậy
                audioSrc: "audio/ALIVE.mp3", // Đường dẫn tới file MP3
                isFavorite: false,
                plays: "15.234.567" // Random
            },
            {
                id: "lyco_tower",
                title: "Tower of Flower", // Tên gốc là 花の塔 (Hana no Tou)
                artistData: "Sayuri",
                displayArtist: { name: "Sayuri", id: "sayuri" },
                artUrl: "img/Tower of Flower.png", // Ảnh bìa giả định, bạn cần có file này
                audioSrc: "audio/Tower of Flower.mp3",
                isFavorite: false,
                plays: "22.987.654" // Random
            },
            {
                id: "lyco_alive_inst",
                title: "ALIVE (Instrumental)",
                artistData: "ClariS", // Hoặc tên nhà soạn nhạc Shuhei Mutsuki
                displayArtist: { name: "ClariS", id: "claris" }, // Hoặc { name: "Shuhei Mutsuki", id: "shuhei-mutsuki"}
                artUrl: "img/ALIVE-Instrumental.jpg", // Thường dùng chung art với bản gốc
                audioSrc: "audio/ALIVE-Instrumental.mp3",
                isFavorite: false,
                plays: "5.876.123" // Random
            },

            {
                id: "lyco_tower_inst",
                title: "Tower of Flower (Instrumental)",
                artistData: "Sayuri", // Hoặc tên nhà soạn nhạc Ryo Eguchi
                displayArtist: { name: "Sayuri", id: "sayuri" }, // Hoặc { name: "Ryo Eguchi", id: "ryo-eguchi" }
                artUrl: "img/Tower of Flower instrumental.jpg", // Thường dùng chung art với bản gốc
                audioSrc: "audio/Tower of Flower instrumental.mp3",
                isFavorite: false,
                plays: "8.123.456" // Random
            }
        ]
    },
    {
        id: "Mahiru",
        title: "Thiên sứ nhà bên - Mahiru",
        songs: [
            {
                id: "mahiru1",
                title: "小さな恋のうた",
                artistData: "椎名真昼 (CV: 石見舞菜香)",
                displayArtist: { name: "椎名真昼 (CV: 石見舞菜香)", id: "MahiruShiina" },
                artUrl: "img/mahiru1.png",
                audioSrc: "audio/mahiru_ed1.mp3",
                isFavorite: true,
                plays: "4.258.910" // Random
            },
            {
                id: "mahiru2",
                title: "愛唄",
                artistData: "椎名真昼 (CV: 石見舞菜香)",
                displayArtist: { name: "椎名真昼 (CV: 石見舞菜香)", id: "MahiruShiina" },
                artUrl: "img/mahiru2.png",
                audioSrc: "audio/mahiru_ed2.mp3",
                isFavorite: true,
                plays: "3.789.552" // Random
            },
            {
                id: "mahiru3",
                title: "君に届け",
                artistData: "椎名真昼 (CV: 石見舞菜香)",
                displayArtist: { name: "椎名真昼 (CV: 石見舞菜香)", id: "MahiruShiina" },
                artUrl: "img/mahiru3.png",
                audioSrc: "audio/mahiru_ed3.mp3",
                isFavorite: true,
                plays: "5.102.304" // Random
            },
            {
                id: "mahiru4",
                title: "君に届け - Instrumental",
                artistData: "Instrumental",
                displayArtist: { name: "椎名真昼 (CV: 石見舞菜香)", id: "MahiruShiina" },
                artUrl: "img/mahiru4.png",
                audioSrc: "audio/mahiru_ed3_Instrumental.mp3",
                isFavorite: true,
                plays: "1.567.890" // Random
            },
            {
                id: "mahiru5",
                title: "ギフト - Pf Solo ver.",
                artistData: "Instrumental",
                displayArtist: { name: "椎名真昼 (CV: 石見舞菜香)", id: "MahiruShiina" },
                artUrl: "img/mahiru_gift.png",
                audioSrc: "audio/mahiru_gift.mp3",
                isFavorite: true,
                plays: "467.790" // Random
            },
            {
                id: "mahiru6",
                title: "君に届け - Piano.",
                artistData: "Instrumental",
                displayArtist: { name: "Instrumental", id: "MahiruShiina" },
                artUrl: "img/mahiru5.png",
                audioSrc: "audio/mahiru_ed3_piano.mp3",
                isFavorite: true,
                plays: "167.123" // Random
            },
            {
                id: "mahiru7",
                title: "Little Love Song",
                artistData: "Ru's Piano Ru味春捲",
                displayArtist: { name: "Ru's Piano Ru味春捲", id: "MahiruShiina" },
                artUrl: "img/mahiru6.png",
                audioSrc: "audio/Little_Love_Song.mp3",
                isFavorite: true,
                plays: "1.134.892" // Random
            }
        ]
    },
    {
        id: "SummerPockets",
        title: "Summer Pockets - OST & Vocal",
        songs: [
            {
                id: "sp1",
                title: "アルカレイド (Alkaleido)",
                artistData: "鈴木このみ (Konomi Suzuki)",
                displayArtist: { name: "Konomi Suzuki", id: "KonomiSuzuki" },
                artUrl: "img/summer_pockets_op.png",
                audioSrc: "audio/summer_pockets_op.mp3",
                isFavorite: true,
                plays: "4.481.234" // Random
            },
            {
                id: "sp2",
                title: "Lasting Moment",
                artistData: "鈴木このみ (Konomi Suzuki)",
                displayArtist: { name: "Konomi Suzuki", id: "KonomiSuzuki" },
                artUrl: "img/Tsumugi.png",
                audioSrc: "audio/summer_pockets_ed.mp3",
                isFavorite: false, // Ví dụ
                plays: "5.356.789" // Random
            },
            {
                id: "sp3",
                title: "羽のゆりかご",
                artistData: "水谷瑠奈 (NanosizeMir)",
                displayArtist: { name: "水谷瑠奈 (NanosizeMir)", id: "RunaMizutani" },
                artUrl: "img/Hane no Yurikago.png",
                audioSrc: "audio/Hane no Yurikago.mp3",
                isFavorite: false, // Ví dụ
                plays: "2.987.654" // Random
            },
            {
                id: "sp4",
                title: "Sea, You & Me",
                artistData: "紬ヴェンダース (CV: 岩井映美里)",
                displayArtist: { name: "紬ヴェンダース", id: "TsumugiWenders" },
                artUrl: "img/Tsumugi.png",
                audioSrc: "audio/Tsumugi.mp3",
                isFavorite: true, // Ví dụ
                plays: "1.205.333" // Random
            },
            {
                id: "sp5",
                title: "Hamu 20th Anniversary", // Có thể đổi tên thành "Summer Pockets Theme (Hamu 20th Ver.)"
                artistData: "Instrumental",
                displayArtist: { name: "Key Sound Label", id: "KeySoundLabel" },
                artUrl: "img/key20th.png",
                audioSrc: "audio/summer_pockets_op_20th_Key.mp3",
                isFavorite: false, // Ví dụ
                plays: "987.654" // Random
            },
            {
                id: "sp6",
                title: "アスタロア (Asterlore)",
                artistData: "riya (eufonius)",
                displayArtist: { name: "riya (eufonius)", id: "riyaEufonius" },
                artUrl: "img/Summer_Pockets_Asterlore.png",
                audioSrc: "audio/Summer_Pockets_Asterlore.mp3",
                isFavorite: true, // Ví dụ
                plays: "3.015.888" // Random
            },
            {
                id: "sp7",
                title: "羽のゆりかご - Instrumental",
                artistData: "水谷瑠奈 (NanosizeMir)",
                displayArtist: { name: "水谷瑠奈 (NanosizeMir)", id: "RunaMizutani" },
                artUrl: "img/Hane no Yurikago Instrumental.png",
                audioSrc: "audio/Hane no Yurikago Instrumental.mp3",
                isFavorite: false, // Ví dụ
                plays: "223.654" // Random
            }
        ]
    },

    {
        id: "ConanMovie",
        title: "Conan Movie ", // Tên hiển thị cho playlist/section
        songs: [
            {
                id: "conan28",
                title: "TWILIGHT",
                artistData: "King Gnu",
                displayArtist: { name: "King Gnu", id: "KingGnu" }, // Tái sử dụng id của HOYO-MiX
                artUrl: "img/conan28.jpg", // Dựa trên file robin.png
                audioSrc: "audio/TWILIGHT.mp3", // Dựa trên tên file
                isFavorite: false,
                plays: "9.876.543"
            },
            {
                id: "conan26",
                title: "Utsukushii Hire",
                artistData: "Spitz",
                displayArtist: { name: "Spitz ", id: "Spitz" }, // Tái sử dụng id của HOYO-MiX
                artUrl: "img/Utsukushii Hire.jpg", // Dựa trên file robin.png
                audioSrc: "audio/Utsukushii Hire.mp3", // Dựa trên tên file
                isFavorite: false,
                plays: "9.876.543"
            },
        ]
    },

    {
        "id": "KaguyaSama",
        "title": "Kaguya-sama: Love Is War",
        "songs": [
            {
                "id": "kaguya01",
                "title": "Sentimental Crisis",
                "artistData": "halca",
                "displayArtist": {
                    "name": "halca",
                    "id": "halca"
                },
                "artUrl": "img/love is war.jpg",
                "audioSrc": "audio/Sentimental Crisis.mp3",
                "isFavorite": true,
                "plays": "8,412,991"
            },
            {
                "id": "kaguya02",
                "title": "Sentimental Crisis (Instrumental)",
                "artistData": "Ryuhei Yamada",
                "displayArtist": {
                    "name": "Ryuhei Yamada",
                    "id": "RyuheiYamada"
                },
                "artUrl": "img/love is war.jpg",
                "audioSrc": "audio/Sentimental Crisis (Instrumental).mp3",
                "isFavorite": false,
                "plays": "2,157,304"
            },
            {
                "id": "kaguya03",
                "title": "Heart Notes",
                "artistData": "Airi Suzuki",
                "displayArtist": {
                    "name": "Airi Suzuki",
                    "id": "AiriSuzuki"
                },
                "artUrl": "img/kaguya.png",
                "audioSrc": "audio/heart-notes.mp3",
                "isFavorite": false,
                "plays": "2,157,311"
            }
        ]
    },
    {
        "id": "KaguyaSamaPianoEP",
        "title": "Kaguya - Sama: Love Is War - Piano Reflections - EP",
        "songs": [
            {
                "id": "kaguya_piano_01",
                "title": "Kansetsu Ki (Main Theme)",
                "artistData": "Torby Brand",
                "displayArtist": {
                    "name": "Torby Brand",
                    "id": "TorbyBrand"
                },
                "artUrl": "img/hayasaka-wallpaper1.jpg",
                "audioSrc": "audio/main theme.mp3",
                "isFavorite": false
            },
            {
                "id": "kaguya_piano_02",
                "title": "Sentimental Crisis Piano",
                "artistData": "Torby Brand",
                "displayArtist": {
                    "name": "Torby Brand",
                    "id": "TorbyBrand"
                },
                "artUrl": "img/hayasaka-wallpaper2.jpg",
                "audioSrc": "audio/Sentimental Crisis piano.mp3",
                "isFavorite": true
            },
            {
                "id": "kaguya_piano_03",
                "title": "Kaze Ni Fukarete",
                "artistData": "Torby Brand",
                "displayArtist": {
                    "name": "Torby Brand",
                    "id": "TorbyBrand"
                },
                "artUrl": "img/kaguya-wallpaper.jpeg",
                "audioSrc": "audio/Kaze Ni Fukarete.mp3",
                "isFavorite": false
            },
            {
                "id": "kaguya_piano_04",
                "title": "Heart Ha Oteage",
                "artistData": "Torby Brand",
                "displayArtist": {
                    "name": "Torby Brand",
                    "id": "TorbyBrand"
                },
                "artUrl": "img/kaguya-minimalist3.png",
                "audioSrc": "audio/Heart ha oteage.mp3",
                "isFavorite": true
            },
            {
                "id": "kaguya_piano_05",
                "title": "Heart Notes",
                "artistData": "Torby Brand",
                "displayArtist": {
                    "name": "Torby Brand",
                    "id": "TorbyBrand"
                },
                "artUrl": "img/kaguya-minimalist2.png",
                "audioSrc": "audio/heart note.mp3",
                "isFavorite": true
            },
            {
                "id": "kaguya_piano_06",
                "title": "That Kind of Summer",
                "artistData": "Torby Brand",
                "displayArtist": {
                    "name": "Torby Brand",
                    "id": "TorbyBrand"
                },
                "artUrl": "img/kaguya-minimalist.png",
                "audioSrc": "audio/the kind of summer.mp3",
                "isFavorite": false
            }
        ]
    },
    {
        "id": "GotoubunNoHanayomeEP",
        "title": "Gotoubun no Hanayome Collection",
        "songs": [
            {
                "id": "gotoubun_01",
                "title": "Hatsukoi - Strings & Piano Arrange",
                "artistData": "Nakano-ke no Itsutsugo",
                "displayArtist": {
                    "name": "Nakano-ke no Itsutsugo",
                    "id": "NakanoQuint"
                },
                "artUrl": "img/Miku.jpeg",
                "audioSrc": "audio/Hatsukoi - Strings & Piano Arrange.mp3",
                "isFavorite": true
            },
            {
                "id": "gotoubun_02",
                "title": "Arigatou no Hana (Orchestra)",
                "artistData": "Nakano-ke no Itsutsugo",
                "displayArtist": {
                    "name": "Nakano-ke no Itsutsugo",
                    "id": "NakanoQuint"
                },
                "artUrl": "img/Arigatou no Hana (Orchestra).jpg",
                "audioSrc": "audio/Arigatou no Hana (Orchestra).mp3",
                "isFavorite": false
            },
            {
                "id": "gotoubun_03",
                "title": "Arigatou no Hana (Cover)",
                "artistData": "Nakano-ke no Itsutsugo",
                "displayArtist": {
                    "name": "Nakano-ke no Itsutsugo",
                    "id": "NakanoQuint"
                },
                "artUrl": "img/Nino.jpeg",
                "audioSrc": "audio/Arigatou no Hana (Cover).mp3",
                "isFavorite": false
            },
            {
                "id": "gotoubun_04",
                "title": "Arigatou no Hana (Original)",
                "artistData": "Nakano-ke no Itsutsugo",
                "displayArtist": {
                    "name": "Nakano-ke no Itsutsugo",
                    "id": "NakanoQuint"
                },
                "artUrl": "img/gotorbun.jpg",
                "audioSrc": "audio/Arigatou no Hana.mp3",
                "isFavorite": true
            },
            {
                "id": "gotoubun_05",
                "title": "Hatsukoi (Instrumental)",
                "artistData": "Nakano-ke no Itsutsugo",
                "displayArtist": {
                    "name": "Nakano-ke no Itsutsugo",
                    "id": "NakanoQuint"
                },
                "artUrl": "img/Hatsukoi.png",
                "audioSrc": "audio/Hatsukoi (Instrumental).mp3",
                "isFavorite": false
            },
            {
                "id": "gotoubun_06",
                "title": "Arigatou no Hana (Instrumental)",
                "artistData": "Nakano-ke no Itsutsugo",
                "displayArtist": {
                    "name": "Nakano-ke no Itsutsugo",
                    "id": "NakanoQuint"
                },
                "artUrl": "img/Arigatou no Hana.png",
                "audioSrc": "audio/Arigatou no Hana (Instrumental).mp3",
                "isFavorite": false
            }
        ]
    }
    // Dán toàn bộ khối mã này vào trong mảng ALL_MUSIC_SECTIONS của file data/music.js


];

// Nếu dùng ES Modules: export { ALL_MUSIC_SECTIONS };