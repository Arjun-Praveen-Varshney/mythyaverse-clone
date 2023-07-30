import AlekhJohari from "../../assets/advisor-pictures/alekh-johari.jpg";
import RameshShankarS from "../../assets/advisor-pictures/ramesh-shankar-s.jpg";
import AbhishekGupta from "../../assets/advisor-pictures/abhishek-gupta.jpg";
import ContactForm from "../ContactForm/ContactForm";
import GalaxyPortalLink from "../Galaxy/GalaxyPortalLink";

import { AvatarView } from "@sarge/avatar-view";
import GalaxySlider from "../GalaxySlider/GalaxySlider";

const PageContent = [
  {
    title: "ABOUT",
    element: function () {
      return (
        <p>
          The name MythyaVerse is a portmanteau of two distinct words: "Mythya"
          and "Verse". "Mythya" is derived from the Sanskrit word "Mithya" which
          means "myth" or "illusion", signifying the rich mythological and
          cultural heritage of India. "Verse" is derived from the term
          "universe", representing the vast, interconnected digital realm that
          our startup aims to create.
          <br />
          <br />
          MythyaVerse's core concept is to use Virtual Reality (VR) technology
          to immerse users in the enchanting world of Indian mythology,
          spirituality, and culture. By bridging the gap between ancient wisdom
          and modern technology, we aspire to create transformative experiences
          that resonate with audiences both in India and around the globe.
          <br />
          <br />
          The name MythyaVerse encapsulates the essence of our mission: to bring
          the mythical realm to life and make it accessible to everyone through
          the power of VR. By offering a range of immersive experiences, from
          spiritual wellness and meditations to cultural tourism and beyond, we
          aim to become a one-stop destination for users seeking to explore
          India's rich cultural legacy.
          <br />
          <br />
          In essence, MythyaVerse represents the harmonious marriage of
          tradition and technology, where the wisdom of the past meets the
          potential of the future.
        </p>
      );
    },
  },
  {
    title: "PRODUCTS",
    element: function () {
      const links = [
        {
          element: (
            <GalaxyPortalLink
              productName="Spiritual Wellness"
              productID="mentalHealth"
              scale={0.6}
              colorOne="#b7fe00"
              colorTwo="#469f77"
            />
          ),
          caption: "Spiritual Wellness",
          link: "/transition?target=mentalHealth",
        },
        {
          element: (
            <GalaxyPortalLink
              productName="Others"
              productID="others"
              scale={0.6}
            />
          ),
          caption: "Others",
          link: "/transition?target=others",
        },

        {
          element: (
            <GalaxyPortalLink
              productName="Education"
              productID="education"
              scale={0.6}
            />
          ),
          caption: "Education",
          link: "/transition?target=education",
        },

        {
          element: (
            <GalaxyPortalLink
              productName="Cultural Tourism"
              productID="culturalTourism"
              scale={0.6}
              colorOne="#f3f401"
              colorTwo="#ff8600"
            />
          ),
          caption: "Cultural Tourism",
          link: "/transition?target=culturalTourism",
        },
        {
          element: (
            <GalaxyPortalLink
              productName="Automotive"
              productID="automotive"
              scale={0.6}
              colorOne="#7debfd"
              colorTwo="#0094b1"
            />
          ),
          caption: "Automotive",
          link: "/transition?target=automotive",
        },
      ];

      return (
        <div className="">
          <GalaxySlider items={links} />
        </div>
      );
    },
  },
  {
    title: "TEAM",
    element: function () {
      const url =
        "https://models.readyplayer.me/61069da5616490e7e2ebc787.glb?useHands=false";
      const TeamMember = ({ photo, name, designation }) => {
        const opt = {
          blinkEyes: true,
          followCursor: true,
        };
        const style = {
          width: "30%",
          height: "auto",
          aspectRatio: "1",
        };
        return (
          <div className="flex items-center lg:p-5 py-2 md:mb-0 mb-10">
            <AvatarView type="3D" options3D={opt} url={photo} style={style} />

            <div className="flex flex-col border-4 border-white border-t-0 border-l-0 rounded-br-3xl p-4">
              <h2 className="font-bold text-lg">{name}</h2>
              <p className="xl:w-64 lg:w-56 md:w-44 w-48 max-[375px]:w-26 max-[320px]:w-32">
                {designation}
              </p>
            </div>
          </div>
        );
      };
      return (
        <>
          <h1 className="text-4xl mb-5">Our Team</h1>
          <div className="flex md:flex-row flex-col lg:justify-around justify-between">
            <TeamMember
              photo="https://models.readyplayer.me/641ad1b2398f7e86e698b543.glb"
              name="Anmol Gupta"
              designation={"CEO, PhD, IIT Roorkee | RuG Netherlands"}
            />
            <TeamMember
              photo="https://models.readyplayer.me/641ad14d04207164c8560bb2.glb"
              name="Vishal Pandey"
              designation={"CTO, PhD, IIT Roorkee"}
            />
          </div>
          <div className="flex md:flex-row flex-col lg:justify-around justify-between">
            <TeamMember
              photo="https://models.readyplayer.me/641989c404207164c85409ba.glb"
              name="Partha Pratim Roy"
              designation={"Mentor, Associate Professor, CSE, IIT Roorkee"}
            />
            <TeamMember
              photo="https://models.readyplayer.me/641ad18b398f7e86e698b4fb.glb"
              name="Anuj Garg"
              designation={"Technical Advisor"}
            />
          </div>
          <div className="flex md:flex-row flex-col lg:justify-around justify-between">
            <TeamMember
              photo="https://models.readyplayer.me/62ea7bc28a6d28ec134bbcce.glb"
              name="Avinash Jain"
              designation={"Technical Advisor"}
            />
          </div>
        </>
      );
    },
  },
  {
    title: "ADVISORS",
    element: function () {
      const Advisor = ({ photo, name, designation }) => {
        return (
          <div className="flex items-center lg:p-5 py-2 md:mb-0 mb-10">
            <img src={photo} className="rounded-full w-[100px] aspect-square" />

            <div className="flex flex-col border-4 border-white border-t-0 border-l-0 rounded-br-3xl p-4">
              <h2 className="font-bold text-lg">{name}</h2>
              <p className="xl:w-64 lg:w-56 md:w-44 w-48 max-[375px]:w-26 max-[320px]:w-32">
                {designation}
              </p>
            </div>
          </div>
        );
      };
      return (
        <>
          <h1 className="text-4xl mb-5">Our Advisors</h1>
          <div className="flex md:flex-row flex-col lg:justify-around justify-between">
            <Advisor
              photo={AlekhJohari}
              name="Alekh Johari
              "
              designation={`Founder: Anemoi Solution | Creator: Show called 'The Future of WEB' | Creator: Metaverse Marathon`}
            />
            <Advisor
              photo={RameshShankarS}
              name="Ramesh Shankar S"
              designation={
                "Chief Joy Officer: Hrishti.com | Ex. Executive Vice President & Head of HR (South Asia Cluster) - Siemens"
              }
            />
            <Advisor
              photo={AbhishekGupta}
              name="Abhishek Gupta"
              designation={
                "Head of Human Resources @ ZebPay | ET NOW's 'Young HR Leader of the Year' | SCMHRD, Pune"
              }
            />
          </div>
        </>
      );
    },
  },
  {
    title: "CONTACT",
    element: function () {
      return (
        <>
          You can contact us at:
          <br />
          <br />
          <ul>
            <li className="mb-2">
              contact@mythyaverse.com | ceo@mythyaverse.com
            </li>
            <li className="mb-2">
              vishal@mythyverse.com | anuj@mythyaverse.com
            </li>
          </ul>
          <br />
          or use the contact form below:
          <ContactForm />
        </>
      );
    },
  },
];

export default PageContent;
