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
            videoLink: "https://www.youtube.com/watch?v=feijoada-recipe",
        },
        {
            name: "Pão de Queijo",
            image: "/images/brazil/pao-de-queijo.jpeg",
            description: "Chewy cheese bread balls, a popular snack in Brazil.",
            videoLink: "https://www.youtube.com/watch?v=pao-de-queijo-recipe",
        },
        {
            name: "Moqueca",
            image: "/images/brazil/moqueca.jpeg",
            description:
                "A flavorful fish stew cooked with coconut milk, tomatoes, and spices.",
            videoLink: "https://www.youtube.com/watch?v=moqueca-recipe",
        },
    ],
    festivals: [
        {
            name: "Carnival",
            image: "/images/brazil/carnival.jpg",
            description:
                "Brazil's most famous festival featuring samba parades and vibrant costumes.",
            videoLink: "https://www.youtube.com/watch?v=carnival-parade",
        },
        {
            name: "Festa Junina",
            image: "/images/brazil/festa-junina.jpeg",
            description:
                "A traditional festival celebrating rural life with dances, music, and food.",
            videoLink: "https://www.youtube.com/watch?v=festa-junina",
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
            videoLink: "https://www.youtube.com/watch?v=samba-performance",
        },
        {
            title: "Bossa Nova Classics",
            videoLink: "https://www.youtube.com/watch?v=bossa-nova",
        },
    ],
    touristAttractions: [
        {
            name: "Christ the Redeemer",
            videoLink: "https://www.youtube.com/watch?v=christ-redeemer-vr",
        },
        {
            name: "Iguaçu Falls",
            videoLink: "https://www.youtube.com/watch?v=iguacu-falls-vr",
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
            videoLink: "https://www.youtube.com/watch?v=biryani-video",
        },
        {
            name: "Dosa",
            image: "/images/india/dosa.jpeg",
            description:
                "Thin crispy fermented rice crepe, usually served with chutney and sambar.",
            videoLink: "https://www.youtube.com/watch?v=dosa-video",
        },
        {
            name: "Chole Bhature",
            image: "/images/india/chole-bhature.jpg",
            description: "Spicy chickpeas served with fluffy deep-fried bread.",
            videoLink: "https://www.youtube.com/watch?v=cholebhature-video",
        },
    ],
    festivals: [
        {
            name: "Diwali",
            image: "/images/india/diwali.jpg",
            description:
                "Festival of Lights symbolizing victory of light over darkness.",
            videoLink: "https://www.youtube.com/watch?v=diwali-festival",
        },
        {
            name: "Holi",
            image: "/images/india/holi.jpg",
            description:
                "Festival of Colors celebrating love and the arrival of spring.",
            videoLink: "https://www.youtube.com/watch?v=holi-festival",
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
            videoLink: "https://www.youtube.com/watch?v=sitar-performance",
        },
        {
            title: "Tabla Solo",
            videoLink: "https://www.youtube.com/watch?v=tabla-solo",
        },
    ],
    touristAttractions: [
        {
            name: "Taj Mahal",
            videoLink: "https://www.youtube.com/watch?v=tajmahal-vr",
        },
        {
            name: "Jaipur - The Pink City",
            videoLink: "https://www.youtube.com/watch?v=jaipur-vr",
        },
    ],
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
            videoLink: "https://www.youtube.com/watch?v=pizza-video",
        },
        {
            name: "Pasta Carbonara",
            image: "/images/italy/carbonara.jpeg",
            description: "Pasta with eggs, cheese, pancetta, and pepper.",
            videoLink: "https://www.youtube.com/watch?v=carbonara-video",
        },
        {
            name: "Tiramisu",
            image: "/images/italy/tiramisu.jpeg",
            description:
                "Coffee-flavored Italian dessert with layers of mascarpone and cocoa.",
            videoLink: "https://www.youtube.com/watch?v=tiramisu-video",
        },
    ],
    festivals: [
        {
            name: "Carnevale di Venezia",
            image: "/images/italy/venice-carnival.jpeg",
            description:
                "Famous for elaborate masks and costumes, held before Lent.",
            videoLink: "https://www.youtube.com/watch?v=venice-carnival",
        },
        {
            name: "Ferragosto",
            image: "/images/italy/ferragosto.jpeg",
            description:
                "National holiday celebrated in mid-August with feasts and festivals.",
            videoLink: "https://www.youtube.com/watch?v=ferragosto-festival",
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
            videoLink: "https://www.youtube.com/watch?v=opera-performance",
        },
        {
            title: "Classical Violin Solo",
            videoLink: "https://www.youtube.com/watch?v=violin-solo",
        },
    ],
    touristAttractions: [
        {
            name: "Colosseum",
            videoLink: "https://www.youtube.com/watch?v=colosseum-vr",
        },
        {
            name: "Venice Canals",
            videoLink: "https://www.youtube.com/watch?v=venice-vr",
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
            videoLink: "https://www.youtube.com/watch?v=sushi-video",
        },
        {
            name: "Ramen",
            image: "/images/japan/ramen.jpeg",
            description: "Noodle soup with rich broth and various toppings.",
            videoLink: "https://www.youtube.com/watch?v=ramen-video",
        },
        {
            name: "Okonomiyaki",
            image: "/images/japan/okonomiyaki.jpg",
            description: "A savory pancake with meats, vegetables, and sauces.",
            videoLink: "https://www.youtube.com/watch?v=okonomiyaki-video",
        },
    ],
    festivals: [
        {
            name: "Gion Matsuri",
            image: "/images/japan/gion-matsuri.jpg",
            description:
                "Kyoto's most famous festival with floats and traditional dress.",
            videoLink: "https://www.youtube.com/watch?v=gion-festival",
        },
        {
            name: "Tanabata",
            image: "/images/japan/tanabata.jpeg",
            description:
                "Star festival celebrating the meeting of two deities.",
            videoLink: "https://www.youtube.com/watch?v=tanabata-festival",
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
            videoLink: "https://www.youtube.com/watch?v=koto-performance",
        },
        {
            title: "Taiko Drumming",
            videoLink: "https://www.youtube.com/watch?v=taiko-drums",
        },
    ],
    touristAttractions: [
        {
            name: "Mount Fuji",
            videoLink: "https://www.youtube.com/watch?v=mount-fuji-vr",
        },
        {
            name: "Fushimi Inari Shrine",
            videoLink: "https://www.youtube.com/watch?v=fushimi-vr",
        },
    ],
};