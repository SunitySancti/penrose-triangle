import { useRef,
         useMemo,
         useState } from 'react'

import GeometryStore from './GeometryStore'
import MaterialStore from './MaterialStore'
import LightStore from './LightStore'

import type { GeometryConfig,
              MaterialConfig,
              LightConfig,
              GeometryControllers,
              MaterialControllers,
              LightControllers,
              PenroseTriangleProps,
              PenroseTriangleDefaultValues } from '../types'



export const usePenroseTriangle = (defaultValues?: PenroseTriangleDefaultValues) => {
    const [ geometryStore ] = useState(() => new GeometryStore(defaultValues));
    const [ materialStore ] = useState(() => new MaterialStore(defaultValues));
    const [ lightStore ] = useState(() => new LightStore(geometryStore, defaultValues));

    const { cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted, setCubesInSide, setGapRatio, setDiameter, setRotation, rotate, setRotationSpeed, toggleAutoRotation, toggleRotationDirection, toggleGeometryInvertion } = geometryStore;
    const { color, setColor } = materialStore;
    const { lightIntensity, brightness, lightElevation, lightPosition, lightBinding, lightRotation, setlightIntensity, setBrightness, setLightRotation, setlightElevation, togglelightBinding  } = lightStore;


    const geometryConfig: GeometryConfig = useMemo(() => ({
        cubesInSide,
        gapRatio,
        diameter,
        rotation,
        rotationSpeed,
        isRotating,
        isInverted,
    }),[ cubesInSide, gapRatio, diameter, rotation, rotationSpeed, isRotating, isInverted ]);

    const materialConfig: MaterialConfig = useMemo(() => ({
        color,
    }),[ color ]);

    const lightConfig: LightConfig = useMemo(() => ({
        lightElevation,
        lightIntensity,
        lightBinding,
        lightPosition,
        lightRotation,
        brightness,
    }),[ lightIntensity, brightness, lightElevation, lightBinding, lightPosition, lightRotation ]);

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
        setlightIntensity,
        setBrightness,
        setLightRotation,
        setlightElevation,
        togglelightBinding,
    }),[ setlightIntensity, setBrightness, setLightRotation, setlightElevation, togglelightBinding ]);

    
    const parentRef = useRef<HTMLElement>(null);

    const props: PenroseTriangleProps = useMemo(() => ({
        ...geometryConfig,
        ...materialConfig,
        ...lightConfig,
        parentRef,
        rotate,
    }),[
        ...Object.values(geometryConfig),
        ...Object.values(materialConfig),
        ...Object.values(lightConfig),
        parentRef,
        rotate
    ]);

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