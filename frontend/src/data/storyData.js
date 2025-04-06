// Example story data structure for Brazil - you would create similar objects for other countries
export const brazilStoryData = {
    country: "Brazil",
    headerImage: "/images/brazil/brazil-header.jpg",
    greeting: {
        text: "Olá",
        description: "This is how we greet in Brazil",
        audio: "/audio/brazil/brazilian-greeting.mp3",
    },
    clothing: {
        carouselImages: [
            "/images/brazil/baiana-dress.jpeg",
            "/images/brazil/gaucho-attire.jpeg",
            "/images/brazil/samba-costume.jpg",
        ],
    },
    languages: [
        {
            name: "Portuguese",
            calligraphyImage: "/images/brazil/portuguese-calligraphy.jpg",
            phrases: [
                {
                    text: "Obrigado (Thank you)",
                    audio: "/audio/brazil/obrigado.mp3",
                },
                {
                    text: "Bom dia (Good morning)",
                    audio: "/audio/brazil/bom-dia.mp3",
                },
            ],
        },
        {
            name: "Tupi",
            calligraphyImage: "/images/brazil/tupi-script.png",
            phrases: [
                {
                    text: "Abaeté (True friend)",
                    audio: "/audio/brazil/abaete.mp3",
                },
                {
                    text: "Iara (Lady of the water)",
                    audio: "/audio/brazil/iara.mp3",
                },
            ],
        },
    ],
    food: [
        {
            name: "Feijoada",
            image: "/images/brazil/feijoada.jpg",
            description:
                "A hearty black bean stew with pork, traditionally served with rice.",
            videoLink: "https://www.youtube.com/watch?v=0wOyK8JYyZ8&ab_channel=HomeChefSeattle",
        },
        {
            name: "Pão de Queijo",
            image: "/images/brazil/pao-de-queijo.jpeg",
            description: "Chewy cheese bread balls, a popular snack in Brazil.",
            videoLink: "https://www.youtube.com/watch?v=IOb5uric4n0&ab_channel=TheCookingFoodie",
        },
        {
            name: "Moqueca",
            image: "/images/brazil/moqueca.jpeg",
            description:
                "A flavorful fish stew cooked with coconut milk, tomatoes, and spices.",
            videoLink: "https://www.youtube.com/watch?v=p7UHO_RJ0jM&ab_channel=America%27sTestKitchen",
        },
    ],
    festivals: [
        {
            name: "Carnival",
            image: "/images/brazil/carnival.jpg",
            description:
                "Brazil's most famous festival featuring samba parades and vibrant costumes.",
            videoLink: "https://www.youtube.com/watch?v=Uf0zWr0r8us&ab_channel=Firstpost",
        },
        {
            name: "Festa Junina",
            image: "/images/brazil/festa-junina.jpeg",
            description:
                "A traditional festival celebrating rural life with dances, music, and food.",
            videoLink: "https://www.youtube.com/watch?v=9A29VpXJ2Gs&ab_channel=TheBrazilianReport",
        },
    ],
    art: [
        {
            name: "Baroque Architecture",
            image: "/images/brazil/baroque-architecture.jpg",
            description:
                "Ornate colonial-era churches and buildings, especially in Ouro Preto.",
        },
        {
            name: "Woodcarving",
            image: "/images/brazil/woodcarving.jpg",
            description:
                "Intricate wooden sculptures reflecting Afro-Brazilian heritage.",
        },
    ],
    music: [
        {
            title: "Samba Performance",
            videoLink: "https://www.youtube.com/watch?v=KSScp7AONwI&ab_channel=DanceTime.com",
        },
        {
            title: "Bossa Nova Classics",
            videoLink: "https://www.youtube.com/watch?v=7ovLcQ5Ev6E&ab_channel=RhythmandHymns",
        },
    ],
    touristAttractions: [
        {
            name: "Christ the Redeemer",
            360: "https://360stories.com/rio/place/christ-the-redeemer?mode=2&playerMode=2",
            videoLink: "https://www.youtube.com/watch?v=AcYPaVvNBAw",
        },
        {
            name: "Iguaçu Falls",
            360: "https://360stories.com/rio/place/lapa-archs?mode=2&playerMode=2",
            videoLink: "https://www.youtube.com/watch?v=wJIKVHPn7J8",
        },
    ],
};

