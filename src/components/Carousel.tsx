"use client"

import React, { useRef, useState } from 'react';
import WavyCycle from './WavyCycle';
import ArrowIcon from './ArrowIcon';
import clsx from 'clsx';
import { Group } from 'three';
import { SodaCanProps } from './SodaCan';
import { Center, Environment, View } from '@react-three/drei';
import FloadingCan from './FloadingCan';
import gsap from 'gsap';


const SPINS_ON_CHANGE = 8;
const FLAVOR: {
    flavor: SodaCanProps["flavor"];
    color: string;
    name: string;
}[]=[
    { flavor: "blackCherry", color: "#710523", name: "Black cherry"},
    { flavor: "grape", color: "#572981", name: "Grape"},
    { flavor: "lemonLime", color: "#164405", name: "Lemon Lime"},
    { flavor: "strawberryLemonade", color: "#690B3D", name: "Strawberry Lemonade"},
    { flavor: "watermelon", color: "#4B7002", name: "Water Melon"},
]


const Carousel = () => {

    const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0)
    const sodaCanRef = useRef<Group>(null)

    const changeFlavor = (index: number) => {
        if(!sodaCanRef.current) return;

        const nextIndex = (index + FLAVOR.length) % FLAVOR.length

        const tl = gsap.timeline();

        tl
        .to(sodaCanRef.current.rotation, {
            y: index > currentFlavorIndex ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`:`+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
            ease: "power2.inOut",
            duration: 1
        }, 0)
        .to(".background, .wavy-circles-outer, .wavy-circles-inner", {
            backgroundColor: FLAVOR[nextIndex].color,
            fill: FLAVOR[nextIndex].color,
            ease: "power2.inOut",
            duration: 1
        }, 0)
        .to(".text-wrapper", {
            duration: 0.2, y: -10, opacity: 0
        }, 0)
        .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
        .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
    }


    return (
        <section className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
            <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50"/>
            
            <WavyCycle className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

            <h2 className='relative text-center text-5xl font-bold'>
                Will be replace later
            </h2>

            <div className='grid grid-cols-[auto,auto,auto] items-center'>

                {/* right */}
                <ArrowButton 
                    onClick={() => changeFlavor(currentFlavorIndex + 1)}
                    direction='right'
                    label='Next Flavor'
                />

                {/* can */}
                <View className="aspect-square h-[70vmin] min-h-40">
                    <Center position={[0, 0, 1.5]}>
                        <FloadingCan
                            flavor={FLAVOR[currentFlavorIndex].flavor}
                            ref={sodaCanRef}
                            rotationIntensity={1}
                            floatIntensity={0.3}
                        />
                    </Center>

                    <Environment 
                        files="/hdrs/lobby.hdr"
                        environmentIntensity={0.6}
                        environmentRotation={[0,3,0]}
                    />

                    <directionalLight intensity={6} position={[0,1,1]}/>
                </View>

                {/* left */}
                <ArrowButton 
                    onClick={() => changeFlavor(currentFlavorIndex - 1)}
                    direction='left'
                    label='Next Flavor'
                />
            </div>

            <div className="text-area relative mx-auto text-center">
              <div className="text-wrapper text-4xl font-medium">
                <p>{FLAVOR[currentFlavorIndex].name}</p>
              </div>
              <div className="mt-2 text-2xl font-normal opacity-90">
                it is price, will replace later
              </div>
            </div>
        </section>
    );
}

export default Carousel;

type ArrowButtonProps ={
    label?: string,
    direction?: "right" | "left",
    onClick: () => void
}
function ArrowButton({label, direction, onClick}:ArrowButtonProps) {
    return(
        <button
        onClick={onClick}
        className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
        >
            <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")}/>
            <span className="sr-only">{label}</span>
        </button>
    )
}
