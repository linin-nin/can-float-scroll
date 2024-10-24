"use client"

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import FloadingCan from './FloadingCan';
import { Environment } from '@react-three/drei';
import { Group } from 'three';
import { useMediaQuery } from '@/hook/useMediaQuery';



gsap.registerPlugin(useGSAP)


const AlthernatingScene = () => {

    const canRef = useRef<Group>(null)
    const isDesktop = useMediaQuery("(min-width: 768px)", true)

    const bgColor = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];

    useGSAP(() => {
        if(!canRef.current)return;

        const sections = gsap.utils.toArray(".althernationg-section")

        const scrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".alternating-text-view",
                endTrigger: ".alternating-text-container",
                pin: true,
                start: "top top",
                end: " bottom bottom",
                markers: true,
                scrub: true
            }
        })

        sections.forEach((_: unknown, index: number) => {
            if(!canRef.current) return
            if(index === 0) return

            const isOdd = index % 2 !== 0;

            const xPosition = isDesktop ? (isOdd ? "-1": "1 ") : 0
            const yRotation = isDesktop ? (isOdd ? "0.4": "-0.4") : 0

            scrollTL.to(canRef.current.position, {
                x: xPosition,
                ease: "circ.inOut",
                delay: 0.5
            })
            .to(canRef.current.rotation, {
                y: yRotation,
                ease: "back.inOut",

            }, "<")
            .to(".alternating-text-container", {
                backgroundColor: gsap.utils.wrap(bgColor, index)
            })


        });
    }, {dependencies: [isDesktop]})
    return (
        <group
           ref={canRef}
           position-x={isDesktop ? 1: 0}
           rotation-y={isDesktop? -0.3: 0} 
        >
            <FloadingCan flavor='strawberryLemonade'/>
            <Environment files={"/hdrs/lobby.hdr"} environmentIntensity={1.5} />
        </group>
    );
}

export default AlthernatingScene;
