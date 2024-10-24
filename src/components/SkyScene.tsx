"use client"

import { useGSAP } from '@gsap/react';
import { Cloud, Clouds, Environment, Text } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import * as THREE from "three"
import FloadingCan from './FloadingCan';
import { useMediaQuery } from '@/hook/useMediaQuery';

gsap.registerPlugin(useGSAP, ScrollTrigger)

type SkyDiveProps = {
    flavor: "lemonLime" | "grape" | "blackCherry" | "strawberryLemonade" | "watermelon",
    sentence: string| null;
}
const SkyScene = ({flavor, sentence}: SkyDiveProps) => {
    const groupRef = useRef<THREE.Group>(null)
    const canRef = useRef<THREE.Group>(null)
    const cloud1Ref = useRef<THREE.Group>(null)
    const cloud2Ref = useRef<THREE.Group>(null)
    const cloudsRef = useRef<THREE.Group>(null)
    const wordREf = useRef<THREE.Group>(null)

    const ANGLE = 75*(Math.PI / 180)

    const getXposition = (distance: number) => distance * Math.cos(ANGLE)
    const getYposition = (distance: number) => distance * Math.sin(ANGLE)

    const getXYposition = (distance: number) => ({
        x: getXposition(distance),
        y: getYposition(-1*distance)
    })


    useGSAP(() => {
        if(!cloud1Ref.current ||
            !cloud2Ref.current ||
            !cloudsRef.current ||
            !canRef.current ||
            !wordREf.current
        ) return;

        // Set initial positions
        gsap.set(cloudsRef.current.position, {z: 10})
        gsap.set(canRef.current.position, {...getXYposition(-4)})

        gsap.set(wordREf.current.children.map((word) => word.position), {...getXYposition(7), z: 2})

        // Spinning can
        gsap.to(canRef.current.rotation, {
            y: Math.PI * 2,
            duration: 1.7,
            repeat: -1,
            ease: "none"
        })

        // Infinite cloud movement
        const DISTANCE = 15;
        const DURATION = 6;

        gsap.set([cloud1Ref.current.position, cloud2Ref.current.position], {
            ...getXYposition(DISTANCE)
        })

        gsap.to(cloud1Ref.current.position, {
            y: `+=${getYposition(DISTANCE*2)}`,
            x: `+=${getXposition(DISTANCE*-2)}`,
            ease: "none",
            repeat: -1,
            duration: DURATION
        })

        gsap.to(cloud2Ref.current.position, {
            y: `+=${getYposition(DISTANCE*2)}`,
            x: `+=${getXposition(DISTANCE*-2)}`,
            ease: "none",
            repeat: -1,
            delay: DURATION/2,
            duration: DURATION
        })

        const scrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".skydive",
                pin: true,
                start: "top top",
                end: "+=2000",
                scrub: 1.5,
                markers: true
            }
        })

        scrollTL
        .to("body", {
            backgroundColor: "#C0F0F5",
            overflow: "auto",
            duration: 0.1
        })
        .to(cloudsRef.current.position, {
            z: 0, duration: 0.3
        }, 0)
        .to(canRef.current.position, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "back.out(1.7)",
        })
        .to(wordREf.current.children.map((word) => word.position), {
            keyframes: [
              { x: 0, y: 0, z: -1 },
              { ...getXYposition(-7), z: -7 },
            ],
            stagger: 0.3,
        }, 0)
        .to(canRef.current.position, {
          ...getXYposition(4),
          duration: 0.5,
          ease: "back.in(1.7)",
        })
        .to(cloudsRef.current.position, { z: 7, duration: 0.5 });

    })


    return (
        <group ref={groupRef}>
            {/* can */}
            <group rotation={[0, 0, 0.5]}>
                <FloadingCan
                  ref={canRef}
                  flavor={flavor}
                  rotationIntensity={0}
                  floatIntensity={3}
                  floatSpeed={3}
                >
                  <pointLight intensity={30} color="#8C0413" decay={0.6} />
                </FloadingCan>
            </group>
            
            {/* Clouds */}
            <Clouds ref={cloudsRef}>
              <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
              <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
            </Clouds>

            {/* Text */}
            <group ref={wordREf}>
              {sentence && <ThreeText sentence={sentence} color="#F97315" />}
            </group>

            {/* Lights */}
            <ambientLight intensity={2} color="#9DDEFA" />
            <Environment files="/hdrs/field.hdr" environmentIntensity={1.5} />
        </group>
    );
}

export default SkyScene;

function ThreeText({
    sentence,
    color = "white",
  }: {
    sentence: string;
    color?: string;
  }) {
    const words = sentence.toUpperCase().split(" ");
  
    const material = new THREE.MeshLambertMaterial();
    const isDesktop = useMediaQuery("(min-width: 950px)", true);
  
    return words.map((word: string, wordIndex: number) => (
      <Text
        key={`${wordIndex}-${word}`}
        scale={isDesktop ? 1 : 0.5}
        color={color}
        material={material}
        font="/fonts/Alpino-Variable.woff"
        fontWeight={900}
        anchorX={"center"}
        anchorY={"middle"}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
      >
        {word}
      </Text>
    ));
  }