export const indiaStoryData = {
    country: "India",
    headerImage: "/images/india/india-header.jpg",
    greeting: {
        text: "नमस्ते",
        description: "This is how we greet in India",
        audio: "/audio/india/hindi-greeting.mp3",
    },
    clothing: {
        carouselImages: [
            "/images/india/sari.jpg",
            "/images/india/sherwani.jpg",
            "/images/india/lehenga.jpg",
        ],
    },
    languages: [
        {
            name: "Hindi",
            calligraphyImage: "/images/india/hindi-calligraphy.jpg",
            phrases: [
                {
                    text: "धन्यवाद (Thank you)",
                    audio: "/audio/india/hindi-thankyou.mp3",
                },
                {
                    text: "सुप्रभात (Good morning)",
                    audio: "/audio/india/hindi-goodmorning.mp3",
                },
            ],
        },
        {
            name: "Tamil",
            calligraphyImage: "/images/india/tamil-script.png",
            phrases: [
                {
                    text: "நன்றி (Thank you)",
                    audio: "/audio/india/tamil-thankyou.mp3",
                },
                {
                    text: "காலை வணக்கம் (Good morning)",
                    audio: "/audio/india/tamil-goodmorning.mp3",
                },
            ],
        },
    ],
    food: [
        {
            name: "Biryani",
            image: "/images/india/biryani.jpg",
            description: "Aromatic spiced rice dish with meat or vegetables.",
            videoLink: "https://www.youtube.com/watch?v=95BCU1n268w&ab_channel=SpiceEats", // Updated active video link for Biryani
        },
        {
            name: "Dosa",
            image: "/images/india/dosa.jpeg",
            description:
                "Thin crispy fermented rice crepe, usually served with chutney and sambar.",
            videoLink: "https://www.youtube.com/watch?v=1dCguTWLiJ4&ab_channel=YourFoodLab", // Updated active video link for Dosa
        },
        {
            name: "Chole Bhature",
            image: "/images/india/chole-bhature.jpg",
            description: "Spicy chickpeas served with fluffy deep-fried bread.",
            videoLink: "https://www.youtube.com/watch?v=QbyXsYOTJD4&ab_channel=HebbarsKitchen", // Updated active video link for Chole Bhature
        },
    ],
    
    festivals: [
        {
            name: "Diwali",
            image: "/images/india/diwali.jpg",
            description:
                "Festival of Lights symbolizing victory of light over darkness.",
            videoLink: "https://www.youtube.com/watch?v=HrrW3rO51ak&ab_channel=NationalGeographic",
        },
        {
            name: "Holi",
            image: "/images/india/holi.jpg",
            description:
                "Festival of Colors celebrating love and the arrival of spring.",
            videoLink: "https://www.youtube.com/watch?v=FZ9ed-zDazk&ab_channel=ReligionForBreakfast",
        },
    ],
    art: [
        {
            name: "Madhubani",
            image: "/images/india/madhubani.jpg",
            description:
                "Folk art from Bihar characterized by intricate patterns and vibrant colors.",
        },
        {
            name: "Rangoli",
            image: "/images/india/rangoli.jpg",
            description:
                "Colorful patterns made on the ground using colored powders.",
        },
    ],
    music: [
        {
            title: "Sitar Performance",
            videoLink: "https://www.youtube.com/watch?v=o6HzjWiCLNc&ab_channel=TheBritishMuseum",
        },
        {
            title: "Tabla Solo",
            videoLink: "https://www.youtube.com/watch?v=LAwgD_YxRgM&ab_channel=BerkleeCollegeofMusic",
        },
    ],
    touristAttractions: [
        {
            name: "Taj Mahal",
            360: "https://www.airpano.com/embed.php?3D=taj-mahal-india-2",
            videoLink: "https://www.youtube.com/watch?v=V0zM9Y-D3yY"
        },
        {
            name: "Jaipur - The Pink City",
            360: "https://www.airpano.com/embed.php?3D=jaipur-india",
            videoLink: "https://www.youtube.com/watch?v=Jr8vD4eFz6Y"
        }
    ]
};

