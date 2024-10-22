"use client" 

import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { View } from "@react-three/drei"
import Bounded from '../Bounded'
import TextSplitter from '../TextSplitter'
import Button from '../Button'
import Scene from './Scene'
import Bubbles from '../Bubbles'

gsap.registerPlugin(useGSAP, ScrollTrigger)
const Hero = () => {

  useGSAP(() => {

    const introTL = gsap.timeline();
    introTL
    .set(".hero", {opacity: 1})
    .from(".hero-header-word", {
      scale: 3,
      opacity: 0,
      delay: 0.3,
      stagger: 1,
      ease: "power4.in"
    })
    .from(".hero-subheading", {
      opacity: 0,
      y: 30
    }, "+=.8")
    .from(".hero-body", {
      opacity: 0,
      y: 10
    })
    .from(".hero-button", {
      opacity: 0,
      y: 10,
      duration: 0.6
    })

    const scrollTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        markers: true,
        scrub: 1.5
      }
    })

    scrollTL
    .fromTo("body",
      {
        backgroundColor: "#FDE047",
      },
      {
        backgroundColor: "#D9F99D",
        overwrite: "auto",  //"auto": Ensures that this animation doesn't conflict with other animations affecting the same properties.
      },
      1,  //duration: 1
    )
    .from(".text-side-heading .split-word", {
      scale: 1.3,
      opacity: 0,
      y: 40,
      rotation: -25,
      ease: "back.out(3)",
      stagger: 0.1,
      duration: 0.5
    })
    .from(".text-side-body", {
      y: 20,
      opacity: 0,
    });
  })


  return (
    <Bounded className='hero opacity-0'>

      <View className='hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block'>
        <Scene/>
        <Bubbles count={300} speed={2} repeat={true}/>
      </View>

      {/* small screen */}
      <div className='grid'>
        <div className='grid h-screen place-items-center'>
            <div className="grid auto-rows-min place-items-center text-center">
              <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
                <TextSplitter
                  text="LIVE gutsy"
                  wordDisplayStyle="block"
                  className="hero-header-word"
                />
              </h1>
              <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
                  Soda Perfected
              </div>
              <div className="hero-body text-2xl font-normal text-sky-950">
                Hello Monday! I am very excited.
              </div>
              <Button
                buttonLink="/"
                buttonText="Button need to replace later"
                className="hero-button mt-12"
              />
            </div>
        </div>
        
        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          {/* <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
          /> */}
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <TextSplitter text='Try all five flavors'/>
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
            Our soda is made with real fruit juice and a touch of cane sugar. We never use artificial sweeteners 
            or high fructose corn syrup. Try all five flavors and find your favorite!
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  )
}

export default Hero