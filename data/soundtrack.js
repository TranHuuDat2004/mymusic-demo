const ALL_MUSIC_SECTIONS = [
    {
        id: "GenshinImpactOST",
        title: "Genshin Impact - Original Soundtrack",
        songs: [
            {
                id: "gi1",
                title: "Hanachirusato",
                artistData: "HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/hanachirusato.png",
                audioSrc: "audio/hanachirusato.mp3",
                isFavorite: true,
                plays: "3.105.721"
            },
            {
                id: "gi2",
                title: "Fragile Fantasy",
                artistData: "HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/fragile_fantasy.png",
                audioSrc: "audio/fragile_fantasy.mp3",
                isFavorite: false,
                plays: "2.876.543"
            },
            {
                id: "gi3",
                title: "Genshin Impact Main Theme",
                artistData: "HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/genshin_impact_main_theme.png",
                audioSrc: "audio/genshin_impact_main_theme.mp3",
                isFavorite: true,
                plays: "10.543.210"
            },
            {
                id: "gi4",
                title: "Rapid as Wildfires",
                artistData: "HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/rapid_as_wildfires.png",
                audioSrc: "audio/rapid_as_wildfires.mp3",
                isFavorite: false,
                plays: "1.987.321"
            },
            {
                id: "gi5",
                title: "Fleeting Colors in Flight",
                artistData: "HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/fleeting_colors_in_flight.png",
                audioSrc: "audio/fleeting_colors_in_flight.mp3",
                isFavorite: true,
                plays: "4.001.888"
            },
            {
                id: "gi6",
                title: "Immaculate Ardency",
                artistData: "HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/immaculate_ardency.png",
                audioSrc: "audio/immaculate_ardency.mp3",
                isFavorite: false,
                plays: "2.345.678"
            },
            {
                id: "gi7",
                title: "A Memory Fancy", // Giữ title dễ đọc
                artistData: "HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/a_memory_fancy.png", // Giữ nguyên tên file từ ảnh
                audioSrc: "audio/a_memory_fancy.mp3", // Giữ nguyên tên file từ ảnh
                isFavorite: true,
                plays: "1.500.900"
            }
        ]
    },
    // Dán khối này vào trong mảng ALL_MUSIC_SECTIONS của file data/music.js

    {
        id: "HonkaiStarRailOST",
        title: "Honkai: Star Rail", // Tên hiển thị cho playlist/section
        songs: [
            {
                id: "hsr_if_i_can_stop",
                title: "If I Can Stop One Heart From Breaking",
                artistData: "Robin, HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" }, // Tái sử dụng id của HOYO-MiX
                artUrl: "img/robin3.png", // Dựa trên file robin.png
                audioSrc: "audio/If I Can Stop One Heart From Breaking.mp3", // Dựa trên tên file
                isFavorite: false,
                plays: "9.876.543"
            },
            {
                id: "hsr_hope_is_a_thing",
                title: "Hope Is the Thing With Feathers",
                artistData: "HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/robin.png", // Dựa trên file robin2.png
                audioSrc: "audio/Hope Is the Thing With Feathers.mp3",
                isFavorite: false,
                plays: "8.765.432"
            },
            {
                id: "hsr_sway_to_my_beat",
                title: "Sway to My Beat in Cosmos",
                artistData: "HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/robin.png", // Dựa trên file robin3.png
                audioSrc: "audio/Sway to My Beat in Cosmos.mp3",
                isFavorite: false,
                plays: "7.654.321"
            },
            {
                id: "hsr_had_i_not_seen",
                title: "Had I Not Seen the Sun",
                artistData: "HOYO-MiX",
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/robin2.png", // Tạm thời dùng chung ảnh bìa, bạn có thể thay đổi
                audioSrc: "audio/Had I Not Seen the Sun.mp3",
                isFavorite: false,
                plays: "6.543.210"
            },
            {
                id: "edm_proi_proi",
                title: "Proi Proi",
                artistData: "HOYO-MiX", // Giả định tác giả là HOYO-MiX
                displayArtist: { name: "HOYO-MiX", id: "HOYOMiX" },
                artUrl: "img/proi proi.png", // Dựa trên file proi proi.png
                audioSrc: "audio/Proi Proi.mp3",
                isFavorite: false,
                plays: "5.432.109"
            },
        ]
    },


    {
        id: "UmaMusumeOST",
        title: "Uma Musume OST",
        songs: [
            {
                id: "uma1",
                title: "Make Debut!",
                artistData: "Azumi Waki",
                displayArtist: { name: "Azumi Waki", id: "AzumiWaki" }, // Tái sử dụng id của HOYO-MiX
                artUrl: "img/make debut.png", // Dựa trên file robin.png
                audioSrc: "audio/make debut.mp3", // Dựa trên tên file
                isFavorite: false,
                plays: "9.876.543"
            },
            {
                id: "uma2",
                title: "G1 & URA Finals",
                artistData: "Azumi Waki",
                displayArtist: { name: "Azumi Waki", id: "AzumiWaki" }, // Tái sử dụng id của HOYO-MiX
                artUrl: "img/G1 & URA Finals.jpg", // Dựa trên file robin.png
                audioSrc: "audio/G1 & URA Finals.mp3", // Dựa trên tên file
                isFavorite: false,
                plays: "9.876.543"
            },
            {
                id: "uma3",
                title: "Character Gacha",
                artistData: "Azumi Waki",
                displayArtist: { name: "Azumi Waki", id: "AzumiWaki" }, // Tái sử dụng id của HOYO-MiX
                artUrl: "img/Character Gacha.png", // Dựa trên file robin.png
                audioSrc: "audio/Character Gacha.mp3", // Dựa trên tên file
                isFavorite: false,
                plays: "9.876.543"
            },
            {
                id: "uma4",
                title: "GI Race & URA qualifiers",
                artistData: "Azumi Waki",
                displayArtist: { name: "Azumi Waki", id: "AzumiWaki" }, // Tái sử dụng id của HOYO-MiX
                artUrl: "img/GI Race URA qualifiers.png", // Dựa trên file robin.png
                audioSrc: "audio/GI Race URA qualifiers.mp3", // Dựa trên tên file
                isFavorite: false,
                plays: "9.876.543"
            },
            {
                id: "uma5",
                title: "Arima Kinen & Japan Derby",
                artistData: "Azumi Waki",
                displayArtist: { name: "Azumi Waki", id: "AzumiWaki" }, // Tái sử dụng id của HOYO-MiX
                artUrl: "img/Arima Kinen Japan Derby.png", // Dựa trên file robin.png
                audioSrc: "audio/Arima Kinen Japan Derby.mp3", // Dựa trên tên file
                isFavorite: false,
                plays: "9.876.543"
            },
            {
                id: "uma6",
                title: "The begin story",
                artistData: "Azumi Waki",
                displayArtist: { name: "Azumi Waki", id: "AzumiWaki" }, // Tái sử dụng id của HOYO-MiX
                artUrl: "img/The begin story.png", // Dựa trên file robin.png
                audioSrc: "audio/The begin story.mp3", // Dựa trên tên file
                isFavorite: false,
                plays: "9.876.543"
            },
        ]
    },
    {
        id: "BlueArchiveOST",
        title: "Blue Archive - Original Soundtrack",
        songs: [
            {
                id: "ba1",
                title: "Memories Of Kindness",
                artistData: "NEXON Games",
                displayArtist: { name: "NEXON Games", id: "NEXONGames" },
                artUrl: "img/memories_of_kindness.png",
                audioSrc: "audio/memories_of_kindness.mp3",
                isFavorite: true,
                plays: "2.501.337"
            },
            {
                id: "ba2",
                title: "Luminous Memory",
                artistData: "NEXON Games",
                displayArtist: { name: "NEXON Games", id: "NEXONGames" },
                artUrl: "img/Luminous_Memory.png",
                audioSrc: "audio/Luminous Memory.mp3",
                isFavorite: false,
                plays: "1.987.654"
            },
            {
                id: "ba3",
                title: "Seishun No Archive",
                artistData: "NEXON Games",
                displayArtist: { name: "NEXON Games", id: "NEXONGames" },
                artUrl: "img/Seishun_No_Archive.png",
                audioSrc: "audio/Seishun_No_Archive.mp3",
                isFavorite: true,
                plays: "3.015.888"
            },
            {
                id: "ba4",
                title: "Seishun No Archive (Instrumental)", // Thêm (Instrumental) vào title
                artistData: "NEXON Games",
                displayArtist: { name: "NEXON Games", id: "NEXONGames" },
                artUrl: "img/Seishun_No_Archive.png", // Dùng chung art với bản gốc
                audioSrc: "audio/Seishun_No_Archive Instrumental.mp3", // Tên file có dấu cách
                isFavorite: false,
                plays: "1.203.405"
            },
            {
                id: "ba5",
                title: "Constant Moderato Anime",
                artistData: "NEXON Games",
                displayArtist: { name: "NEXON Games", id: "NEXONGames" },
                artUrl: "img/Constant_Moderato_Anime.png",
                audioSrc: "audio/Constant_Moderato_Anime.mp3",
                isFavorite: true,
                plays: "2.777.999"
            }
        ]
    },
    {
        id: "RedAlert3",
        title: "Red Alert 3 Soundtrack",
        songs: [
            {
                id: "ra3_01",
                title: "Mecha Storm",
                artistData: "James Hannigan & Frank Klepacki",
                displayArtist: { name: "James Hannigan & Frank Klepacki", id: "RedAlert3Composers" },
                artUrl: "img/Mecha Storm.png",
                audioSrc: "audio/Mecha Storm.mp3",
                isFavorite: false,
                plays: "1,851,400"
            },
            {
                id: "ra3_02",
                title: "Celestial March",
                artistData: "James Hannigan & Frank Klepacki",
                displayArtist: { name: "James Hannigan & Frank Klepacki", id: "RedAlert3Composers" },
                artUrl: "img/Celestial March.png",
                audioSrc: "audio/Celestial March.mp3",
                isFavorite: true,
                plays: "4,523,112"
            },
            {
                id: "ra3_03",
                title: "Battleground of the Bear",
                artistData: "James Hannigan & Frank Klepacki",
                displayArtist: { name: "James Hannigan & Frank Klepacki", id: "RedAlert3Composers" },
                artUrl: "img/Battleground of the Bear.png",
                audioSrc: "audio/Battleground of the Bear.mp3",
                isFavorite: false,
                plays: "3,874,980"
            },
            {
                id: "ra3_04",
                title: "Red Rock for Mother Russia",
                artistData: "James Hannigan & Frank Klepacki",
                displayArtist: { name: "James Hannigan & Frank Klepacki", id: "RedAlert3Composers" },
                artUrl: "img/Red Rock for Mother Russia.png",
                audioSrc: "audio/Red Rock for Mother Russia.mp3",
                isFavorite: false,
                plays: "4,019,234"
            },
            {
                id: "ra3_05",
                title: "Rock and Awe",
                artistData: "James Hannigan & Frank Klepacki",
                displayArtist: { name: "James Hannigan & Frank Klepacki", id: "RedAlert3Composers" },
                artUrl: "img/Rock and Awe.png",
                audioSrc: "audio/Rock and Awe.mp3",
                isFavorite: false,
                plays: "4,382,567"
            },
            {
                id: "ra3_06",
                title: "Bring It!",
                artistData: "James Hannigan & Frank Klepacki",
                displayArtist: { name: "James Hannigan & Frank Klepacki", id: "RedAlert3Composers" },
                artUrl: "img/Bring It!.png",
                audioSrc: "audio/Bring It!.mp3",
                isFavorite: true,
                plays: "4,682,789"
            },
            {
                id: "ra3_07",
                title: "The Empire Strikes",
                artistData: "James Hannigan & Frank Klepacki",
                displayArtist: { name: "James Hannigan & Frank Klepacki", id: "RedAlert3Composers" },
                artUrl: "img/red alert 3.png",
                audioSrc: "audio/The Empire Strikes.mp3",
                isFavorite: false,
                plays: "3,746,115"
            }
        ]
    },
    {
        id: "Garena",
        title: "Garena OST",
        songs: [
            {
                "id": "lqm01",
                "title": "Nhạc nền Tết 2021",
                "artistData": "Liên Quân Mobile",
                "displayArtist": { "name": "Liên Quân Mobile", "id": "LienQuanMobile" },
                "artUrl": "img/tet2021.png",
                "audioSrc": "audio/Nhạc nền sảnh Tết 2021.mp3",
                "isFavorite": true,
                "plays": "4,102,338"
            },
            {
                "id": "lqm01-remix",
                "title": "(Remix) Nhạc nền Tết 2021",
                "artistData": "Liên Quân Mobile",
                "displayArtist": { "name": "Liên Quân Mobile", "id": "LienQuanMobile" },
                "artUrl": "img/tet2021.png",
                "audioSrc": "audio/(Remix) Nhạc nền Tết 2021.mp3",
                "isFavorite": true,
                "plays": "4,102,338"
            },
            {
                "id": "lqm02",
                "title": "Nhạc nền Tết 2022",
                "artistData": "Liên Quân Mobile",
                "displayArtist": { "name": "Liên Quân Mobile", "id": "LienQuanMobile" },
                "artUrl": "img/tet2022.png",
                "audioSrc": "audio/Nhạc nền sảnh Tết 2022.mp3",
                "isFavorite": false,
                "plays": "3,511,890"
            },
            {
                "id": "lqm03",
                "title": "(Remix) Yorn Long Thần Soái ",
                "artistData": "Liên Quân Mobile",
                "displayArtist": { "name": "Liên Quân Mobile", "id": "LienQuanMobile" },
                "artUrl": "img/yorn.png",
                "audioSrc": "audio/Yorn Long Thần Soái - (Remix).mp3",
                "isFavorite": false,
                "plays": "2,109,450"
            },
            {
                "id": "lqm04",
                "title": "(Cover) Yorn Long Thần Soái ",
                "artistData": "Liên Quân Mobile",
                "displayArtist": { "name": "Liên Quân Mobile", "id": "LienQuanMobile" },
                "artUrl": "img/yorn.png",
                "audioSrc": "audio/Yorn Long Thần Soái - (Cover).mp3",
                "isFavorite": true,
                "plays": "3,882,104"
            },
            {
                "id": "lqm05",
                "title": "Nhạc Nền Mùa 9 - Yorn Long Thần Soái",
                "artistData": "Liên Quân Mobile",
                "displayArtist": { "name": "Liên Quân Mobile", "id": "LienQuanMobile" },
                "artUrl": "img/yorn.png",
                "audioSrc": "audio/Nhạc Nền Mùa 9 - Yorn Long Thần Soái - Liên Quân Mobile.mp3",
                "isFavorite": false,
                "plays": "2,995,312"
            },
            {
                "id": "ff01",
                "title": "Booyah Day OST (Cover)",
                "artistData": "Garena Free Fire",
                "displayArtist": { "name": "Garena Free Fire", "id": "FreeFire" },
                "artUrl": "img/freefire.png",
                "audioSrc": "audio/Garena Free Fire - Booyah Day  OST cover.mp3",
                "isFavorite": true,
                "plays": "2,891,447"
            },
            {
                "id": "ff02",
                "title": "Booyah Day OST (Remix)",
                "artistData": "Garena Free Fire",
                "displayArtist": { "name": "Garena Free Fire", "id": "FreeFire" },
                "artUrl": "img/freefire.png",
                "audioSrc": "audio/Garena Free Fire - Booyah Day OST remix.mp3",
                "isFavorite": false,
                "plays": "3,918,201"
            },
            {
                "id": "ff03",
                "title": "Booyah Day (Theme Song)",
                "artistData": "Garena Free Fire",
                "displayArtist": { "name": "Garena Free Fire", "id": "FreeFire" },
                "artUrl": "img/freefire.png",
                "audioSrc": "audio/Garena Free Fire - Booyah Day ( Theme Song ) OST - Sinister FF.mp3",
                "isFavorite": true,
                "plays": "2,015,773"
            }]
    },
    {
        id: "SUNO",
        title: "Remix by SUNO",
        songs: [
            {
                id: "suno1",
                title: "CI4 - Wave 1 (Cover)",
                artistData: "SUNO AI",
                displayArtist: { name: "SUNO AI", id: "SUNO-AI" },
                artUrl: "img/ci_cover_uo.jpg",
                audioSrc: "audio/wave1 (Cover).mp3",
                isFavorite: true,
                plays: "2.501.337"
            },
            {
                id: "suno2",
                title: "CI4 - Wave 2 (Cover)",
                artistData: "SUNO AI",
                displayArtist: { name: "SUNO AI", id: "SUNO-AI" },
                artUrl: "img/ci_cover_uo.jpg",
                audioSrc: "audio/wave2 (Cover).mp3",
                isFavorite: true,
                plays: "2.501.337"
            },
            {
                id: "suno3",
                title: "CI4 - Wave 3 (Cover)",
                artistData: "SUNO AI",
                displayArtist: { name: "SUNO AI", id: "SUNO-AI" },
                artUrl: "img/ci_cover_uo.jpg",
                audioSrc: "audio/wave3 (Cover).mp3",
                isFavorite: true,
                plays: "2.501.337"
            },
            {
                id: "suno4",
                title: "G1 - Uma Musume (Cover)",
                artistData: "SUNO AI",
                displayArtist: { name: "SUNO AI", id: "SUNO-AI" },
                artUrl: "img/The begin story.png",
                audioSrc: "audio/G1 (Cover).mp3",
                isFavorite: true,
                plays: "2.501.337"
            },
            {
                id: "suno5",
                title: "Immaculate Ardency (Extended)",
                artistData: "SUNO AI",
                displayArtist: { name: "SUNO AI", id: "SUNO-AI" },
                artUrl: "img/immaculate_ardency.png",
                audioSrc: "audio/immaculate_ardency (Extended).mp3",
                isFavorite: true,
                plays: "2.501.337"
            }, {
                id: "suno6",
                title: "Luminous Memory (Cover).mp3",
                artistData: "SUNO AI",
                displayArtist: { name: "SUNO AI", id: "SUNO-AI" },
                artUrl: "img/Luminous_Memory.png",
                audioSrc: "audio/Luminous Memory (Cover).mp3",
                isFavorite: true,
                plays: "2.501.337"
            }, {
                id: "suno7",
                title: "(Cover) Constant Moderato Anime",
                artistData: "SUNO AI",
                displayArtist: { name: "SUNO AI", id: "SUNO-AI" },
                artUrl: "img/Constant_Moderato_Anime.png",
                audioSrc: "audio/Constant_Moderato_Anime (Cover).mp3",
                isFavorite: true,
                plays: "2.777.999"
            }, {
                id: "suno8",
                title: "(Extended) Constant Moderato Anime",
                artistData: "SUNO AI",
                displayArtist: { name: "SUNO AI", id: "SUNO-AI" },
                artUrl: "img/Constant_Moderato_Anime.png",
                audioSrc: "audio/Constant_Moderato_Anime (Extended).mp3",
                isFavorite: true,
                plays: "2.777.999"
            },

        ]
    },
    {
        id: "CIRotY",
        title: "Chicken Invaders - Revenge of the Yolk",
        songs: [
            {
                id: "ci_roty_1", title: "Main Theme - Coq Au Ran", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_roty.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 01 - Revenge of the Yolk - Main Theme - Coq Au Ran.mp3",
                plays: "1.234.567"
            },
            {
                id: "ci_roty_2", title: "Mission 1 - Bird In A Daze", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_roty.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 02 - Revenge of the Yolk - Mission 1 - Bird In A Daze.mp3",
                plays: "987.654"
            },
            {
                id: "ci_roty_3", title: "Mission 2 - Taking The Pizz", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_roty.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 03 - Revenge of the Yolk - Mission 2 - Taking The Pizz.mp3",
                plays: "876.543"
            },
            {
                id: "ci_roty_4", title: "Mission 3 - 633 Squawkdron", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_roty.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 04 - Revenge of the Yolk - Mission 3 - 633 Squawkdron.mp3",
                plays: "765.432"
            },
            {
                id: "ci_roty_5", title: "Boss Fight - Zimmer's Frame", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_roty.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 05 - Revenge of the Yolk - Boss Fight - Zimmer's Frame.mp3",
                plays: "1.123.456"
            },
            {
                id: "ci_roty_6", title: "Mission Success - Chicken Chaser", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_roty.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 06 - Revenge of the Yolk - Mission Success - Chicken Chaser.mp3",
                plays: "654.321"
            },
            {
                id: "ci_roty_7", title: "Yolk-Star Theme - The Imperial Strut", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_roty.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 07 - Revenge of the Yolk - Yolk-Star Theme - The Imperial Strut.mp3",
                plays: "1.012.345"
            },
            {
                id: "ci_roty_8", title: "Game Over - Totally Burgered", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_roty.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 08 - Revenge of the Yolk - Game Over - Totally Burgered.mp3",
                plays: "543.210"
            },
            {
                id: "ci_roty_9", title: "Victory - Stuffed Chicken", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_roty.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 09 - Revenge of the Yolk - Victory - Stuffed Chicken.mp3",
                plays: "998.765"
            }
        ]
    },
    {
        id: "CIUO",
        title: "Chicken Invaders - Ultimate Omelette",
        songs: [
            {
                id: "ci_uo_10", title: "Main Theme - A Spatchcocked Universe", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 10 - Ultimate Omelette - Main Theme - A Spatchcocked Universe.mp3",
                plays: "2.345.678"
            },
            {
                id: "ci_uo_11", title: "Mission 1 - The Big Nuggets", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 11 - Ultimate Omelette - Mission 1 - The Big Nuggets.mp3",
                plays: "1.987.654"
            },
            {
                id: "ci_uo_12", title: "Mission 2 - The Dark Brood", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 12 - Ultimate Omelette - Mission 2 - The Dark Brood.mp3",
                plays: "1.876.543"
            },
            {
                id: "ci_uo_13", title: "Mission 3 - To Birdly Go", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 13 - Ultimate Omelette - Mission 3 - To Birdly Go.mp3",
                plays: "1.765.432"
            },
            {
                id: "ci_uo_14", title: "Boss Fight - Mission Improbable", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 14 - Ultimate Omelette - Boss Fight - Mission Improbable.mp3",
                plays: "2.123.456"
            },
            {
                id: "ci_uo_15", title: "Mission Success - Rooster Booster", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 15 - Ultimate Omelette - Mission Success - Rooster Booster.mp3",
                plays: "1.654.321"
            },
            {
                id: "ci_uo_16", title: "Egg Cannon Theme - Dark Side Of The Farce", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 16 - Ultimate Omelette - Egg Cannon Theme - Dark Side Of The Farce.mp3",
                plays: "2.012.345"
            },
            {
                id: "ci_uo_17", title: "Invaders - A Long Time Ago", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 17 - Ultimate Omelette - Invaders - A Long Time Ago.mp3",
                plays: "1.543.210"
            },
            {
                id: "ci_uo_18", title: "Game Over - Well, Cluck", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 18 - Ultimate Omelette - Game Over - Well, Cluck.mp3",
                plays: "1.432.109"
            },
            {
                id: "ci_uo_19", title: "Suspense - Fowl Play", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 19 - Ultimate Omelette - Suspense - Fowl Play.mp3",
                plays: "1.321.098"
            },
            {
                id: "ci_uo_20", title: "Victory - Plucked 'Em", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_uo.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 20 - Ultimate Omelette - Victory - Plucked 'Em.mp3",
                plays: "1.888.777"
            }
        ]
    },
    {
        id: "CICotDS",
        title: "Chicken Invaders - Cluck of the Dark Side",
        songs: [
            {
                id: "ci_cotds_21", title: "Main Theme - A Pollo 13", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_cotds.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 21 - Cluck of the Dark Side - Main Theme - A Pollo 13.mp3",
                plays: "3.456.789"
            },
            {
                id: "ci_cotds_22", title: "Mission 1 - A Poultry Excuse", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_cotds.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 22 - Cluck of the Dark Side - Mission 1 - A Poultry Excuse.mp3",
                plays: "2.876.543"
            },
            {
                id: "ci_cotds_23", title: "Mission 2 - A Henterprizing Venture", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_cotds.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 23 - Cluck of the Dark Side - Mission 2 - A Henterprizing Venture.mp3",
                plays: "2.765.432"
            },
            {
                id: "ci_cotds_24", title: "Mission 3 - Spitting Feathers", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_cotds.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 24 - Cluck of the Dark Side - Mission 3 - Spitting Feathers.mp3",
                plays: "2.654.321"
            },
            {
                id: "ci_cotds_25", title: "Boss Fight - The Bad Egg", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_cotds.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 25 - Cluck of the Dark Side - Boss Fight - The Bad Egg.mp3",
                plays: "3.123.456"
            },
            {
                id: "ci_cotds_26", title: "Mission Success - Fanfare To Victory", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_cotds.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 26 - Cluck of the Dark Side - Mission Success - Fanfare To Victory.mp3",
                plays: "2.543.210"
            },
            {
                id: "ci_cotds_27", title: "Henterprise Theme - Cluck Around, Find Out!", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_cotds.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 27 - Cluck of the Dark Side - Henterprise Theme - Cluck Around, Find Out!.mp3",
                plays: "3.012.345"
            },
            {
                id: "ci_cotds_28", title: "Game Over - Who Gives A Cluck", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_cotds.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 28 - Cluck of the Dark Side - Game Over - Who Gives A Cluck.mp3",
                plays: "2.432.109"
            },
            {
                id: "ci_cotds_29", title: "Victory - Go Large!", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_cotds.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 29 - Cluck of the Dark Side - Victory - Go Large!.mp3",
                plays: "2.998.765"
            }
        ]
    },

    {
        id: "CICotDSXmas",
        title: "Chicken Invaders 5 - Cluck of the Dark Side (Xmas Edition)",
        songs: [
            {
                id: "ci_cotds_xmas_remix2",
                title: "Xmas Remix 2",
                artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci-xmas.png", // Giả định tên file ảnh bìa
                audioSrc: "audio/Chicken Invaders 5 COTDS Xmas Remix 2.mp3",
                plays: "1.830.000" // Giả định số lượt nghe
            },
            {
                id: "ci_cotds_xmas_remix1",
                title: "Xmas Remix 1",
                artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci-xmas.png",
                audioSrc: "audio/Chicken Invaders 5 COTDS Xmas Remix 1.mp3",
                plays: "2.162.000"
            },
            {
                id: "ci_cotds_xmas_boss",
                title: "Boss theme (Xmas Edition)",
                artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci-xmas.png",
                audioSrc: "audio/Chicken Invaders 5 COTDS Xmas Edition OST - Boss theme.mp3",
                plays: "2.346.000"
            },
            {
                id: "ci_cotds_xmas_missionsuccess",
                title: "Mission Success! (Xmas Edition)",
                artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci-xmas.png",
                audioSrc: "audio/Chicken Invaders 5 COTDS Xmas Edition OST - Mission Success!.mp3",
                plays: "2.503.000"
            },
            {
                id: "ci_cotds_missionsuccess_cover",
                title: "Mission Success (Cover)",
                artistData: "2dB Music Production", // Giả định nghệ sĩ, có thể thay đổi
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci-xmas.png",
                audioSrc: "audio/Mission Success (Cover).mp3",
                plays: "5.266.000"
            }
        ]
    },
    {
        id: "CIUniverse",
        title: "Chicken Invaders - Universe",
        songs: [
            {
                id: "ci_uni_30", title: "Main Theme (Intense mix) - The Hero's Plume", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_universe.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 30 - Universe - Main Theme (Intense mix) - The Hero's Plume.mp3",
                plays: "4.567.890"
            },
            {
                id: "ci_uni_31", title: "Main Theme (Ambient mix) - Perusing The Chicken Menu", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_universe.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 31 - Universe - Main Theme (Ambient mix) - Perusing The Chicken Menu.mp3",
                plays: "3.987.654"
            },
            {
                id: "ci_uni_32", title: "Mission 1 - Hugo The Great", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_universe.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 32 - Universe - Mission 1 - Hugo The Great.mp3",
                plays: "3.876.543"
            },
            {
                id: "ci_uni_33", title: "Mission 2 - Squawk Factor 5", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_universe.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 33 - Universe - Mission 2 - Squawk Factor 5.mp3",
                plays: "3.765.432"
            },
            {
                id: "ci_uni_34", title: "Mission 3 - The Chicken Has Landed", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_universe.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 34 - Universe - Mission 3 - The Chicken Has Landed.mp3",
                plays: "3.654.321"
            },
            {
                id: "ci_uni_35", title: "Mission 4 - Picard-y Bird", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_universe.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 35 - Universe - Mission 4 - Picard-y Bird.mp3",
                plays: "3.543.210"
            },
            {
                id: "ci_uni_36", title: "Boss Fight - Chilli Wings", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_universe.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 36 - Universe - Boss Fight - Chilli Wings.mp3",
                plays: "4.123.456"
            },
            {
                id: "ci_uni_37", title: "120th Anniversary - Also Cluck Zarathustra", artistData: "2dB Music Production",
                displayArtist: { name: "2dB Music Production", id: "2db-music" },
                artUrl: "img/ci_cover_universe.jpg", audioSrc: "audio/Chicken Invaders Soundtrack - 37 - Universe - 120th Anniversary - Also Cluck Zarathustra.mp3",
                plays: "5.678.901"
            }
        ]
    }
];