export const italyStoryData = {
    country: "Italy",
    headerImage: "/images/italy/italy-header.jpg",
    greeting: {
        text: "Ciao",
        description: "This is how we greet in Italy",
        audio: "/audio/italy/italian-greeting.mp3",
    },
    clothing: {
        carouselImages: [
            "/images/italy/renaissance-dress.jpeg",
            "/images/italy/italian-suit.jpg",
            "/images/italy/traditional-folk.jpg",
        ],
    },
    languages: [
        {
            name: "Italian",
            calligraphyImage: "/images/italy/italian-calligraphy.jpeg",
            phrases: [
                {
                    text: "Grazie (Thank you)",
                    audio: "/audio/italy/italian-thankyou.mp3",
                },
                {
                    text: "Buongiorno (Good morning)",
                    audio: "/audio/italy/italian-goodmorning.mp3",
                },
            ],
        },
    ],
    food: [
        {
            name: "Pizza Margherita",
            image: "/images/italy/pizza.jpeg",
            description:
                "Classic Italian pizza with tomatoes, mozzarella, and basil.",
            videoLink: "https://www.youtube.com/watch?v=xKDnD8sJsuY&ab_channel=Vincenzo%27sPlate",
        },
        {
            name: "Pasta Carbonara",
            image: "/images/italy/carbonara.jpeg",
            description: "Pasta with eggs, cheese, pancetta, and pepper.",
            videoLink: "https://www.youtube.com/watch?v=D_2DBLAt57c&ab_channel=JamieOliver",
        },
        {
            name: "Tiramisu",
            image: "/images/italy/tiramisu.jpeg",
            description:
                "Coffee-flavored Italian dessert with layers of mascarpone and cocoa.",
            videoLink: "https://www.youtube.com/watch?v=1dCguTWLiJ4&ab_channel=YourFoodLab",
        },
    ],
    festivals: [
        {
            name: "Carnevale di Venezia",
            image: "/images/italy/venice-carnival.jpeg",
            description:
                "Famous for elaborate masks and costumes, held before Lent.",
            videoLink: "https://www.youtube.com/watch?v=p4LfiFdMEV8&ab_channel=zvolda",
        },
        {
            name: "Ferragosto",
            image: "/images/italy/ferragosto.jpeg",
            description:
                "National holiday celebrated in mid-August with feasts and festivals.",
            videoLink: "https://www.youtube.com/watch?v=BZksoLfl_S4&ab_channel=GiseliRodas",
        },
    ],
    art: [
        {
            name: "Michelangelo's David",
            image: "/images/italy/david.jpeg",
            description:
                "Renaissance sculpture known for its detail and expression.",
        },
        {
            name: "Venetian Glass Art",
            image: "/images/italy/venetian-glass.jpeg",
            description:
                "Intricate glasswork traditionally made on the island of Murano.",
        },
    ],
    music: [
        {
            title: "Opera Performance",
            videoLink: "https://www.youtube.com/watch?v=WAZR4ru8D6Y&ab_channel=LaSierraUniversityMusic",
        },
        {
            title: "Classical Violin Solo",
            videoLink: "https://www.youtube.com/watch?v=iEBX_ouEw1I&ab_channel=HilaryHahnVEVO",
        },
    ],
    touristAttractions: [
        {
            name: "Colosseum",
            360:"https://360stories.com/rome/place/colosseum?mode=2",
            videoLink: "https://www.youtube.com/watch?v=Uhjh49YkB3A",
        },
        {
            name: "Pantheon",
            360:"https://360stories.com/rome/place/pantheon?mode=2&playerMode=2",
            videoLink: "https://www.youtube.com/watch?v=3TtxMFQWN7w",
        },
    ],
};

