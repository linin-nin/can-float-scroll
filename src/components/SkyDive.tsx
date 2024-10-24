"use client"

import React from 'react';
import Bounded from './Bounded';
import { View } from '@react-three/drei';
import SkyScene from './SkyScene';

const SkyDive = () => {
    return (
        <Bounded className="skydive h-screen">
            <h2 className='sr-only'>REpleace it later</h2>
            <View className="h-screen w-screen">
              <SkyScene
                flavor="lemonLime"
                sentence="Will replace later"
              />
            </View>
        </Bounded>
    );
}

export default SkyDive;
