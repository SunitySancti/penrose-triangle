import { useRef,
         useMemo,
         useState } from 'react'

import GeometryStore from './GeometryStore'
import MaterialStore from './MaterialStore'
import LightStore from './LightStore'

import { defaultGeometry } from './GeometryStore'
import { defaultMaterial } from './MaterialStore'
import { defaultLight } from './LightStore'

import type { GeometryControllers,
              MaterialControllers,
              LightControllers,
              PenroseTriangleProps,
              PenroseTriangleInitialValues } from '../types'

export const defaultValues = {
    defaultGeometry,
    defaultMaterial,
    defaultLight
}

export const usePenroseTriangle = (initialValues: PenroseTriangleInitialValues = {}) => {
    const { geometry: initialGeometry,
            material: initialMaterial,
            light: initialLight } = initialValues;
    const [ geometryStore ] = useState(() => new GeometryStore(initialGeometry));
    const [ materialStore ] = useState(() => new MaterialStore(initialMaterial));
    const [ lightStore ] = useState(() => new LightStore(geometryStore, initialLight));

    const { cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted, setCubesInSide, setGapRatio, setDiameter, setRotation, rotate, setRotationSpeed, toggleAutoRotation, toggleRotationDirection, toggleGeometryInvertion } = geometryStore;
    const { color, setColor } = materialStore;
    const { intensity, brightness, elevation, binding, rotation: lightRotation, setIntensity, setBrightness, setRotation: setLightRotation, setElevation, toggleBinding  } = lightStore;


    const geometryConfig = useMemo(() => ({
        cubesInSide,
        gapRatio,
        diameter,
        rotation,
        rotationSpeed,
        isRotating,
        isInverted,
    }),[ cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted ]);

    const materialConfig = useMemo(() => ({
        color,
    }),[ color ]);

    const lightConfig = useMemo(() => ({
        elevation,
        rotation: lightRotation,
        binding,
        intensity,
        brightness,
    }),[ intensity, brightness, elevation, binding, rotation ]);

    const geometryControllers: GeometryControllers = useMemo(() => ({
        setCubesInSide,
        setGapRatio,
        setDiameter,
        setRotation,
        rotate,
        setRotationSpeed,
        toggleAutoRotation,
        toggleRotationDirection,
        toggleGeometryInvertion,
    }),[ setCubesInSide, setGapRatio, setDiameter, setRotation, rotate, setRotationSpeed, toggleAutoRotation, toggleRotationDirection, toggleGeometryInvertion ]);

    const materialControllers: MaterialControllers = useMemo(() => ({
        setColor
    }),[ setColor ]);

    const lightControllers: LightControllers = useMemo(() => ({
        setIntensity,
        setBrightness,
        setRotation: setLightRotation,
        setElevation,
        toggleBinding,
    }),[ setIntensity, setBrightness, setRotation, setElevation, toggleBinding ]);

    
    const parentRef = useRef<HTMLElement>(null);

    const props: PenroseTriangleProps = useMemo(() => ({
        geometry: geometryConfig,
        material: materialConfig,
        light: lightConfig,
        parentRef,
        setRotation,
    }),[ geometryConfig, materialConfig, lightConfig, parentRef, setRotation ]);

    const config = useMemo(() => ({
        geometry: geometryConfig,
        material: materialConfig,
        light: lightConfig,
    }),[ geometryConfig, materialConfig, lightConfig ]);

    const controllers = useMemo(() => ({
        geometry: geometryControllers,
        material: materialControllers,
        light: lightControllers,
    }),[ geometryControllers, materialControllers, lightControllers ]);

    const geometry = useMemo(() => ({
        config: geometryConfig,
        controllers: geometryControllers,
    }),[ geometryConfig, geometryControllers ]);

    const material = useMemo(() => ({
        config: materialConfig,
        controllers: materialControllers,
    }),[ materialConfig, materialControllers ]);

    const light = useMemo(() => ({
        config: lightConfig,
        controllers: lightControllers,
    }),[ lightConfig, lightControllers ]);

    return ({
        parentRef,
        props,
        config,
        controllers,
        geometry,
        material,
        light
    });
}
