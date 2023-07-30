import { Link, useLocation } from "react-router-dom";
import logo from "../assets/mythyaverse-logo-glow.png";
import Carousel from "../components/Carousel/Carousel";
import Wormhole from "../components/Wormhole/Wormhole";
import "./style.css";

import { useEffect, useState } from "react";
import thumbnail1 from "../assets/thumbnails/1.jpg";
import thumbnail2 from "../assets/thumbnails/2.jpg";
import thumbnail3 from "../assets/thumbnails/3.jpg";
import thumbnail4 from "../assets/thumbnails/4.jpg";
import thumbnail5 from "../assets/thumbnails/5.jpg";
import thumbnail6 from "../assets/thumbnails/6.jpg";
import thumbnail7 from "../assets/thumbnails/7.jpg";
import thumbnail8 from "../assets/thumbnails/8.jpg";
import thumbnail9 from "../assets/thumbnails/9.jpg";

export default function ProductsPage() {
  const ProductList = {
    automotive: {
      data: [
        {
          title: "Automotive",
          content: `Our VR services in the automotive domain provide a unique
            opportunity for car manufacturers to showcase their vehicles and
            enable customers to experience them in a virtual environment before
            making a purchase. We are creating interactive and immersive VR
            experiences that allow customers to customize their dream cars, test
            drive them, and explore the interior and exterior features in
            detail. These VR experiences not only enhance the customer buying
            experience but also provide cost-effective solutions for training
            and development of automotive professionals.`,
        },
      ],

      videos: [
        {
          thumbnail: thumbnail5,
          link: "https://www.youtube.com/watch?v=UN01CrHOb0s",
          caption: "Car Configurator",
        },
      ],
    },
    education: {
      data: [
        {
          title: "Education",
          content:
            "At MythyaVerse, we offer cutting-edge VR services for education. Using our expertise in creating immersive virtual environments, we work with universities and other educational institutions to bringtheir curriculum to life in exciting new ways. With interactive tools, engaging challenges, and expert guidance, we help students unlock their creativity and master new skills in a way that is both fun and effective.",
        },
      ],

      videos: [
        {
          thumbnail: thumbnail4,
          link: "https://www.youtube.com/watch?v=F_KN2I8hTSY",
          caption: "ISB Hyderabad Metaverse",
        },
      ],
    },
    mentalHealth: {
      data: [
        {
          title: "Spiritual Wellness",
          content: `The spiritual wellness solution being provided by Mythyaverse is a
      VR-based program designed to induce relaxation and reduce stress in
      employees. The program offers a variety of guided meditation and
      mindfulness exercises, along with virtual environments that promote
      relaxation and stress reduction. By utilizing VR technology, the
      program aims to provide an immersive and engaging experience that
      can help employees better manage their stress and improve their
      overall mental health and well-being.`,
        },
      ],

      videos: [
        {
          thumbnail: thumbnail2,
          link: "https://youtu.be/iXiNktgA50c",
          caption: "Wellness",
        },
        {
          thumbnail: thumbnail1,
          link: "https://youtu.be/517cbF-dAww",
          caption: "Cognitive Game",
        },
        {
          thumbnail: thumbnail3,
          link: "https://youtu.be/Gr-hZoHNwO0",
          caption: "Generative AI in VR",
        },
      ],
    },
    culturalTourism: {
      data: [
        {
          title: "Cultural Tourism",
          content: `MythyaVerse is promoting India's rich cultural heritage by providing
            immersive virtual reality experiences that enable users to explore
            and experience historical landmarks and tourist destinations. We are
            creating a range of virtual tours and experiences that showcase the
            beauty and diversity of India's cultural heritage, from ancient
            temples and forts to traditional markets and festivals. With our VR
            technology, users can interact with these sites and gain a deeper
            understanding of India's rich history and culture, all from the
            comfort of their own home.`,
        },
      ],

      videos: [
        {
          thumbnail: thumbnail6,
          link: "https://drive.google.com/file/d/1wz-Cj7ga0pxh2iDrvpVtoDaCqvUZN8Ah/view",
          caption: "IIT Roorkee's Saraswati Mandir",
        },
      ],
    },
    others: {
      videos: [
        {
          thumbnail: thumbnail7,
          link: "https://www.youtube.com/watch?v=cwYZT9jje-o",
          caption: "Virtual Tour",
        },
        {
          thumbnail: thumbnail9,
          link: "https://www.youtube.com/watch?v=H8Jjq2qZBzU",
          caption: "Rock Museum IIT Roorkee",
        },
        {
          thumbnail: thumbnail8,
          link: "https://drive.google.com/file/d/1O2P-vYDko2iIDF4E7Yh4Kw4kNYvYbG3H/view",
          caption: "Product Demo",
        },
      ],
      data: [
        {
          title: "Virtual tours",
          content: `We create immersive, interactive virtual tours that allow users to explore real-world locations in stunning detail, no matter where they are in the world. From historic sites to natural wonders to corporate offices, we can bring any location to life in the virtual realm.`,
        },
        {
          title: "Product demos",
          content: `Our product demos allow customers to experience your products in a whole new way. We create interactive, 3D models that let users explore your products from every angle, see them in action, and get a better sense of their features and benefits.`,
        },
        {
          title: "Exhibitions and museums",
          content: `Our virtual exhibitions and museums allow visitors to experience the wonders of the world's greatest museums and galleries without leaving
                `,
        },
      ],
    },
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const targetProduct = searchParams.get("name");

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // prevent scrollIntoView from being called at component mount by delaying it by 1 second
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isLoaded && targetProduct === "others") {
      const element = document.getElementById(`product-${currentSlideIndex}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [currentSlideIndex]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header id="header" className="scaled-header scaled-header-products">
        <Link
          to="/"
          className="relative z-30 text-2xl text-white font-bold flex items-center"
        >
          <img
            src={logo}
            style={{ height: "4rem" }}
            alt="mythyaverse logo"
          ></img>
          <h1 id="title">MYTHYAVERSE</h1>
        </Link>
      </header>
      <div
        className={`xl:flex xl:overflow-hidden overflow-auto items-center ${
          targetProduct === "others" ? "h-screen" : "h-screen"
        }`}
      >
        <div
          className={`xl:w-1/3 xl:mt-0 mt-10 w-full flex flex-col items-start text-white px-10  product-content-panel ${
            targetProduct === "others" ? "h-5/6" : "h-fit"
          }`}
        >
          {ProductList[targetProduct].data.map((product, index) => {
            return (
              <>
                <h1 className="text-4xl mb-10" id={`product-${index}`}>
                  {product.title}
                </h1>
                <p className="mb-10 p-5 text-justify text-lg content-box">
                  {product.content}
                </p>
              </>
            );
          })}

          <Link
            to={`/content?section=${1}`}
            className="bg-white text-black text-sm p-4 lg:mt-0 mt-10 hvr-sweep-to-right"
          >
            {"<"} Go back
          </Link>
        </div>
        <div className="xl:w-2/3 w-full z-20">
          <Carousel
            items={ProductList[targetProduct].videos}
            callbackCurrentIndex={(i) => {
              setCurrentSlideIndex(i);
            }}
          />
        </div>
        <div className="absolute right-10 bottom-0 top-0">
          <Wormhole isStaticVertical={true} className="z-10" />
        </div>
      </div>
    </div>
  );
}
