import Navbar from "./components/Navbar"
import Home from "./sections/Home"
import About from "./sections/About"
import Skills from "./sections/Skills"
import Experience from "./sections/Experience"
import Testimonials from "./sections/Testimonials"
import Project from "./sections/Project"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"
import Tooltip from "./components/Tooltip"
import CustomCursor from "./components/CustomCursor"
import About_home from "../src/components/About_home"
import React from "react"
import IntroAnimation from "./components/introAnimation"
import YouTubeShowcase from "./components/YouTubeShowcase"
import SocialHub from "./sections/SocialHub"



export default function App(){
  const [introDone , setIntroDone ]  = React.useState(false);
  return(

<>
{!introDone && <IntroAnimation onFinish = {() => setIntroDone(true)} />}

{introDone && (
<div className="relative gradient text-white">
  <Home/>
</div>

)}

</>
  )
}