export const japanStoryData = {
    country: "Japan",
    headerImage: "/images/japan/japan-header.jpg",
    greeting: {
        text: "こんにちは",
        description: "This is how we greet in Japan",
        audio: "/audio/japan/japanese-greeting.mp3",
    },
    clothing: {
        carouselImages: [
            "/images/japan/kimono1.jpg",
            "/images/japan/yukata.jpg",
            "/images/japan/traditional-robe.jpeg",
        ],
    },
    languages: [
        {
            name: "Japanese",
            calligraphyImage: "/images/japan/japanese-calligraphy.jpg",
            phrases: [
                {
                    text: "ありがとう (Thank you)",
                    audio: "/audio/japan/arigatou.mp3",
                },
                {
                    text: "おはよう (Good morning)",
                    audio: "/audio/japan/ohayou.mp3",
                },
            ],
        },
        {
            name: "Ainu",
            calligraphyImage: "/images/japan/ainu-script.jpg",
            phrases: [
                {
                    text: "Irankarapte (Hello)",
                    audio: "/audio/japan/ainu-hello.mp3",
                },
                {
                    text: "Iyairaikere (Thank you)",
                    audio: "/audio/japan/ainu-thankyou.mp3",
                },
            ],
        },
    ],
    food: [
        {
            name: "Sushi",
            image: "/images/japan/sushi.jpg",
            description: "Vinegared rice topped with raw fish or seafood.",
            videoLink: "https://www.youtube.com/watch?v=EGeNKGosXA8&ab_channel=Munchies",
        },
        {
            name: "Ramen",
            image: "/images/japan/ramen.jpeg",
            description: "Noodle soup with rich broth and various toppings.",
            videoLink: "https://www.youtube.com/watch?v=EizSoy7Ztto&ab_channel=JapaneseCooking101",
        },
        {
            name: "Okonomiyaki",
            image: "/images/japan/okonomiyaki.jpeg",
            description: "A savory pancake with meats, vegetables, and sauces.",
            videoLink: "https://www.youtube.com/watch?v=zy1nkcNpAOI&ab_channel=Champ%27sJapaneseKitchen",
        },
    ],
    festivals: [
        {
            name: "Gion Matsuri",
            image: "/images/japan/gion-matsuri.jpg",
            description:
                "Kyoto's most famous festival with floats and traditional dress.",
            videoLink: "https://www.youtube.com/watch?v=16GWw0JJ1O0&ab_channel=HarpistinJapan",
        },
        {
            name: "Tanabata",
            image: "/images/japan/tanabata.jpeg",
            description:
                "Star festival celebrating the meeting of two deities.",
            videoLink: "https://www.youtube.com/watch?v=rOahFPV-xxQ&ab_channel=GTVJapan",
        },
    ],
    art: [
        {
            name: "Ukiyo-e",
            image: "/images/japan/ukiyoe.jpeg",
            description:
                "Traditional woodblock prints depicting daily life and nature.",
        },
        {
            name: "Origami",
            image: "/images/japan/origami.jpg",
            description: "The Japanese art of paper folding.",
        },
    ],
    music: [
        {
            title: "Koto Performance",
            videoLink: "https://www.youtube.com/watch?v=VFK8_9RcaOc&ab_channel=JapanHouseLondon",
        },
        {
            title: "Taiko Drumming",
            videoLink: "https://www.youtube.com/watch?v=WY5AXv89V1s&ab_channel=TaikoTaikai",
        },
    ],
    touristAttractions: [
        {
            name: "Tokyo Tower",
            360: "https://360stories.com/tokyo/place/Tokyo-Tower?mode=2&playerMode=2",
            videoLink: "https://www.youtube.com/watch?v=qHi49r-F_nE",
        },
        {
            name: "Fushimi Inari Shrine",
            360: "https://360stories.com/kyoto/place/Fushimi-Inari-Taisha?mode=2&playerMode=2",
            videoLink: "https://www.youtube.com/watch?v=Y3s-nAWggOY",
        },
    ],
};
